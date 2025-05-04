import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getCategoryClassName(category: string): string {
  const categoryMap: Record<string, string> = {
    'Kehidupan': 'category-life',
    'Agama': 'category-religion',
    'Marketing': 'category-marketing',
    'Teknologi': 'category-technology',
    'Buku': 'category-books',
    'Karier': 'category-career',
  };
  
  return categoryMap[category] || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
