
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import type { Category } from "@shared/schema";

export default function AdminPosts() {
  const [, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none min-h-[200px] focus:outline-none",
      },
    },
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin");
      return;
    }

    // Load categories
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editor?.getText()) {
      toast({ 
        title: "Error", 
        description: "Konten artikel tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          title,
          categoryId: parseInt(categoryId),
          content: editor.getHTML(),
        }),
      });

      if (!res.ok) throw new Error("Failed to create post");
      
      toast({ title: "Artikel berhasil disimpan" });
      setTitle("");
      setCategoryId("");
      editor?.commands.setContent("");
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Gagal menyimpan artikel",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tulis Artikel Baru</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Judul Artikel
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Kategori
          </label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Konten Artikel
          </label>
          <div className="min-h-[400px] border rounded-lg p-4">
            <EditorContent editor={editor} />
          </div>
        </div>

        <Button type="submit" size="lg">
          Simpan Artikel
        </Button>
      </form>
    </div>
  );
}
