import Header from "./components/Header";
import Hero from "./components/Hero";
import {
  ServicesIntro,
  TuKawachSection,
  FastagSection,
  SmartFuelSection,
  LoadBoardSection,
} from "./components/ServicesSections";
import StackedPanels from "./components/StackedPanels";
import SectionDock from "./components/SectionDock";
import PartnersSection from "./components/PartnersSection";
import ScaleSection from "./components/ScaleSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import SpotlightSection from "./components/SpotlightSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

const SERVICE_IDS = ["tu-kawach", "fastag", "smart-fuel", "load-board"];

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ServicesIntro />
      <SectionDock />
      <StackedPanels ids={SERVICE_IDS}>
        <TuKawachSection />
        <FastagSection />
        <SmartFuelSection />
        <LoadBoardSection />
      </StackedPanels>
      <PartnersSection />
      <ScaleSection />
      <StatsSection />
      <TestimonialsSection />
      <SpotlightSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
