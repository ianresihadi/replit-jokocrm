import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Award, BookOpen, Users, MessageCircle, Calendar, TrendingUp, Target } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Tentang Joko Ristono | Jokoris</title>
        <meta name="description" content="Trainer, public speaker, dan konsultan pemasaran yang membantu bisnis dan individu mengembangkan potensi mereka di era digital." />
      </Helmet>
      
      <main className="py-16">
        {/* Hero Section */}
        <section className="mb-16 bg-white dark:bg-slate-900/60 py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div 
                className="md:w-2/5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?auto=format&fit=crop&w=600&q=80" 
                    alt="Joko Ristono" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-3/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-poppins">
                  Joko Ristono
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    Trainer
                  </span>
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    Public Speaker
                  </span>
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    Marketing Consultant
                  </span>
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Membantu bisnis dan individu mengembangkan potensi penuh mereka di era digital melalui pelatihan yang transformatif dan strategi marketing yang terbukti efektif.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">10+ Tahun Pengalaman</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">5000+ Peserta Training</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-primary mr-2" />
                    <span className="text-slate-700 dark:text-slate-300">200+ Event</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Bio Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 font-poppins">
              Perjalanan Profesional
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert prose-slate">
              <p>
                Joko Ristono memulai karirnya sebagai seorang marketing practitioner di salah satu perusahaan FMCG terkemuka. Pengalamannya di lapangan membangun pemahaman mendalam tentang dinamika pasar dan perilaku konsumen yang kemudian menjadi fondasi dari metode pelatihannya yang unik.
              </p>
              <p>
                Setelah lebih dari satu dekade di industri, Joko memutuskan untuk berbagi pengetahuan dan pengalamannya melalui sesi pelatihan dan konsultasi. Pendekatan pelatihannya yang menggabungkan strategi praktis, studi kasus nyata, dan prinsip-prinsip spiritual telah terbukti efektif membantu ribuan profesional meningkatkan kinerja mereka.
              </p>
              <p>
                Dikenal dengan gaya presentasi yang energetik dan melibatkan, Joko telah menjadi pembicara favorit di berbagai konferensi nasional dan acara korporat. Kemampuannya menyederhanakan konsep kompleks dan menyajikannya dalam format yang mudah diaplikasikan menjadikannya salah satu trainer terkemuka di bidangnya.
              </p>
            </div>
          </div>
        </section>
        
        {/* Expertise Section */}
        <section className="mb-16 bg-slate-50 dark:bg-slate-900/30 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center font-poppins">
              Keahlian & Area Expertise
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-12 text-center max-w-3xl mx-auto">
              Area fokus pelatihan dan konsultasi yang telah membantu banyak individu dan organisasi mencapai tujuan mereka.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Digital Marketing Strategy
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Strategi marketing digital yang komprehensif, dari pembuatan konten hingga optimasi konversi yang mendorong pertumbuhan bisnis.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Leadership Development
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Program pengembangan kepemimpinan yang mengeksplorasi berbagai gaya memimpin untuk memaksimalkan potensi tim di lingkungan yang terus berubah.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Public Speaking
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Teknik presentasi efektif yang membantu menyampaikan pesan dengan jelas, percaya diri, dan berpengaruh untuk berbagai audiens.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Personal Branding
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Membangun citra profesional yang autentik dan strategi positioning diri yang membedakan Anda dari kompetitor di pasar yang kompetitif.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Mindful Business
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Menjalankan bisnis dengan kesadaran penuh yang menggabungkan praktik spiritual dengan strategi bisnis untuk pertumbuhan berkelanjutan.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Productivity & Life Management
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Teknik produktivitas dan manajemen waktu yang membantu mencapai keseimbangan dan hasil optimal dalam pekerjaan dan kehidupan pribadi.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center font-poppins">
              Apa Kata Mereka
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-12 text-center max-w-3xl mx-auto">
              Testimoni dari profesional dan organisasi yang telah merasakan dampak dari program pelatihan dan konsultasi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=1" alt="Ahmad Zakiy" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Ahmad Zakiy</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Marketing Director, Indofood</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "Pelatihan bersama Pak Joko memberikan perspektif baru tentang marketing digital yang relevan untuk era sekarang. Metode penyampaiannya yang interaktif membuat materi mudah diserap."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=5" alt="Siti Nurhaliza" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Siti Nurhaliza</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">CEO, SN Ventures</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "Sesi leadership bersama Pak Joko mengubah cara saya memimpin tim. Pendekatan yang menggabungkan aspek spiritual dan bisnis memberikan keseimbangan yang sangat dibutuhkan."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=8" alt="Rudi Hartono" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Rudi Hartono</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Founder, StartupHub Indonesia</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                  {[5].map((star) => (
                    <span key={star} className="text-slate-300 dark:text-slate-600">★</span>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "Workshop public speaking yang luar biasa! Sekarang saya jauh lebih percaya diri saat presentasi di depan investor. Teknik-teknik yang diajarkan sangat praktis dan mudah diaplikasikan."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary/5 dark:bg-primary/10 py-16 rounded-2xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 font-poppins">
              Tertarik Berkolaborasi?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Joko Ristono tersedia untuk pelatihan perusahaan, workshop public speaking, konsultasi marketing, dan berbagai event lainnya.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg inline-flex items-center"
            >
              Hubungi Sekarang
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
