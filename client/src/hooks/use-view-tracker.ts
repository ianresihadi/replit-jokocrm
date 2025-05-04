import { useEffect } from 'react';

/**
 * Hook untuk melacak artikel yang dilihat oleh pengguna
 * dan menyimpannya di localStorage untuk personalisasi konten
 */
export function useViewTracker(postId: number | null) {
  useEffect(() => {
    if (!postId) return;
    
    try {
      // Ambil riwayat artikel yang telah dilihat
      const viewedPostsStr = localStorage.getItem('viewedPosts');
      let viewedPosts: number[] = [];
      
      if (viewedPostsStr) {
        viewedPosts = JSON.parse(viewedPostsStr);
      }
      
      // Jika artikel belum pernah dilihat, tambahkan ke daftar
      if (!viewedPosts.includes(postId)) {
        // Simpan maksimal 10 artikel terakhir
        const updatedPosts = [postId, ...viewedPosts].slice(0, 10);
        localStorage.setItem('viewedPosts', JSON.stringify(updatedPosts));
      } else {
        // Jika sudah pernah dilihat, pindahkan ke posisi pertama (paling baru)
        const filteredPosts = viewedPosts.filter(id => id !== postId);
        const updatedPosts = [postId, ...filteredPosts];
        localStorage.setItem('viewedPosts', JSON.stringify(updatedPosts));
      }
    } catch (error) {
      console.error('Error saving viewed post to localStorage:', error);
    }
  }, [postId]);
}

/**
 * Fungsi untuk mendapatkan daftar artikel yang telah dilihat
 */
export function getViewedPosts(): number[] {
  try {
    const viewedPostsStr = localStorage.getItem('viewedPosts');
    return viewedPostsStr ? JSON.parse(viewedPostsStr) : [];
  } catch (error) {
    console.error('Error reading viewed posts from localStorage:', error);
    return [];
  }
}