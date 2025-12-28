import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BlogPost } from '../services/api';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">
            By {post.author}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(post.created_at)}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h2>

        <div 
          className="text-gray-600 mb-4 prose prose-sm max-w-none line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: truncateContent(post.content) 
          }}
        />

        <Link to={`/blog/${post.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
          >
            Read More
          </motion.button>
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;