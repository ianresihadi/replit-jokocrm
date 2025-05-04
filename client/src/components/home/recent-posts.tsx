import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn, formatDate, getCategoryClassName } from "@/lib/utils";
import { PostWithAuthor } from "@shared/schema";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const RecentPosts = () => {
  const { data = {}, isLoading } = useQuery<{
    mainPost?: PostWithAuthor;
    recentPosts: PostWithAuthor[];
    totalPages: number;
    currentPage: number;
  }>({
    queryKey: ['/api/posts/recent'],
    queryFn: async () => {
      const res = await fetch('/api/posts/recent?page=1&limit=4');
      if (!res.ok) throw new Error('Failed to fetch recent posts');
      return await res.json();
    }
  });

  const { mainPost, recentPosts = [], totalPages = 1, currentPage = 1 } = data;

  const handlePrevPage = () => {
    // Implement pagination
  };

  const handleNextPage = () => {
    // Implement pagination
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 dark:text-white">
            Artikel Terbaru
          </h2>
          <div className="flex space-x-2">
            <button 
              className={cn(
                "p-2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors duration-150",
                currentPage === 1 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-slate-300 dark:hover:bg-slate-600"
              )}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              className={cn(
                "p-2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors duration-150",
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-slate-300 dark:hover:bg-slate-600"
              )}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Loading state */}
            <div className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800 animate-pulse">
              <div className="w-full pb-[60%] bg-slate-200 dark:bg-slate-700"></div>
              <div className="p-6">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 mr-3"></div>
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm animate-pulse">
                  <div className="sm:w-1/3 flex-shrink-0">
                    <div className="relative pb-[75%] sm:pb-[100%] rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                  <div className="sm:w-2/3 flex flex-col">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-6 flex-grow"></div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 mr-2"></div>
                        <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Left column - Main recent post */}
            {mainPost && (
              <motion.article 
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white dark:bg-slate-800 transition-shadow duration-200 card-hover-effect"
                variants={item}
              >
                <div className="relative pb-[60%]">
                  <img 
                    src={mainPost.thumbnail} 
                    alt={mainPost.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-medium",
                      getCategoryClassName(mainPost.category.name)
                    )}>
                      {mainPost.category.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span>{mainPost.readingTime} menit baca</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {mainPost.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {mainPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(mainPost.createdAt)}
                      </span>
                    </div>
                    <div 
                      className="text-primary hover:text-primary/90 transition-colors duration-150 cursor-pointer"
                      onClick={() => window.location.href = `/blog/${mainPost.slug}`}
                    >
                      Baca selengkapnya
                      <ArrowRight className="h-5 w-5 inline ml-1" />
                    </div>
                  </div>
                </div>
              </motion.article>
            )}
            
            {/* Right column - List of posts */}
            <motion.div className="space-y-6" variants={container}>
              {recentPosts.map((post) => (
                <motion.article 
                  key={post.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200"
                  variants={item}
                >
                  <div className="sm:w-1/3 flex-shrink-0">
                    <div className="relative pb-[75%] sm:pb-[100%] rounded-lg overflow-hidden">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title} 
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="sm:w-2/3 flex flex-col">
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className={cn(
                        "inline-block px-2 py-1 rounded-full text-xs font-medium mr-2",
                        getCategoryClassName(post.category.name)
                      )}>
                        {post.category.name}
                      </span>
                      <span>{post.readingTime} menit baca</span>
                    </div>
                    <div 
                      className="text-lg font-bold text-slate-900 dark:text-white mb-2 hover:text-primary dark:hover:text-primary/90 transition-colors duration-150 cursor-pointer"
                      onClick={() => window.location.href = `/blog/${post.slug}`}
                    >
                      {post.title}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              className={cn(
                "relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400",
                currentPage === 1
                  ? "cursor-not-allowed"
                  : "hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;
              
              return (
                <button
                  key={pageNumber}
                  className={cn(
                    "relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium",
                    isCurrentPage
                      ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  )}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            {totalPages > 5 && (
              <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                ...
              </span>
            )}
            
            {totalPages > 5 && (
              <button
                className="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                {totalPages}
              </button>
            )}
            
            <button
              className={cn(
                "relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400",
                currentPage === totalPages
                  ? "cursor-not-allowed"
                  : "hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
