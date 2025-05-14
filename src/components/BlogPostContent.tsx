
import React from 'react';
import { PostWithContent } from '@/utils/blogDatabase';

interface BlogPostContentProps {
  post: PostWithContent;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  // If post has HTML content, render it, otherwise render the excerpt
  const content = post.content || post.excerpt;

  return (
    <div className="px-4 py-8 prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-img:rounded-lg max-w-none">
      {post.content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default BlogPostContent;
