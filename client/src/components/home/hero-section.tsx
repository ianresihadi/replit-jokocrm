import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Bell } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center mb-3"
            >
              <div className="bg-primary/10 text-primary text-sm font-medium px-4 py-1 rounded-full">
                Joko Ristono • Trainer & Public Speaker
              </div>
            </motion.div>
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Membangun <span className="text-primary">Leadership</span> & <span className="bg-gradient-text">Marketing</span> untuk Era Digital
            </motion.h1>
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wawasan bisnis, spiritualitas, dan strategi pemasaran yang mengubah cara Anda berpikir dan bertindak. Dibawakan oleh praktisi berpengalaman untuk generasi muda yang penuh ambisi.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button 
                onClick={() => window.location.href = '/blog'} 
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center justify-center"
              >
                Jelajahi Artikel
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button 
                onClick={() => window.location.href = '/services'} 
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-lg flex items-center justify-center"
              >
                Program & Layanan
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 mt-8 md:mt-0">
            <motion.div 
              className="relative rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                alt="Featured" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full mb-2">
                  New Perspective
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pendekatan Mindful terhadap Marketing Digital</h3>
                <div className="flex items-center">
                  <span className="text-xs text-white/90">5 min read</span>
                  <span className="mx-2 text-white/70">•</span>
                  <span className="text-xs text-white/90">Mei 2, 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
