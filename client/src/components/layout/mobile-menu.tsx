import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  return (
    <div className={cn(
      "md:hidden border-t border-slate-200 dark:border-slate-800",
      isOpen ? "block" : "hidden"
    )}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link 
          href="/" 
          className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          Home
        </Link>
        <Link 
          href="/blog" 
          className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          Blog
        </Link>
        <Link 
          href="/services" 
          className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          Layanan
        </Link>
        <Link 
          href="/about" 
          className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          About
        </Link>
        <Link 
          href="/contact" 
          className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
