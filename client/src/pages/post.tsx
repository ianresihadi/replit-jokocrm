import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { 
  Clock, 
  Calendar, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ChevronLeft,
  MessageSquare
} from "lucide-react";
import { useViewTracker } from "@/hooks/use-view-tracker";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, getCategoryClassName, cn } from "@/lib/utils";
import { PostWithAuthor } from "@shared/schema";
// Added import for MDX components (assuming necessary)
import { MDXRenderer } from 'next-mdx-remote/rsc'; // Or your preferred MDX renderer



const PostPage = () => {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['mdx-post', slug],
    queryFn: async () => {
      const posts = await getMDXFiles(); // Requires implementation of getMDXFiles
      return posts.find(p => p.frontmatter.slug === slug);
    },
    enabled: !!slug
  });

  const { data: relatedPosts = [] } = useQuery<PostWithAuthor[]>({
    queryKey: ['/api/posts/related', post?.category.id, post?.id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/related?categoryId=${post?.category.id}&postId=${post?.id}`);
      if (!res.ok) throw new Error("Failed to fetch related posts");
      return await res.json();
    },
    enabled: !!post?.id
  });

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Jokoris Blog Post';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        });
    }
  };

  useViewTracker(post?.id || null);

  useEffect(() => {
    if (post && window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = post.slug;
          this.page.url = window.location.href;
          this.page.title = post.title;
        }
      });
    } else if (post) {
      const script = document.createElement('script');
      script.src = 'https://jokoris.disqus.com/embed.js';
      script.setAttribute('data-timestamp', Date.now().toString());
      document.body.appendChild(script);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded max-w-lg mb-4"></div>
          <div className="flex gap-3 mb-8">
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-lg mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">
          Error loading post
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          The post you're looking for couldn't be found or there was an error loading it.
        </p>
        <Link href="/blog">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Jokoris</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={post.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.thumbnail} />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category.name} />
      </Helmet>

      <main className="pt-8 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link href="/blog">
              <a className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-150">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to all posts
              </a>
            </Link>
          </div>

          <header className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-3 mb-3">
                <Link href={`/blog?category=${post.category.name}`}>
                  <a className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                    getCategoryClassName(post.category.name)
                  )}>
                    {post.category.name}
                  </a>
                </Link>
                <div className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-6">
                {post.title}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`} 
                    alt={post.author.name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                      {post.author.name}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {post.author.bio ? post.author.bio.substring(0, 60) + '...' : 'Author'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="px-2"
                    onClick={() => sharePost('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="px-2"
                    onClick={() => sharePost('twitter')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="px-2"
                    onClick={() => sharePost('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="px-2"
                    onClick={() => sharePost('copy')}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </header>

          <motion.figure 
            className="mb-8 rounded-xl overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full h-auto aspect-[16/9] object-cover"
            />
          </motion.figure>

          <motion.div 
            className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Render MDX content here */}
            {post && <MDXRenderer>{post.content}</MDXRenderer>} {/* Requires content to be in MDX format */}
          </motion.div>


          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link key={index} href={`/blog?tag=${tag}`}>
                    <a className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150">
                      #{tag}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <img 
                    src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&size=128`} 
                    alt={post.author.name} 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {post.author.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {post.author.bio || 'Writer and contributor at Jokoris Blog'}
                    </p>
                    <div className="flex justify-center sm:justify-start space-x-3">
                      {post.author.twitter && (
                        <a 
                          href={`https://twitter.com/${post.author.twitter}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors duration-150"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {post.author.facebook && (
                        <a 
                          href={`https://facebook.com/${post.author.facebook}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors duration-150"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {post.author.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${post.author.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors duration-150"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Comments
              </h3>
            </div>
            <div id="disqus_thread"></div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <Separator className="mb-8" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Related Posts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.slice(0, 2).map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <a className="group block">
                      <div className="flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-slate-800 h-full">
                        <div className="relative pb-[60%]">
                          <img 
                            src={relatedPost.thumbnail} 
                            alt={relatedPost.title} 
                            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex gap-2 mb-2">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              getCategoryClassName(relatedPost.category.name)
                            )}>
                              {relatedPost.category.name}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {relatedPost.readingTime} min
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-150">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2 flex-1">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                            <Calendar className="h-3 w-3 mr-1" /> {formatDate(relatedPost.createdAt)}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
};

export default PostPage;