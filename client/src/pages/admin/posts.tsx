
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
import type { Category } from '@shared/schema';

export default function AdminPosts() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setError('Failed to load categories'));
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const content = editor?.getHTML() || '';

      if (!title || !content || !category) {
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
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      setTitle('');
      setCategory('');
      editor?.commands.setContent('');
      alert('Post berhasil dibuat!');
      setLocation('/blog');
    } catch (err: any) {
      setError(err.message || 'Gagal membuat post. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Buat Post Baru
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

            <div className="border dark:border-slate-600 rounded-lg p-4">
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
