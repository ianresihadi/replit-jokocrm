
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { getMDXFiles, type Post } from "@/lib/mdx";

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ['mdx-posts'],
    queryFn: getMDXFiles
  });

  if (isLoading) {
    return <div className="max-w-3xl mx-auto px-4 py-12">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Blog Posts</title>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

        <div className="space-y-8">
          {posts.map((post) => (
            <motion.article
              key={post.frontmatter.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm"
            >
              <Link href={`/blog/${post.frontmatter.slug}`}>
                <a className="block hover:text-primary transition-colors">
                  <h2 className="text-2xl font-bold mb-2">{post.frontmatter.title}</h2>
                </a>
              </Link>

              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {post.frontmatter.excerpt}
              </p>

              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4 mr-2" />
                {post.frontmatter.date}
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </>
  );
};

export default Blog;
