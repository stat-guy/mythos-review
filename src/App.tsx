import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import BenchmarkSection from "@/components/BenchmarkSection";
import { CyberSection } from "@/components/CyberSection";
import { ExploitDeepDive } from "@/components/ExploitDeepDive";
import { SafetyDashboard } from "@/components/SafetyDashboard";
import { ModelWelfare } from "@/components/ModelWelfare";
import { TheDecision } from "@/components/TheDecision";
import { ReactionsSection } from "@/components/ReactionsSection";
import { Separator } from "@/components/ui/separator";

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
        <ReactionsSection />
      </main>

      {/* Site Footer — Sources */}
      <footer className="border-t border-border/50 bg-background">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 py-10 text-center text-xs text-muted-foreground">
          <Separator className="mb-4 max-w-xs" />
          <p className="font-medium">April 7, 2026</p>
          <div className="flex gap-4">
            <a
              href="https://www-cdn.anthropic.com/53566bf5440a10affd749724787c8913a2ae0841.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Full System Card (PDF)
            </a>
            <a
              href="https://red.anthropic.com/2026/mythos-preview/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Red Team Blog Post
            </a>
          </div>
          <p className="mt-2 text-muted-foreground/60">
            An educational explainer — not affiliated with Anthropic.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
