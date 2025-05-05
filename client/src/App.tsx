import { Link, Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/layout/scroll-to-top";

import Home from "@/pages/home";
import BlogList from "./pages/blog"; 
import BlogPost from "./pages/post"; 
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
        <Switch>
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/posts" component={AdminPosts} />
          <Route>
            <Header />
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:slug" component={BlogPost} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/services" component={Services} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
            <ScrollToTop />
            <Toaster />
          </Route>
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;