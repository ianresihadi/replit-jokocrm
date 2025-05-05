import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { PostWithAuthor } from "@shared/schema";
import { cn, formatDate, getCategoryClassName } from "@/lib/utils";

interface PostCardProps {
  post: PostWithAuthor;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <motion.article 
      className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md bg-white dark:bg-slate-800 transition-all duration-200 flex flex-col h-full"
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={post.thumbnail ? (post.thumbnail.startsWith('http') ? post.thumbnail : `${post.thumbnail}`) : 'https://placehold.co/600x400/e9ecef/6c757d?text=No+Image'} 
          alt={post.title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-3 left-3">
          <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-medium",
            getCategoryClassName(post.category.name)
          )}>
            {post.category.name}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>{post.readingTime} menit baca</span>
        </div>

        <div 
          className="text-lg font-bold text-slate-900 dark:text-white mb-3 hover:text-primary dark:hover:text-primary/90 transition-colors duration-150 line-clamp-2 cursor-pointer"
          onClick={() => window.location.href = `/blog/${post.slug}`}
        >
          {post.title}
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1 text-sm line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center">
            <img 
              src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`} 
              alt={post.author.name} 
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            <span className="text-xs text-slate-700 dark:text-slate-300">
              {post.author.name}
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;