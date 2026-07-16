import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import ProductPreview from "../components/ProductPreview";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import BackgroundGlow from "../components/BackgroundGlow";


const Home = () => {
  return (
    <div className="bg-[#09090F] text-white pt-24">

      <BackgroundGlow />

      <Navbar />

      <Hero />

      <ProductPreview />

      <Features />

      <HowItWorks />

      <FAQ />

      <CTA />

      <Footer />

    </div>
  );
};

export default Home;