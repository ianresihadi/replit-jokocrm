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

interface CategoryCardProps {
  category: Category;
}

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

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <motion.div 
      className="group p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={() => {
        window.location.href = `/blog?category=${category.name}`;
      }}
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
    </motion.div>
  );
};

export default CategoryCard;
