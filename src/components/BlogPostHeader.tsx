
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from './BlogCard';

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ post }) => {
  return (
    <>
      {/* Header with Featured Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <Link 
              to={`/${post.categorySlug}`} 
              className="text-white bg-blog-primary px-3 py-1 rounded-full text-sm mb-3 inline-block hover:bg-blog-secondary transition-colors"
            >
              {post.category}
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{post.title}</h1>
            <p className="text-white text-opacity-80">نُشر بتاريخ {post.date}</p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mb-8">
        <Link to={`/${post.categorySlug}`} className="flex items-center text-blog-primary hover:underline">
          <ArrowLeft className="h-4 w-4 ml-2" />
          <span>العودة إلى {post.category}</span>
        </Link>
      </div>
    </>
  );
};

export default BlogPostHeader;
