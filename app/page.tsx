import Header from "../components/layout/Header";
import HeroSection from "../components/layout/HeroSection";
import ProblemSection from "../components/layout/ProblemSection";
import SolutionSection from "../components/layout/SolutionSection";
import SocialProofSection from "../components/layout/SocialProofSection";
import PricingSection from "../components/layout/PricingSection";
import LeadMagnetSection from "../components/layout/LeadMagnetSection";
import Footer from "../components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <SocialProofSection />
        <PricingSection />
        <LeadMagnetSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;