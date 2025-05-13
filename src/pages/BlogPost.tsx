
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogPostHeader from '../components/BlogPostHeader';
import BlogPostContent from '../components/BlogPostContent';
import BlogPostFooter from '../components/BlogPostFooter';
import PostNotFound from '../components/PostNotFound';
import { allPosts } from '../utils/blogData';

const BlogPostPage: React.FC = () => {
  const { categorySlug, postSlug } = useParams<{ categorySlug: string; postSlug: string }>();
  
  const post = categorySlug && postSlug && allPosts[categorySlug] 
    ? allPosts[categorySlug][postSlug] 
    : null;

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
