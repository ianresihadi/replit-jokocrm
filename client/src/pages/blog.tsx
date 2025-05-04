import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { 
  Filter, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  LayoutGrid, 
  List, 
  X,
  Clock,
  Calendar,
  BookOpen,
  Tags,
  Bookmark
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostCard from "@/components/ui/post-card";
import CategoryCard from "@/components/ui/category-card";
import EmptyState from "@/components/ui/empty-state";
import ErrorState from "@/components/ui/error-state";
import LoadingPosts from "@/components/ui/loading-posts";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate, getCategoryClassName } from "@/lib/utils";
import { PostWithAuthor, Category } from "@shared/schema";

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

const Blog = () => {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const [filter, setFilter] = useState({
    category: "",
    search: "",
    sort: "latest",
    page: 1
  });

  // Extract search params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    setSearchParams(params);
    
    setFilter({
      category: params.get("category") || "",
      search: params.get("search") || "",
      sort: params.get("sort") || "latest",
      page: parseInt(params.get("page") || "1") 
    });
  }, [location]);

  // Query Categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  // Query Posts
  const { data: postsData = { posts: [], totalPages: 0 }, isLoading, isError } = useQuery<{
    posts: PostWithAuthor[];
    totalPages: number;
  }>({
    queryKey: ['/api/posts', filter],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (filter.category) queryParams.append("category", filter.category);
      if (filter.search) queryParams.append("search", filter.search);
      queryParams.append("sort", filter.sort);
      queryParams.append("page", filter.page.toString());
      
      const res = await fetch(`/api/posts?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return await res.json();
    }
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      newParams.set("search", searchInput);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    
    setFilter(prev => ({ ...prev, search: searchInput, page: 1 }));
    window.history.pushState({}, "", `/blog?${newParams.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (category && category !== "all") {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
      category = "";
    }
    newParams.set("page", "1");
    
    setFilter(prev => ({ ...prev, category, page: 1 }));
    window.history.pushState({}, "", `/blog?${newParams.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", sort);
    
    setFilter(prev => ({ ...prev, sort }));
    window.history.pushState({}, "", `/blog?${newParams.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    
    setFilter(prev => ({ ...prev, page }));
    window.history.pushState({}, "", `/blog?${newParams.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Blog | Jokoris</title>
        <meta name="description" content="Read the latest articles on life, faith, marketing and more." />
      </Helmet>
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
              The <span className="bg-gradient-text">Blog</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Jelajahi wawasan tentang Kehidupan, Agama, Marketing dan lainnya - Perspektif baru untuk generasi baru
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <form onSubmit={handleSearch} className="w-full md:w-1/2">
                <div className="relative">
                  <Input
                    type="text"
                    name="search"
                    placeholder="Cari artikel..."
                    className="pl-10 pr-4 py-2"
                    defaultValue={filter.search}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                </div>
              </form>
              
              <div className="flex gap-2 w-full md:w-1/2">
                <Select value={filter.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter berdasarkan kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filter.sort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Urutkan berdasarkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Terbaru</SelectItem>
                    <SelectItem value="oldest">Terlama</SelectItem>
                    <SelectItem value="popular">Terpopuler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-2">
                <Button
                  variant={filter.category === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange("")}
                  className="flex-shrink-0"
                >
                  <Bookmark className="h-4 w-4 mr-1" />
                  Semua
                </Button>
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={filter.category === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.name)}
                    className={cn(
                      "flex-shrink-0",
                      filter.category === category.name && "border-primary"
                    )}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Active filters display */}
          {(filter.search || filter.category) && (
            <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center mr-1">
                  <Filter className="h-5 w-5 mr-2 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter aktif:</span>
                </div>
                
                {filter.search && (
                  <Badge variant="outline" className="flex items-center gap-1 pl-3 bg-primary/5 border-primary/20">
                    <Search className="h-3 w-3 text-primary" />
                    <span>{filter.search}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5 ml-1 p-0 hover:bg-primary/10 text-primary"
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams.toString());
                        newParams.delete("search");
                        newParams.set("page", "1");
                        setFilter(prev => ({ ...prev, search: "", page: 1 }));
                        window.history.pushState({}, "", `/blog?${newParams.toString()}`);
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Hapus filter pencarian</span>
                    </Button>
                  </Badge>
                )}
                
                {filter.category && (
                  <Badge variant="outline" className="flex items-center gap-1 pl-3 bg-primary/5 border-primary/20">
                    <Tags className="h-3 w-3 text-primary" />
                    <span>{filter.category}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5 ml-1 p-0 hover:bg-primary/10 text-primary"
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams.toString());
                        newParams.delete("category");
                        newParams.set("page", "1");
                        setFilter(prev => ({ ...prev, category: "", page: 1 }));
                        window.history.pushState({}, "", `/blog?${newParams.toString()}`);
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Hapus filter kategori</span>
                    </Button>
                  </Badge>
                )}
                
                {(filter.search || filter.category) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto text-sm"
                    onClick={() => {
                      window.history.pushState({}, "", "/blog");
                      setFilter({
                        category: "",
                        search: "",
                        sort: "latest",
                        page: 1
                      });
                    }}
                  >
                    Hapus semua filter
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Main content */}
          <Tabs defaultValue="grid" className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {!isLoading && !isError && (
                  <span>Menampilkan {postsData.posts.length} artikel {filter.category ? `di kategori "${filter.category}"` : ""}</span>
                )}
              </div>
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-1">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-1">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid">
              {isLoading ? (
                <LoadingPosts layout="grid" count={6} />
              ) : isError ? (
                <div className="text-center py-8">
                  <p className="text-red-500 dark:text-red-400">Terjadi kesalahan. Silakan coba lagi nanti.</p>
                </div>
              ) : postsData.posts.length ===  0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">Tidak ada artikel yang sesuai dengan kriteria Anda.</p>
                  <Button onClick={() => window.history.pushState({}, "", "/blog")}>
                    Hapus Filter
                  </Button>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {postsData.posts.map(post => (
                    <motion.div key={post.id} variants={item}>
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
            
            <TabsContent value="list">
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm animate-pulse">
                      <div className="sm:w-1/4 flex-shrink-0">
                        <div className="w-full pb-[60%] bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                      </div>
                      <div className="sm:w-3/4">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3 max-w-[100px]"></div>
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
              ) : isError ? (
                <div className="text-center py-8">
                  <p className="text-red-500 dark:text-red-400">Terjadi kesalahan. Silakan coba lagi nanti.</p>
                </div>
              ) : postsData.posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">Tidak ada artikel yang sesuai dengan kriteria Anda.</p>
                  <Button onClick={() => window.history.pushState({}, "", "/blog")}>
                    Hapus Filter
                  </Button>
                </div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {postsData.posts.map(post => (
                    <motion.div 
                      key={post.id} 
                      variants={item}
                      className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="sm:w-1/4 flex-shrink-0">
                        <div className="relative pb-[60%] sm:pb-[70%] rounded-lg overflow-hidden">
                          <img 
                            src={post.thumbnail || '/placeholder-image.jpg'} 
                            alt={post.title} 
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="sm:w-3/4 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {post.category.name}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {post.readingTime} menit baca
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                          <a href={`/blog/${post.slug}`} className="hover:text-primary transition-colors duration-150">
                            {post.title}
                          </a>
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`} 
                              alt={post.author.name} 
                              className="w-8 h-8 rounded-full mr-3 object-cover"
                            />
                            <div>
                              <span className="block text-sm font-medium text-slate-900 dark:text-white">
                                {post.author.name}
                              </span>
                              <span className="block text-xs text-slate-500 dark:text-slate-400">
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          <a href={`/blog/${post.slug}`} className="text-primary hover:text-primary/90 transition-colors duration-150">
                            Baca selengkapnya
                            <ChevronRight className="h-4 w-4 inline ml-1" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Pagination */}
          {postsData.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-md"
                  onClick={() => handlePageChange(filter.page - 1)}
                  disabled={filter.page === 1}
                >
                  <span className="sr-only">Sebelumnya</span>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                {[...Array(postsData.totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === filter.page;
                  
                  // Show first, last, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === postsData.totalPages ||
                    (pageNumber >= filter.page - 1 && pageNumber <= filter.page + 1)
                  ) {
                    return (
                      <Button
                        key={pageNumber}
                        variant={isCurrentPage ? "default" : "outline"}
                        size="icon"
                        className="w-10 h-10"
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={isCurrentPage}
                      >
                        {pageNumber}
                      </Button>
                    );
                  }
                  
                  // Show ellipsis for skipped pages
                  if (
                    (pageNumber === 2 && filter.page > 3) ||
                    (pageNumber === postsData.totalPages - 1 && filter.page < postsData.totalPages - 2)
                  ) {
                    return (
                      <Button
                        key={pageNumber}
                        variant="outline"
                        size="icon"
                        className="w-10 h-10 cursor-default"
                        disabled
                      >
                        ...
                      </Button>
                    );
                  }
                  
                  return null;
                })}
                
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-md"
                  onClick={() => handlePageChange(filter.page + 1)}
                  disabled={filter.page === postsData.totalPages}
                >
                  <span className="sr-only">Selanjutnya</span>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </nav>
            </div>
          )}
          
          {/* Categories Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-poppins">
              Telusuri berdasarkan Kategori
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
