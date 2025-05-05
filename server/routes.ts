import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import multer from "multer";
import path from "path";
import matter from "gray-matter";
import { insertSubscriberSchema, insertContactMessageSchema, insertPostSchema } from "@shared/schema";
import { authenticate, ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } from "./auth";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints prefixed with /api

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Featured Posts
  app.get("/api/posts/featured", async (req, res) => {
    try {
      const featuredPosts = await storage.getFeaturedPosts();
      res.json(featuredPosts);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      res.status(500).json({ message: "Failed to fetch featured posts" });
    }
  });

  // Recent Posts with pagination
  app.get("/api/posts/recent", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 4;
      const offset = (page - 1) * limit;

      // Get recent posts
      const { posts, total } = await storage.getPosts({ 
        limit, 
        offset, 
        sort: 'latest' 
      });

      // Get main featured post (first post for the first page)
      let mainPost = null;
      if (page === 1 && posts.length > 0) {
        mainPost = posts[0];
        posts.shift(); // Remove the main post from the list
      }

      // Calculate total pages
      const totalPages = Math.ceil(total / limit);

      res.json({
        mainPost,
        recentPosts: posts,
        totalPages,
        currentPage: page
      });
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      res.status(500).json({ message: "Failed to fetch recent posts" });
    }
  });

  // Posts with filtering, sorting, and pagination
  app.get("/api/posts", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      // Extract filter params
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      const sort = req.query.sort as string || 'latest';
      const tag = req.query.tag as string | undefined;

      // Get category ID if category name is provided
      let categoryId: number | undefined;
      if (category) {
        const categoryObj = await storage.getCategoryBySlug(category.toLowerCase()) ||
                            (await storage.getCategories()).find(cat => 
                              cat.name.toLowerCase() === category.toLowerCase()
                            );
        categoryId = categoryObj?.id;
      }

      // Fetch posts with filters
      const { posts, total } = await storage.getPosts({
        limit,
        offset,
        categoryId,
        search,
        sort,
        tag
      });

      // Calculate total pages
      const totalPages = Math.ceil(total / limit);

      res.json({
        posts,
        total,
        totalPages,
        currentPage: page
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Get post by slug
  app.get("/api/posts/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;

      // Increment view count
      const post = await storage.getPostBySlug(slug);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Increment post views
      await storage.incrementPostViews(post.id);

      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // Get related posts
  app.get("/api/posts/related", async (req, res) => {
    try {
      const categoryId = parseInt(req.query.categoryId as string);
      const postId = parseInt(req.query.postId as string);
      const limit = parseInt(req.query.limit as string) || 3;

      if (isNaN(categoryId) || isNaN(postId)) {
        return res.status(400).json({ message: "Invalid categoryId or postId" });
      }

      const relatedPosts = await storage.getRelatedPosts(categoryId, postId, limit);
      res.json(relatedPosts);
    } catch (error) {
      console.error("Error fetching related posts:", error);
      res.status(500).json({ message: "Failed to fetch related posts" });
    }
  });

  // Search suggestions
  app.get("/api/search-suggestions", async (req, res) => {
    try {
      const query = req.query.q as string || '';

      if (!query || query.length < 2) {
        return res.json([]);
      }

      const suggestions = await storage.getSearchSuggestions(query);
      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      res.status(500).json({ message: "Failed to fetch search suggestions" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      // Validate request body
      const result = insertSubscriberSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid subscription data", 
          errors: result.error.errors 
        });
      }

      // Check if already subscribed
      const existingSubscriber = await storage.getSubscriberByEmail(result.data.email);

      if (existingSubscriber && existingSubscriber.active) {
        return res.status(200).json({ 
          message: "You are already subscribed to our newsletter",
          subscriber: existingSubscriber
        });
      }

      // Create or reactivate subscriber
      const subscriber = await storage.createSubscriber(result.data);

      res.status(201).json({
        message: "Successfully subscribed to newsletter",
        subscriber
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const result = insertContactMessageSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid contact form data", 
          errors: result.error.errors 
        });
      }

      // Create contact message
      const message = await storage.createContactMessage(result.data);

      res.status(201).json({
        message: "Message sent successfully",
        contactMessage: message
      });
    } catch (error) {
      console.error("Error sending contact message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  // Admin login
  // File upload endpoints
  app.post("/api/upload", authenticate, upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ url: imageUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // MDX batch upload endpoint
  app.post("/api/upload/mdx", authenticate, async (req, res) => {
    try {
      const files = req.body.files;
      if (!Array.isArray(files)) {
        return res.status(400).json({ message: "Invalid files data" });
      }

      // Get existing posts first
      const { posts: existingPosts } = await storage.getPosts();
      
      const results = [];
      for (const file of files) {
        const { content, filename } = file;
        const { data: frontmatter, content: mdxContent } = matter(content);
        
        // Check if post with same slug already exists
        const slug = frontmatter.slug || filename.replace('.mdx', '').toLowerCase();
        const existingPost = existingPosts.find(p => p.slug === slug);
        
        // Create post from MDX
        const postData = {
          title: frontmatter.title || filename.replace('.mdx', ''),
          content: mdxContent,
          slug: slug,
          excerpt: frontmatter.excerpt || mdxContent.slice(0, 160) + '...',
          categoryId: frontmatter.categoryId || 1,
          published: true,
          authorId: 1,
          thumbnail: frontmatter.thumbnail || '',
          tags: frontmatter.tags || []
        };

        let post;
        if (existingPost) {
          // Update existing post
          post = await storage.updatePost(existingPost.id, postData);
        } else {
          // Create new post
          post = await storage.createPost(postData);
        }
        results.push(post);
      }

      res.status(201).json(results);
    } catch (error) {
      console.error("Error uploading MDX files:", error);
      res.status(500).json({ message: "Failed to upload MDX files" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.json({ token: JWT_SECRET });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // Create post (protected)
  app.post("/api/posts", authenticate, async (req, res) => {
    try {
      const result = insertPostSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid post data", 
          errors: result.error.errors 
        });
      }

      // Add default values
      const postData = {
        ...result.data,
        slug: result.data.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        excerpt: result.data.content
          .replace(/<[^>]*>/g, "")
          .substring(0, 160) + "...",
        published: true,
        authorId: 1, // Default author
      };

      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  // Admin post management endpoints
  app.get("/api/admin/posts", authenticate, async (req, res) => {
    try {
      const { posts } = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.put("/api/admin/posts/:id", authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const result = insertPostSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid post data", 
          errors: result.error.errors 
        });
      }

      const postData = {
        ...result.data,
        slug: result.data.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        excerpt: result.data.content
          .replace(/<[^>]*>/g, "")
          .substring(0, 160) + "..."
      };

      const updatedPost = await storage.updatePost(parseInt(id), postData);
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete("/api/admin/posts/:id", authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deletePost(parseInt(id));

      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  return httpServer;
}