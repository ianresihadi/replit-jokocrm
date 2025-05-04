
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert } from '@/components/ui/alert';
import type { Category, Post } from '@shared/schema';

export default function AdminPosts() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [, setLocation] = useLocation();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[500px] max-w-none',
      },
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/admin/login');
      return;
    }

    // Load categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setError('Failed to load categories'));

    // Load posts
    fetch('/api/admin/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setError('Failed to load posts'));
  }, [setLocation]);

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: formData
      });

      if (!res.ok) throw new Error('Failed to upload image');

      const { url } = await res.json();
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const content = editor?.getHTML() || '';

      if (!title || !content || !category || !thumbnail) {
        throw new Error('Please fill all required fields');
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          categoryId: parseInt(category),
          published: true,
          authorId: 1,
          tags: [],
          slug,
          excerpt,
          thumbnail
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      const newPost = await res.json();
      setPosts([...posts, newPost]);
      
      setTitle('');
      setCategory('');
      editor?.commands.setContent('');
      setThumbnail('');
      alert('Post berhasil dibuat!');
    } catch (err: any) {
      setError(err.message || 'Gagal membuat post. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete post');

      setPosts(posts.filter(post => post.id !== postId));
      alert('Post deleted successfully');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Post List */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            Daftar Post
          </h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded">
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Create/Edit Post Form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            {editingPost ? 'Edit Post' : 'Buat Post Baru'}
          </h1>

          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Judul Post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-lg"
              />
            </div>

            <div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const formData = new FormData();
                      formData.append('thumbnailImage', file);

                      const res = await fetch('/api/upload/thumbnail', {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                        },
                        body: formData
                      });

                      if (!res.ok) throw new Error('Failed to upload thumbnail');

                      const response = await res.text();
                      const filename = response.replace('File uploaded successfully: ', '');
                      const url = `/uploads/${filename}`;
                      setThumbnail(url);
                    } catch (err) {
                      setError('Failed to upload thumbnail. Please try again.');
                    }
                  }
                }}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary/90"
              />
            </div>

            <div className="border dark:border-slate-600 rounded-lg p-4">
              <div className="mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  id="content-image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('content-image-upload')?.click()}
                >
                  Insert Content Image
                </Button>
              </div>
              <EditorContent editor={editor} />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation('/blog')}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
