import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook':
        return '📚';
      case 'course':
        return '🎓';
      case 'software':
        return '💻';
      default:
        return '📦';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ebook':
        return 'bg-green-100 text-green-800';
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'software':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-2xl font-bold`}>
            {getTypeIcon(product.type)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(product.type)}`}>
            {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          {product.license_required && (
            <span className="text-sm text-gray-500">
              🔑 License Required
            </span>
          )}
        </div>

        <Link to={`/product/${product.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;