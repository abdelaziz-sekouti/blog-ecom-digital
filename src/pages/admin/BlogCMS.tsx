import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getBlogPosts, BlogPost } from '../../services/api';
import { createBlogPost, updateBlogPost, deleteBlogPost } from '../../services/adminApi';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../../contexts/AuthContext';

interface BlogFormData {
  title: string;
  content: string;
  author: string;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  author: yup.string().required('Author is required'),
});

const BlogCMS: React.FC = () => {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<BlogFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      author: user?.name || '',
    },
  });

  const contentValue = watch('content');

  useEffect(() => {
    fetchPosts();
    if (user?.name) {
      setValue('author', user.name);
    }
  }, [user, setValue]);

  const fetchPosts = async () => {
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
    if (!token) return;

    setSubmitting(true);
    try {
      if (editingPost) {
        await updateBlogPost(token, editingPost.id, data);
      } else {
        await createBlogPost(token, data);
      }

      await fetchPosts();
      reset();
      setEditingPost(null);
    } catch (error) {
      console.error('Failed to save blog post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setValue('title', post.title);
    setValue('content', post.content);
    setValue('author', post.author);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;

    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(token, id);
        await fetchPosts();
      } catch (error) {
        console.error('Failed to delete blog post:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    reset();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Blog CMS</h1>
          <p className="text-gray-600 mt-2">Create and manage your blog content</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {editingPost ? 'Edit Blog Post' : 'Create New Post'}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Post Title
                    </label>
                    <input
                      {...register('title')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter post title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      {...register('author')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Author name"
                    />
                    {errors.author && (
                      <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <div className="min-h-[300px]">
                    <Editor
                      value={contentValue || ''}
                      onEditorChange={(content) => setValue('content', content)}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; }'
                      }}
                    />
                  </div>
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Saving...' : (editingPost ? 'Update Post' : 'Publish Post')}
                  </motion.button>
                  {editingPost && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleCancel}
                      className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Posts List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Published Posts ({posts.length})</h2>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * post.id }}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">By {post.author}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-2 flex-shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(post)}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(post.id)}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500">Create your first blog post to get started</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogCMS;