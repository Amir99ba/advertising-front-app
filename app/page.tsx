import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PartnersSection } from "@/components/PartnersSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/*----- هدر -----*/}
      <Header />

      <main>
        {/*----- هیرو سکشن -----*/}
        <HeroSection />

        {/*----- خدمات ما -----*/}
        <ServicesSection />

        {/*----- همکاران -----*/}
        <PartnersSection />

        {/*----- نظرات مشتریان -----*/}
        <TestimonialsSection />
      </main>

      {/*----- فوتر -----*/}
      <Footer />
    </div>
  );
}