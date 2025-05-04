import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Search, Menu } from "lucide-react";
import MobileMenu from "./mobile-menu";
import SearchOverlay from "./search-overlay";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-all duration-200 ${
      isScrolled 
        ? "bg-white/90 dark:bg-slate-900/90 shadow-sm" 
        : "bg-white/80 dark:bg-slate-900/80"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold font-poppins bg-gradient-text">
                Jokoris
              </span>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className={`font-medium transition-colors duration-150 ${
              location === "/" 
                ? "text-primary dark:text-primary-foreground" 
                : "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-foreground"
            }`}>
              Home
            </Link>
            <Link href="/blog" className={`font-medium transition-colors duration-150 ${
              location.startsWith("/blog") 
                ? "text-primary dark:text-primary-foreground" 
                : "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-foreground"
            }`}>
              Blog
            </Link>
            <Link href="/services" className={`font-medium transition-colors duration-150 ${
              location === "/services" 
                ? "text-primary dark:text-primary-foreground" 
                : "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-foreground"
            }`}>
              Layanan
            </Link>
            <Link href="/about" className={`font-medium transition-colors duration-150 ${
              location === "/about" 
                ? "text-primary dark:text-primary-foreground" 
                : "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-foreground"
            }`}>
              About
            </Link>
            <Link href="/contact" className={`font-medium transition-colors duration-150 ${
              location === "/contact" 
                ? "text-primary dark:text-primary-foreground" 
                : "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-foreground"
            }`}>
              Contact
            </Link>
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search toggle */}
            <button 
              type="button" 
              className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Dark mode toggle */}
            <button 
              type="button" 
              className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* Mobile menu button */}
            <button 
              type="button" 
              className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      <MobileMenu isOpen={mobileMenuOpen} />
      
      {/* Search overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
