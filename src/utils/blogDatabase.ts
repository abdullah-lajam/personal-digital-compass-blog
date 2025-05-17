
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

// Get all localStorage posts
const getLocalStoragePosts = (): PostWithContent[] => {
  const posts: PostWithContent[] = [];
  
  // Find all localStorage keys that start with "post_" but are not drafts
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    if (key && key.startsWith('post_') && !key.includes('draft')) {
      try {
        const postJson = localStorage.getItem(key);
        if (postJson) {
          const post = JSON.parse(postJson);
          // Ensure we're not processing draft posts
          if (!key.includes('draft_')) {
            posts.push(post);
          }
        }
      } catch (error) {
        console.error(`Error parsing post from localStorage (${key}):`, error);
      }
    }
  }
  
  console.log("Local storage posts found:", posts.length);
  return posts;
};

// Get a single post by ID
export const getPostById = (id: string): PostWithContent | undefined => {
  // First check localStorage
  try {
    const postJson = localStorage.getItem(`post_${id}`);
    if (postJson) {
      return JSON.parse(postJson);
    }
  } catch (error) {
    console.error(`Error retrieving post ${id} from localStorage:`, error);
  }
  
  // Then check mock data
  return getPostsArray().find(post => post.id === id);
};

// Get all posts
export const getAllPosts = (): PostWithContent[] => {
  const mockPosts = getPostsArray();
  const localPosts = getLocalStoragePosts();
  
  // Combine both arrays and log for debugging
  const allPosts = [...mockPosts, ...localPosts];
  console.log("Total posts loaded:", allPosts.length, "Mock:", mockPosts.length, "Local:", localPosts.length);
  
  return allPosts;
};

// Get posts by category
export const getPostsByCategory = (categorySlug: string): PostWithContent[] => {
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter(post => post.categorySlug === categorySlug);
  console.log(`Posts for category ${categorySlug}:`, filteredPosts.length);
  return filteredPosts;
};

// Create a new post
export const createPost = (post: PostWithContent): PostWithContent => {
  const posts = getAllPosts();
  
  // Check if a post with the same ID already exists
  const existingPost = posts.find(p => p.id === post.id);
  if (existingPost) {
    throw new Error("Post with this ID already exists");
  }
  
  // Add the post to local storage
  localStorage.setItem(`post_${post.id}`, JSON.stringify(post));
  console.log("Post saved successfully:", post.title);
  
  return post;
};

// Update an existing post
export const updatePost = (post: PostWithContent): PostWithContent => {
  const posts = getAllPosts();
  
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
  const posts = getAllPosts();
  
  // Check if the post exists
  const existingPost = posts.find(p => p.id === id);
  if (!existingPost) {
    throw new Error("Post not found");
  }
  
  // Remove the post from local storage
  localStorage.removeItem(`post_${existingPost.id}`);
  
  return true;
};

// Get all categories from both mock data and localStorage
export const getAllCategories = (): { slug: string, name: string }[] => {
  const posts = getAllPosts();
  const categoriesMap = new Map<string, { slug: string, name: string }>();
  
  // Add all categories from posts in mock data and localStorage
  posts.forEach(post => {
    if (!categoriesMap.has(post.categorySlug)) {
      categoriesMap.set(post.categorySlug, {
        slug: post.categorySlug,
        name: post.category
      });
    }
  });
  
  // Make sure we have all the static categories defined as well
  // These are our default categories that should always be available
  const defaultCategories = [
    { slug: 'ai', name: 'الذكاء الاصطناعي' },
    { slug: 'e-learning', name: 'التعليم الإلكتروني' },
    { slug: 'business', name: 'إدارة الأعمال' },
    { slug: 'humanities', name: 'إنسانيات' },
    { slug: 'misc', name: 'تدوينات متفرقة' }
  ];
  
  defaultCategories.forEach(category => {
    if (!categoriesMap.has(category.slug)) {
      categoriesMap.set(category.slug, category);
    }
  });
  
  return Array.from(categoriesMap.values());
};
