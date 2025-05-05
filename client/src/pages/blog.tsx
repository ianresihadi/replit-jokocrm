
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Calendar, Search } from "lucide-react";
import { getMDXFiles, type Post as MDXPost } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from "@shared/schema";
import { LoadingPosts } from "@/components/ui/loading-posts";

interface DBPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  category: Category;
}

const Blog = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: mdxPosts = [], isLoading: mdxLoading } = useQuery<MDXPost[]>({
    queryKey: ['mdx-posts'],
    queryFn: getMDXFiles
  });

  const { data: dbPosts = [], isLoading: dbLoading } = useQuery<DBPost[]>({
    queryKey: ['db-posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      return data.posts;
    }
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  });

  // Combine and filter posts
  const allPosts = [...mdxPosts.map(post => ({
    title: post.frontmatter.title,
    slug: post.frontmatter.slug,
    excerpt: post.frontmatter.excerpt,
    date: post.frontmatter.date,
    category: post.frontmatter.category || 'Uncategorized',
    isMDX: true
  })), ...dbPosts.map(post => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.createdAt,
    category: post.category.name,
    isMDX: false
  }))];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (mdxLoading || dbLoading) {
    return <LoadingPosts />;
  }

  return (
    <>
      <Helmet>
        <title>Blog Posts</title>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                  {post.title}
                </h2>
              </Link>

              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.date)}
                </div>
                <div className="text-sm text-slate-500">
                  {post.category}
                </div>
              </div>
            </motion.article>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No posts found</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Blog;
