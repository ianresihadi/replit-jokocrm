import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { cn, formatDate, getCategoryClassName } from "@/lib/utils";
import { PostWithAuthor } from "@shared/schema";
import PostCard from "@/components/ui/post-card";
import { getViewedPosts } from "@/hooks/use-view-tracker";

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

const RecommendedPosts = () => {
  // Menggunakan fungsi getViewedPosts dari custom hook kita
  const recentlyViewedPosts = getViewedPosts();
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/posts', { limit: 3 }],
    // Dalam implementasi nyata, kita akan memanggil endpoint spesifik seperti:
    // /api/posts/recommended?viewedPosts=1,2,3
  });
  
  // Pastikan data.posts adalah array
  const recommendedPosts = data?.posts || [];

  // Jika belum ada riwayat bacaan, jangan tampilkan bagian ini
  if (recentlyViewedPosts.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="py-12 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 dark:text-white">
            Rekomendasi Untuk Anda
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
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
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
            {recommendedPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Rekomendasi artikel berdasarkan riwayat bacaan Anda.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecommendedPosts;