
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Edit, Trash2, Eye, Plus } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filterCategory, setFilterCategory] = useState('all');
  const [, setLocation] = useLocation();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: editingPost?.content || '',
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

    // Load data
    Promise.all([
      fetch('/api/categories'),
      fetch('/api/admin/posts', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ])
      .then(([catRes, postsRes]) => Promise.all([catRes.json(), postsRes.json()]))
      .then(([catData, postsData]) => {
        setCategories(catData);
        setPosts(postsData);
      })
      .catch(() => setError('Failed to load data'));
  }, [setLocation]);

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.categoryId.toString() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (postId: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete post');

      setPosts(posts.filter(post => post.id !== postId));
      alert('Post deleted successfully');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setCategory(post.categoryId.toString());
    setThumbnail(post.thumbnail || '');
    editor?.commands.setContent(post.content);
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
      
      // Reset form
      setTitle('');
      setCategory('');
      editor?.commands.setContent('');
      setThumbnail('');
      setEditingPost(null);
      alert('Post berhasil disimpan!');
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan post. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="posts" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="posts">Daftar Post</TabsTrigger>
              <TabsTrigger value="editor">
                {editingPost ? 'Edit Post' : 'Buat Post Baru'}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="posts">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Cari post..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    variant={view === 'list' ? 'default' : 'outline'}
                    onClick={() => setView('list')}
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === 'grid' ? 'default' : 'outline'}
                    onClick={() => setView('grid')}
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {view === 'list' ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                          {categories.find(c => c.id === post.categoryId)?.name}
                        </TableCell>
                        <TableCell>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={post.published ? 'default' : 'secondary'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700"
                    >
                      {post.thumbnail && (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      )}
                      <h3 className="font-medium mb-2">{post.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant={post.published ? 'default' : 'secondary'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="editor">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  placeholder="Judul Post"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-lg"
                />

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
                        if (file) {
                          const formData = new FormData();
                          formData.append('image', file);
                          
                          fetch('/api/upload', {
                            method: 'POST',
                            headers: {
                              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                            },
                            body: formData
                          })
                            .then(res => res.json())
                            .then(data => {
                              editor?.chain().focus().setImage({ src: data.url }).run();
                            })
                            .catch(() => {
                              setError('Failed to upload image. Please try again.');
                            });
                        }
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
                    onClick={() => {
                      setEditingPost(null);
                      setTitle('');
                      setCategory('');
                      editor?.commands.setContent('');
                      setThumbnail('');
                    }}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan Post'}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
