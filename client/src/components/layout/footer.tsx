import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-xl font-bold font-poppins text-white mb-4">Jokoris</div>
            <p className="mb-4">Menjelajahi pertemuan antara kehidupan, iman, dan marketing di dunia yang terus berubah. Bergabunglah dalam perjalanan penemuan dan pertumbuhan ini.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-150">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-150">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-150">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-150">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Menu Utama</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors duration-150">Home</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors duration-150">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors duration-150">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-150">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li><Link href="/blog?category=Life" className="hover:text-white transition-colors duration-150">Life</Link></li>
              <li><Link href="/blog?category=Religion" className="hover:text-white transition-colors duration-150">Religion</Link></li>
              <li><Link href="/blog?category=Marketing" className="hover:text-white transition-colors duration-150">Marketing</Link></li>
              <li><Link href="/blog?category=Books" className="hover:text-white transition-colors duration-150">Books</Link></li>
              <li><Link href="/blog?category=Technology" className="hover:text-white transition-colors duration-150">Technology</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Jokoris. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/privacy" className="mr-4 hover:text-white transition-colors duration-150">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-150">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
