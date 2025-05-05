import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Calendar, Search } from "lucide-react";
import { getMDXFiles, type Post as MDXPost } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingPosts } from "@/components/ui/loading-posts";
import type { Category } from "@shared/schema";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: mdxPosts = [], isLoading: mdxLoading } = useQuery<MDXPost[]>({
    queryKey: ['mdx-posts'],
    queryFn: getMDXFiles
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  });

  // Filter posts
  const filteredPosts = mdxPosts.filter(post => {
    const matchesSearch = post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
                         post.frontmatter.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.frontmatter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (mdxLoading) {
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
              key={post.frontmatter.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm"
            >
              <Link href={`/blog/${post.frontmatter.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </h2>
              </Link>

              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {post.frontmatter.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.frontmatter.date)}
                </div>
                <div className="text-sm text-slate-500">
                  {post.frontmatter.category || 'Uncategorized'}
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