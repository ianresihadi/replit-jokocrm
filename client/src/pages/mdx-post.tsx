
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Helmet } from "react-helmet";
import { ChevronLeft } from "lucide-react";
import { getMDXBySlug, renderMDX } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const [match, params] = useRoute("/mdx-blog/:slug");
  const [post, setPost] = useState<any>(null);
  const [Content, setContent] = useState<any>(null);
  
  useEffect(() => {
    const loadPost = async () => {
      if (params?.slug) {
        const postData = await getMDXBySlug(params.slug);
        if (postData) {
          setPost(postData);
          const content = await renderMDX(postData.code);
          setContent(content);
        }
      }
    };
    
    loadPost();
  }, [params?.slug]);

  if (!post || !Content) {
    return <div className="max-w-3xl mx-auto px-4 py-12">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        
        <article className="prose dark:prose-invert lg:prose-lg max-w-none">
          <h1>{post.frontmatter.title}</h1>
          
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-8">
            <span>By {post.frontmatter.author}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.frontmatter.date)}</span>
          </div>
          
          <Content />
        </article>
      </main>
    </>
  );
};

export default BlogPost;
