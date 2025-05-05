
import { Fragment } from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';

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
  try {
    const contentDir = path.join(process.cwd(), 'client/src/content/posts');
    const files = await fs.readdir(contentDir);
    
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
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
  } catch (error) {
    console.error('Error reading MDX files:', error);
    return [];
  }
};

// Function to get a single MDX file by slug
export const getMDXBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const contentDir = path.join(process.cwd(), 'client/src/content/posts');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: code } = matter(content);
    
    return {
      frontmatter: frontmatter as PostFrontmatter,
      code
    };
  } catch (error) {
    console.error('Error reading MDX file:', error);
    return null;
  }
};

// Function to render MDX content
export const renderMDX = async (code: string) => {
  const { default: Content } = await evaluate(code, {
    ...runtime,
    Fragment,
  });
  
  return Content;
};
