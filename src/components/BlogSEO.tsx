import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../services/api';

interface BlogSEOProps {
  post: BlogPost;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post }) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://digitalnexushub.com';
  const postUrl = `${siteUrl}/blog/${post.id}`;
  
  const title = `${post.title} | DigitalNexus Hub Blog`;
  const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  const keywords = `${post.title}, ${post.author}, blog, digital products, web development, ${post.content.replace(/<[^>]*>/g, '').substring(0, 100).split(' ').slice(0, 5).join(', ')}`;

  const publishDate = new Date(post.created_at).toISOString();
  const modifiedDate = new Date(post.created_at).toISOString();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={post.author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={postUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="DigitalNexus Hub" />
      <meta property="article:author" content={post.author} />
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={postUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:label1" content="Written by" />
      <meta property="twitter:data1" content={post.author} />
      <meta property="twitter:label2" content="Reading time" />
      <meta property="twitter:data2" content="5 min read" />
      
      {/* Structured Data - Article */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": description,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "DigitalNexus Hub",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/logo.png`
            }
          },
          "datePublished": publishDate,
          "dateModified": modifiedDate,
          "mainEntityOfPage": postUrl,
          "url": postUrl,
          "image": `${siteUrl}/images/blog/${post.id}.jpg`
        })}
      </script>
    </Helmet>
  );
};

export default BlogSEO;