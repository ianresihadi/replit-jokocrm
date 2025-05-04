import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const { data: suggestions = [] } = useQuery({
    queryKey: ['/api/search-suggestions', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];
      const res = await fetch(`/api/search-suggestions?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) return [];
      return await res.json();
    },
    enabled: searchQuery.length >= 2
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    navigate(`/blog?search=${encodeURIComponent(suggestion)}`);
    onClose();
  };

  return (
    <div className={cn(
      "absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shadow-md z-50 transition-all duration-300 ease-in-out",
      isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
    )}>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-0 focus:ring-2 focus:ring-primary transition-all duration-150"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isOpen}
            />
            <button 
              type="button" 
              className="absolute right-3 top-3 text-slate-500 dark:text-slate-400"
              onClick={onClose}
            >
              {searchQuery ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
          </div>
        </form>
        
        {/* Search suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 space-y-2">
            {suggestions.map((suggestion: string, index: number) => (
              <div 
                key={index}
                className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="text-primary">{searchQuery}</span>
                {suggestion.slice(searchQuery.length)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
