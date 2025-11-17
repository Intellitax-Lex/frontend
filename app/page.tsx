import HeroSection from "../components/layout/HeroSection";
import PricingSection from "../components/layout/PricingSection";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {" "}
        <HeroSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
