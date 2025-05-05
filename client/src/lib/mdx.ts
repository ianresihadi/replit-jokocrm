
import { Fragment } from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import matter from 'gray-matter';

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  code: string;
}

// Function to get all MDX files
export const getMDXFiles = async (): Promise<Post[]> => {
  const modules = import.meta.glob('/src/content/posts/*.mdx', { as: 'raw' });
  
  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, loadContent]) => {
      const content = await loadContent();
      const { data: frontmatter, content: code } = matter(content);
      
      return {
        frontmatter: frontmatter as PostFrontmatter,
        code
      };
    })
  );

  return posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
};

// Function to get a single MDX file by slug
export const getMDXBySlug = async (slug: string): Promise<Post | null> => {
  const posts = await getMDXFiles();
  return posts.find(post => post.frontmatter.slug === slug) || null;
};

// Function to render MDX content
export const renderMDX = async (code: string) => {
  const { default: Content } = await evaluate(code, {
    ...runtime,
    Fragment,
  });
  
  return Content;
};
