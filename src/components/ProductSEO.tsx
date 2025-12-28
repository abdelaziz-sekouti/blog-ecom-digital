import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Product } from '../services/api';

interface ProductSEOProps {
  product: Product;
}

const ProductSEO: React.FC<ProductSEOProps> = ({ product }) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://digitalnexushub.com';
  const productUrl = `${siteUrl}/product/${product.id}`;
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ebook': return 'E-book';
      case 'course': return 'Online Course';
      case 'software': return 'Software';
      default: return 'Digital Product';
    }
  };

  const title = `${product.title} - ${getTypeLabel(product.type)} | DigitalNexus Hub`;
  const description = product.description || `Get ${product.title}, a premium ${getTypeLabel(product.type).toLowerCase()} for just $${product.price}. Instant delivery and secure payment.`;
  const keywords = `${product.title}, ${getTypeLabel(product.type)}, digital products, ${product.type}, online learning, software download`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={productUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={productUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="DigitalNexus Hub" />
      
      {/* Product Specific Open Graph */}
      <meta property="product:brand" content="DigitalNexus Hub" />
      <meta property="product:category" content={product.type} />
      <meta property="product:price:amount" content={product.price.toString()} />
      <meta property="product:price:currency" content="USD" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="product" />
      <meta property="twitter:url" content={productUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      
      {/* Structured Data - Product */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.title,
          "description": description,
          "category": getTypeLabel(product.type),
          "brand": {
            "@type": "Brand",
            "name": "DigitalNexus Hub"
          },
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": productUrl
          },
          "image": `${siteUrl}/images/products/${product.id}.jpg`,
          "url": productUrl
        })}
      </script>
    </Helmet>
  );
};

export default ProductSEO;