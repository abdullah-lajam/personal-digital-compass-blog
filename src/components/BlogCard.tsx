
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categorySlug: string;
  slug: string;
  coverImage: string;
  tags: string[];
  htmlFile?: string; // Path to external HTML file (optional)
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="blog-card h-full flex flex-col">
      <Link to={`/${post.categorySlug}/${post.slug}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      
      <CardHeader className="pb-2">
        <div className="text-sm text-muted-foreground">
          <Link to={`/${post.categorySlug}`} className="text-blog-primary hover:underline">
            {post.category}
          </Link>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
        </div>
        <Link to={`/${post.categorySlug}/${post.slug}`}>
          <h3 className="text-xl font-bold hover:text-blog-primary transition-colors leading-tight mt-1">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      
      <CardFooter className="pt-3 flex flex-wrap">
        {post.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="blog-tag">#{tag}</span>
        ))}
        {post.htmlFile && (
          <span className="ms-auto text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            HTML
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
