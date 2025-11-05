import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrainingModules from "@/components/TrainingModules";
import TrainingLocations from "@/components/TrainingLocations";
import Benefits from "@/components/Benefits";
import CustomerReviews from "@/components/CustomerReviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrainingModules />
        <TrainingLocations />
        <Benefits />
        <CustomerReviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;