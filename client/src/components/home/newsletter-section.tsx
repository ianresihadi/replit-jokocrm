import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Check, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Alamat email tidak valid")
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSection = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema)
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Gagal berlangganan');
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Berlangganan berhasil!",
        description: "Terima kasih telah berlangganan newsletter kami.",
        variant: "default"
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Gagal berlangganan",
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: NewsletterFormData) => {
    subscribeMutation.mutate(data);
  };

  return (
    <section id="newsletter" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-850"></div>
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 lg:p-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold font-poppins mb-4 text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Dapatkan insight dan panduan praktis langsung di inbox Anda
              </motion.h2>
              
              <motion.p 
                className="text-slate-600 dark:text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Berlangganan newsletter mingguan dengan konten pilihan dan wawasan mendalam tentang kehidupan, spiritualitas, dan strategi marketing.
              </motion.p>
              
              <motion.ul
                className="space-y-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Panduan praktis yang aplikatif</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Analisis tren terbaru dan insight mendalam</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Akses konten eksklusif</span>
                </li>
              </motion.ul>
              
              <motion.form 
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      className={`px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border ${errors.name ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'} w-full focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className={`px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border ${errors.email ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'} w-full focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Berlangganan Sekarang
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
                
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Lock className="h-3 w-3 mr-1" />
                  Email Anda aman bersama kami. Kami menghargai privasi Anda.
                </div>
              </motion.form>
            </div>
            
            <div className="lg:col-span-2 hidden lg:block">
              <div className="h-full bg-gradient-to-br from-primary to-purple-600 p-12 relative">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/10 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-center">
                  <div className="text-white mb-8">
                    <div className="text-xl font-bold mb-4">Bergabunglah dengan +2,500 pembaca</div>
                    <div className="text-white/80">
                      Yang mendapatkan wawasan terbaru dari dunia marketing, spiritualitas, dan gaya hidup setiap minggunya
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                    <div className="flex items-start mb-4">
                      <div className="text-amber-300 mr-3 mt-1">❝</div>
                      <div>
                        <p className="text-white/90 italic mb-3">
                          Newsletter ini mengubah cara saya memandang marketing. Insight yang diberikan selalu relevan dan praktis untuk diterapkan.
                        </p>
                        <div className="font-medium">Sarah K.</div>
                        <div className="text-xs text-white/70">Digital Marketer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
