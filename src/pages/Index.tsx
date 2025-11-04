import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrainingModules from "@/components/TrainingModules";
import Benefits from "@/components/Benefits";
import TrainerTeam from "@/components/TrainerTeam";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrainingModules />
        <Benefits />
        <TrainerTeam />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;