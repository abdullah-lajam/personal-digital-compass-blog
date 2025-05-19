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
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      } catch (error) {
        return b.date.localeCompare(a.date);
      }
    });

    console.log("Sorted posts:", sortedPosts.map(p => p.title));

    setFeaturedPosts(sortedPosts.slice(0, 3));
    setRecentPosts(sortedPosts.slice(3, 6));
    setTrendingPosts(sortedPosts.slice(6, 9));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-1">
        <FeaturedPosts posts={featuredPosts} title="مقالات مميزة" />
        <FeaturedPosts posts={recentPosts} title="أحدث المقالات" />
        <FeaturedPosts posts={trendingPosts} title="الأكثر قراءة" />

        {/* قسم التدوينات اليدوية */}
        <section className="max-w-3xl mx-auto my-12 px-4">
          <h2 className="text-2xl font-bold mb-4">📝 مقالات مضافة يدويًا</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <a
                href="/personal-digital-compass-blog/content/ai/prompt-engineering.html"
                className="text-indigo-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                🧠 هندسة الأوامر (Prompt Engineering) – تصنيف: الذكاء الاصطناعي
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
