import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PostCard from "@/components/ui/post-card";
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

const FeaturedPosts = () => {
  const { data: featuredPosts = [], isLoading } = useQuery<PostWithAuthor[]>({
    queryKey: ['/api/posts/featured'],
  });

  return (
    <section className="py-12 md:py-16" id="recent-posts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 dark:text-white">
            Artikel Unggulan
          </h2>
          <div 
            className="text-primary hover:text-primary/90 dark:hover:text-primary/80 font-medium inline-flex items-center transition-colors duration-150 cursor-pointer"
            onClick={() => window.location.href = "/blog"}
          >
            Lihat Semua
            <ArrowRight className="h-5 w-5 ml-1" />
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-slate-800 animate-pulse">
                <div className="w-full pb-[56.25%] bg-slate-200 dark:bg-slate-700"></div>
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
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {featuredPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
