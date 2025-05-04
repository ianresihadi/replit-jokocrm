import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/layout/scroll-to-top";

import Home from "@/pages/home";
import Blog from "@/pages/blog";
import Post from "@/pages/post";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/login";
import AdminPosts from "@/pages/admin/posts";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/" element={<div>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<Post />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <ScrollToTop />
              <Toaster/>
            </div>} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;