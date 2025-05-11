
import React from 'react';
import BlogCard, { BlogPost } from './BlogCard';

interface FeaturedPostsProps {
  posts: BlogPost[];
  title: string;
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts, title }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="animate-fade-up">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
