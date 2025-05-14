
import { BlogPost } from "@/components/BlogCard";
import { allPosts } from "./blogData";

// This is a mock database that will be replaced with Supabase later
// For now, we'll use the local storage to simulate a database

export interface PostWithContent extends BlogPost {
  content?: string;
}

// Convert nested object structure to flat array
const getPostsArray = (): PostWithContent[] => {
  return Object.values(allPosts)
    .flatMap((categoryPosts) => Object.values(categoryPosts));
};

// Get a single post by ID
export const getPostById = (id: string): PostWithContent | undefined => {
  return getPostsArray().find(post => post.id === id);
};

// Get all posts
export const getAllPosts = (): PostWithContent[] => {
  return getPostsArray();
};

// Get posts by category
export const getPostsByCategory = (categorySlug: string): PostWithContent[] => {
  return getPostsArray().filter(post => post.categorySlug === categorySlug);
};

// Create a new post
export const createPost = (post: PostWithContent): PostWithContent => {
  const posts = getPostsArray();
  
  // Check if a post with the same ID already exists
  const existingPost = posts.find(p => p.id === post.id);
  if (existingPost) {
    throw new Error("Post with this ID already exists");
  }
  
  // Add the post to local storage
  localStorage.setItem(`post_${post.id}`, JSON.stringify(post));
  
  return post;
};

// Update an existing post
export const updatePost = (post: PostWithContent): PostWithContent => {
  const posts = getPostsArray();
  
  // Check if the post exists
  const existingPost = posts.find(p => p.id === post.id);
  if (!existingPost) {
    throw new Error("Post not found");
  }
  
  // Update the post in local storage
  localStorage.setItem(`post_${post.id}`, JSON.stringify(post));
  
  return post;
};

// Delete a post by ID
export const deletePost = (id: string): boolean => {
  const posts = getPostsArray();
  
  // Check if the post exists
  const existingPost = posts.find(p => p.id === id);
  if (!existingPost) {
    throw new Error("Post not found");
  }
  
  // Remove the post from local storage
  localStorage.removeItem(`post_${existingPost.id}`);
  
  return true;
};

// Get all categories
export const getAllCategories = (): { slug: string, name: string }[] => {
  const posts = getPostsArray();
  const categoriesMap = new Map<string, { slug: string, name: string }>();
  
  posts.forEach(post => {
    if (!categoriesMap.has(post.categorySlug)) {
      categoriesMap.set(post.categorySlug, {
        slug: post.categorySlug,
        name: post.category
      });
    }
  });
  
  return Array.from(categoriesMap.values());
};
