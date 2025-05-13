
import React from 'react';
import { BlogPost } from './BlogCard';

interface BlogPostFooterProps {
  post: BlogPost;
}

const BlogPostFooter: React.FC<BlogPostFooterProps> = ({ post }) => {
  return (
    <>
      <div className="flex flex-wrap mt-8 pt-6 border-t">
        {post.tags.map((tag, index) => (
          <span key={index} className="blog-tag">#{tag}</span>
        ))}
      </div>
      
      {/* Author Section */}
      <div className="mt-12 pt-8 border-t flex items-center">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-blog-primary text-white flex items-center justify-center text-2xl font-bold">
            ع
          </div>
        </div>
        <div className="mr-4">
          <h3 className="font-bold text-lg">عبد الله</h3>
          <p className="text-muted-foreground">مؤسس المدونة الرقمية ومهتم بالتقنية والتطوير الذاتي</p>
        </div>
      </div>
    </>
  );
};

export default BlogPostFooter;
