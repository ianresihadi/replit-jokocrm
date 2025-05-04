import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Shield, 
  Cloud, 
  BarChart, 
  BookOpen,
  Smartphone,
  Heart,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@shared/schema";

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

const getCategoryIcon = (name: string) => {
  switch (name) {
    case "Kehidupan":
      return <Shield className="h-6 w-6" />;
    case "Agama":
      return <Cloud className="h-6 w-6" />;
    case "Marketing":
      return <BarChart className="h-6 w-6" />;
    case "Buku":
      return <BookOpen className="h-6 w-6" />;
    case "Teknologi":
      return <Smartphone className="h-6 w-6" />;
    case "Karier":
      return <Briefcase className="h-6 w-6" />;
    default:
      return <Heart className="h-6 w-6" />;
  }
};

const getCategoryBgClass = (name: string) => {
  switch (name) {
    case "Kehidupan":
      return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    case "Agama":
      return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
    case "Marketing":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
    case "Buku":
      return "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400";
    case "Teknologi":
      return "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400";
    case "Karier":
      return "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400";
    default:
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
  }
};

const CategorySection = () => {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <section className="py-12 bg-slate-100 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            Jelajahi berdasarkan Kategori
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Temukan topik yang paling menarik bagi Anda, dari refleksi kehidupan sehari-hari hingga wawasan marketing.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm animate-pulse">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"></div>
                  <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={item}>
                <div
                  className="group p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center cursor-pointer"
                  onClick={() => window.location.href = `/blog?category=${category.name}`}
                >
                  <div className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-full mb-4 group-hover:scale-110 transition-transform duration-200",
                    getCategoryBgClass(category.name)
                  )}>
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white text-center mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
