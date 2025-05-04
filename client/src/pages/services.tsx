import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { 
  Users, 
  Star, 
  BarChart, 
  Zap, 
  ArrowRight, 
  Check, 
  Calendar, 
  Clock, 
  MessageCircle,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const Services = () => {
  const [activeCategoryTab, setActiveCategoryTab] = useState("training");
  
  const trainingPrograms = [
    {
      id: 1,
      title: "Digital Marketing Mastery",
      description: "Program komprehensif yang mencakup semua aspek digital marketing modern, dari SEO dan SEM hingga content marketing dan social media advertising.",
      duration: "2 hari",
      audience: "Marketing professionals, business owners",
      format: "Workshop interaktif dengan studi kasus",
      icon: <BarChart className="h-6 w-6 text-primary" />
    },
    {
      id: 2,
      title: "Leadership Excellence",
      description: "Mengembangkan keterampilan kepemimpinan yang efektif untuk berbagai situasi bisnis. Fokus pada komunikasi, pemecahan konflik, dan membangun tim yang kuat.",
      duration: "3 hari",
      audience: "Managers, team leaders, executives",
      format: "Kombinasi teori, diskusi, dan simulasi praktis",
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      id: 3,
      title: "Public Speaking & Presentation Mastery",
      description: "Tingkatkan kemampuan berbicara di depan umum dan presentasi Anda. Mengatasi kecemasan berbicara, menyusun presentasi yang memukau, dan teknik penyampaian yang efektif.",
      duration: "1 hari",
      audience: "Professionals at all levels",
      format: "Praktik intensif dengan video feedback",
      icon: <MessageCircle className="h-6 w-6 text-primary" />
    },
    {
      id: 4,
      title: "Personal Branding for Professionals",
      description: "Membangun dan mengelola citra profesional Anda secara strategis di era digital. Dari LinkedIn hingga networking, kembangkan personal brand yang otentik dan kuat.",
      duration: "1 hari",
      audience: "Professionals, entrepreneurs, job seekers",
      format: "Workshop dengan action planning session",
      icon: <Target className="h-6 w-6 text-primary" />
    }
  ];

  const speakingEngagements = [
    {
      id: 1,
      title: "Keynote Address",
      description: "Presentasi inspiratif dan informatif yang disesuaikan dengan tema acara dan kebutuhan audiens Anda, menyediakan wawasan berharga dan perspektif segar.",
      duration: "45-60 menit",
      topics: "Digital transformation, leadership, marketing innovation, mindfulness in business",
      icon: <Star className="h-6 w-6 text-primary" />
    },
    {
      id: 2,
      title: "Panel Discussion",
      description: "Partisipasi dalam diskusi panel sebagai pakar industri, membagikan wawasan dan perspektif berharga pada topik spesifik.",
      duration: "Sesuai kebutuhan",
      topics: "Marketing trends, leadership challenges, digital strategies",
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      id: 3,
      title: "Workshop Moderator",
      description: "Memfasilitasi workshop dan diskusi dengan keahlian, memastikan semua peserta terlibat dan tujuan sesi tercapai.",
      duration: "Half-day atau full-day",
      topics: "Strategic planning, team building, creative problem-solving",
      icon: <Zap className="h-6 w-6 text-primary" />
    }
  ];

  const consultingServices = [
    {
      id: 1,
      title: "Marketing Strategy Development",
      description: "Pengembangan strategi marketing komprehensif yang disesuaikan dengan tujuan bisnis dan target audiens Anda.",
      deliverables: "Custom marketing plan, competitive analysis, implementation roadmap",
      icon: <Target className="h-6 w-6 text-primary" />
    },
    {
      id: 2,
      title: "Brand Positioning & Messaging",
      description: "Menemukan positioning unik untuk brand Anda dan mengembangkan pesan yang beresonansi dengan audiens target.",
      deliverables: "Brand positioning statement, messaging framework, communication guidelines",
      icon: <MessageCircle className="h-6 w-6 text-primary" />
    },
    {
      id: 3,
      title: "Leadership Coaching",
      description: "One-on-one coaching untuk membantu eksekutif dan manajer mengembangkan keterampilan kepemimpinan mereka.",
      deliverables: "Personalized development plan, regular coaching sessions, progress evaluation",
      icon: <Users className="h-6 w-6 text-primary" />
    }
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Basic Workshop",
      price: "Rp 5.000.000",
      description: "Ideal untuk tim kecil atau startup yang ingin meningkatkan keterampilan spesifik.",
      features: [
        "1 hari workshop",
        "Hingga 10 peserta",
        "Materi pelatihan digital",
        "Sertifikat pelatihan",
        "1 jam konsultasi follow-up"
      ]
    },
    {
      name: "Premium Training",
      price: "Rp 15.000.000",
      description: "Solusi komprehensif untuk perusahaan menengah yang ingin transformasi signifikan.",
      features: [
        "2 hari intensive training",
        "Hingga 20 peserta",
        "Materi cetakan premium",
        "Sertifikat pelatihan",
        "3 jam konsultasi follow-up",
        "Akses eksklusif ke resources online",
        "6 bulan email support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise Solution",
      price: "Custom",
      description: "Program yang sepenuhnya disesuaikan untuk kebutuhan spesifik perusahaan besar.",
      features: [
        "Program multi-hari kustom",
        "Jumlah peserta fleksibel",
        "Materi training sesuai kebutuhan",
        "Assessment sebelum & sesudah",
        "Konsultasi berkelanjutan",
        "Akses permanen ke resources",
        "Priority support",
        "Train-the-trainer options"
      ]
    }
  ];

  const faqs = [
    {
      question: "Bagaimana proses booking untuk training atau speaking engagement?",
      answer: "Proses dimulai dengan konsultasi awal untuk memahami kebutuhan Anda. Setelah itu, kami akan menyusun proposal yang mencakup agenda, metodologi, dan investasi. Setelah persetujuan, kami akan menentukan tanggal dan melakukan persiapan khusus untuk memastikan program sesuai dengan kebutuhan spesifik organisasi Anda."
    },
    {
      question: "Apakah program training dapat disesuaikan dengan kebutuhan spesifik perusahaan kami?",
      answer: "Absolut! Semua program training kami dirancang dengan pendekatan yang sangat customizable. Kami melakukan assessment terhadap kebutuhan, tantangan, dan tujuan organisasi Anda sebelum merancang program. Kustomisasi bisa mencakup studi kasus spesifik industri, durasi, tingkat kedalaman materi, dan metode delivery."
    },
    {
      question: "Berapa lama durasi ideal untuk workshop atau training?",
      answer: "Durasi optimal bergantung pada tujuan pembelajaran, kedalaman materi, dan ketersediaan peserta. Program kami bervariasi dari half-day workshop hingga program multi-hari. Untuk perubahan perilaku dan keterampilan yang signifikan, kami biasanya merekomendasikan minimal 2 hari training dengan sesi follow-up."
    },
    {
      question: "Apakah Anda menyediakan layanan untuk acara virtual/online?",
      answer: "Ya, kami menawarkan semua layanan kami baik dalam format tatap muka maupun virtual. Program virtual kami didesain khusus untuk platform digital dengan metodologi yang interaktif, breakout sessions, dan tools kolaboratif online untuk memastikan engagement maksimal dan hasil pembelajaran yang efektif."
    },
    {
      question: "Apakah ada jumlah minimum peserta untuk program training?",
      answer: "Untuk efektivitas pembelajaran, kami menyarankan minimum 8 peserta dan maksimum 25 peserta per sesi. Namun, kami fleksibel dan dapat menyesuaikan metodologi untuk kelompok yang lebih kecil atau lebih besar sesuai kebutuhan."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Program & Layanan | Joko Ristono</title>
        <meta name="description" content="Jelajahi program training, konsultasi, dan jasa public speaking dari Joko Ristono untuk pengembangan bisnis dan individu Anda." />
      </Helmet>
      
      <main className="py-16">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-poppins">
                Program & <span className="text-primary">Layanan</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Solusi pengembangan profesional yang dirancang untuk membantu Anda dan organisasi Anda mencapai potensi penuh di era digital yang kompetitif.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeCategoryTab === "training" 
                    ? "bg-primary text-white" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveCategoryTab("training")}
              >
                Training Programs
              </button>
              <button 
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeCategoryTab === "speaking" 
                    ? "bg-primary text-white" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveCategoryTab("speaking")}
              >
                Speaking Engagements
              </button>
              <button 
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeCategoryTab === "consulting" 
                    ? "bg-primary text-white" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveCategoryTab("consulting")}
              >
                Consulting Services
              </button>
            </div>
            
            {/* Training Programs */}
            {activeCategoryTab === "training" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {trainingPrograms.map((program) => (
                    <div key={program.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {program.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">
                        {program.description}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white">Durasi:</span>
                            <span className="text-slate-600 dark:text-slate-300 ml-2">{program.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Users className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white">Audiens:</span>
                            <span className="text-slate-600 dark:text-slate-300 ml-2">{program.audience}</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white">Format:</span>
                            <span className="text-slate-600 dark:text-slate-300 ml-2">{program.format}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.location.href = '/contact'}
                        className="text-primary hover:text-primary/90 font-medium inline-flex items-center"
                      >
                        Tanyakan tentang program ini
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    Butuh program yang lebih spesifik?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                    Kami menawarkan program training kustom yang dirancang sesuai kebutuhan spesifik organisasi Anda. Konsultasikan kebutuhan Anda dengan kami.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Hubungi Kami
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Speaking Engagements */}
            {activeCategoryTab === "speaking" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {speakingEngagements.map((service) => (
                    <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">
                        {service.description}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white">Durasi:</span>
                            <span className="text-slate-600 dark:text-slate-300 ml-2">{service.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MessageCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white">Topik:</span>
                            <span className="text-slate-600 dark:text-slate-300 ml-2">{service.topics}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.location.href = '/contact'}
                        className="text-primary hover:text-primary/90 font-medium inline-flex items-center"
                      >
                        Tanyakan ketersediaan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                      Kriteria Penerimaan Undangan
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 text-center">
                      Untuk memastikan value yang maksimal, berikut kriteria yang kami pertimbangkan sebelum menerima undangan speaking:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300">Relevansi dengan area keahlian dan passion</p>
                      </div>
                      <div className="flex">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300">Dampak potensial pada audiens</p>
                      </div>
                      <div className="flex">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300">Kesesuaian dengan nilai dan misi</p>
                      </div>
                      <div className="flex">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300">Alokasi waktu yang cukup untuk persiapan</p>
                      </div>
                      <div className="flex">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300">Kesempatan memberikan nilai tambah yang signifikan</p>
                      </div>
                      <div className="flex">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 dark:text-slate-300">Kesesuaian dengan jadwal yang tersedia</p>
                      </div>
                    </div>
                    <div className="text-center mt-8">
                      <Button 
                        onClick={() => window.location.href = '/contact'}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Kirim Undangan
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Consulting Services */}
            {activeCategoryTab === "consulting" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {consultingServices.map((service) => (
                    <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-start mb-6">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">Deliverables:</span>
                          <span className="text-slate-600 dark:text-slate-300 ml-2">{service.deliverables}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.location.href = '/contact'}
                        className="text-primary hover:text-primary/90 font-medium inline-flex items-center"
                      >
                        Tanyakan tentang layanan ini
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                    Proses Konsultasi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Discovery</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Memahami secara mendalam tantangan, tujuan, dan konteks bisnis Anda
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Analysis</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Menganalisis situasi, data, dan insight untuk mengidentifikasi area perbaikan
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Strategy</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Mengembangkan solusi dan rekomendasi yang disesuaikan dengan kebutuhan spesifik
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Implementation</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Mendampingi proses implementasi dan memberikan dukungan berkelanjutan
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <Button 
                      onClick={() => window.location.href = '/contact'}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Konsultasi Gratis
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="mb-16 bg-slate-50 dark:bg-slate-900/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 font-poppins">
                Investasi dalam Pengembangan
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Pilih paket yang paling sesuai dengan kebutuhan dan skala organisasi Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index}
                  className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm ${
                    plan.highlighted ? 'ring-2 ring-primary' : ''
                  } overflow-hidden`}
                >
                  {plan.highlighted && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => window.location.href = '/contact'}
                      className={`w-full ${
                        plan.highlighted 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
                      }`}
                    >
                      {plan.price === 'Custom' ? 'Hubungi Kami' : 'Pesan Sekarang'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 text-slate-600 dark:text-slate-300">
              <p>Semua harga belum termasuk pajak dan biaya lain yang mungkin berlaku.</p>
              <p className="mt-2">Untuk kebutuhan yang lebih spesifik, silakan <a href="/contact" className="text-primary hover:underline">hubungi kami</a> untuk penawaran yang disesuaikan.</p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 font-poppins">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Jawaban untuk pertanyaan umum tentang layanan kami
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary/5 dark:bg-primary/10 py-16 rounded-2xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 font-poppins">
              Siap untuk Memulai?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Hubungi kami untuk konsultasi gratis dan diskusikan bagaimana kami dapat membantu Anda dan organisasi Anda mencapai tujuan.
            </p>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
            >
              Hubungi Kami Sekarang
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;