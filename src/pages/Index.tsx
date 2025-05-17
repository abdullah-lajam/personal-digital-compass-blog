
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedPosts from '../components/FeaturedPosts';
import Footer from '../components/Footer';
import { BlogPost } from '../components/BlogCard';
import { getAllPosts } from '../utils/blogDatabase';

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    // Get all posts including those from localStorage
    const allPosts = getAllPosts();
    
    console.log("Index page loaded posts:", allPosts.length);
    
    // Sort posts by date (newest first)
    const sortedPosts = [...allPosts].sort((a, b) => {
      // Try to create Date objects, if that fails use string comparison
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      } catch (error) {
        // Fallback to string comparison if date parsing fails
        return b.date.localeCompare(a.date);
      }
    });
    
    console.log("Sorted posts:", sortedPosts.map(p => p.title));
    
    // Set featured posts (first 3)
    setFeaturedPosts(sortedPosts.slice(0, 3));
    
    // Set recent posts (next 3)
    setRecentPosts(sortedPosts.slice(3, 6));
    
    // Set trending posts (next 3)
    setTrendingPosts(sortedPosts.slice(6, 9));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main>
        <FeaturedPosts posts={featuredPosts} title="مقالات مميزة" />
        <FeaturedPosts posts={recentPosts} title="أحدث المقالات" />
        <FeaturedPosts posts={trendingPosts} title="الأكثر قراءة" />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
