import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/hero-section";
import FeaturedPosts from "@/components/home/featured-posts";
import CategorySection from "@/components/home/category-section";
import RecentPosts from "@/components/home/recent-posts";
import RecommendedPosts from "@/components/home/recommended-posts";
import NewsletterSection from "@/components/home/newsletter-section";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Jokoris - Blog Pribadi</title>
        <meta name="description" content="Mengeksplorasi persilangan kehidupan, iman, dan pemasaran dalam dunia yang terus berubah." />
        <meta property="og:title" content="Jokoris - Blog Pribadi" />
        <meta property="og:description" content="Mengeksplorasi persilangan kehidupan, iman, dan pemasaran dalam dunia yang terus berubah." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jokoris.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jokoris - Blog Pribadi" />
        <meta name="twitter:description" content="Mengeksplorasi persilangan kehidupan, iman, dan pemasaran dalam dunia yang terus berubah." />
        <meta name="keywords" content="jokoris, blog indonesia, kehidupan, iman, pemasaran, teknologi, karier, pengembangan diri" />
        <meta name="language" content="id-ID" />
        <meta name="geo.region" content="ID" />
      </Helmet>
      
      <main>
        <HeroSection />
        <FeaturedPosts />
        <CategorySection />
        <RecentPosts />
        <RecommendedPosts />
        <NewsletterSection />
      </main>
    </>
  );
};

export default Home;
