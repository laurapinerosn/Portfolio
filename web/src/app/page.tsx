import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BeyondModels from "@/components/BeyondModels";
import SelectedWork from "@/components/SelectedWork";
import HowIThink from "@/components/HowIThink";
import Curiosity from "@/components/Curiosity";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BeyondModels />
        <SelectedWork />
        <HowIThink />
        <Curiosity />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
