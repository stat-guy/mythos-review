import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import BenchmarkSection from "@/components/BenchmarkSection";
import { CyberSection } from "@/components/CyberSection";
import { ExploitDeepDive } from "@/components/ExploitDeepDive";
import { SafetyDashboard } from "@/components/SafetyDashboard";
import { ModelWelfare } from "@/components/ModelWelfare";
import { TheDecision } from "@/components/TheDecision";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl">
        <Hero />
        <BenchmarkSection />
        <CyberSection />
        <ExploitDeepDive />
        <SafetyDashboard />
        <ModelWelfare />
        <TheDecision />
      </main>
    </div>
  );
}

export default App;
