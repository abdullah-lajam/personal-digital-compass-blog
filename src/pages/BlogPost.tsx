
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogPostHeader from '../components/BlogPostHeader';
import BlogPostContent from '../components/BlogPostContent';
import BlogPostFooter from '../components/BlogPostFooter';
import PostNotFound from '../components/PostNotFound';
import { PostWithContent, getPostById, getAllPosts } from '../utils/blogDatabase';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostPage: React.FC = () => {
  const { categorySlug, postSlug } = useParams<{ categorySlug: string; postSlug: string }>();
  const [post, setPost] = useState<PostWithContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPost = () => {
      setIsLoading(true);
      
      if (categorySlug && postSlug) {
        // First check for locally stored posts
        try {
          // Get all posts including those from mock data and localStorage
          const allPosts = getAllPosts();
          
          // Find post matching the category and slug
          const foundPost = allPosts.find(p => 
            p?.categorySlug === categorySlug && p?.slug === postSlug
          ) || null;
          
          setPost(foundPost);
          
          if (foundPost) {
            console.log("Post found:", foundPost.title);
          } else {
            console.log("Post not found for", categorySlug, postSlug);
          }
        } catch (error) {
          console.error("Error loading post:", error);
          setPost(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setPost(null);
        setIsLoading(false);
      }
    };
    
    loadPost();
  }, [categorySlug, postSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <div className="bg-muted py-12 md:py-16">
            <div className="container mx-auto px-4">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
          
          <article className="blog-container max-w-4xl mx-auto p-4">
            <div className="space-y-4 py-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </article>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (!post) {
    return <PostNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <BlogPostHeader post={post} />
        
        <article className="blog-container max-w-4xl mx-auto">
          <BlogPostContent post={post} />
          <BlogPostFooter post={post} />
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
