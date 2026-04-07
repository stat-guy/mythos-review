import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import heroStats from "@/data/hero_stats.json";

interface HeroStat {
  label: string;
  value: number;
  suffix: string;
  context: string;
}

function AnimatedCounter({ stat, inView }: { stat: HeroStat; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = stat.value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(stat.value, increment * step);
      setDisplay(current);
      if (step >= steps) {
        clearInterval(timer);
        setDisplay(stat.value);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, stat.value]);

  const formatted =
    stat.value % 1 !== 0 ? display.toFixed(1) : Math.round(display).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center rounded-lg border border-border bg-card p-4 text-center"
    >
      <span className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {formatted}
        {stat.suffix}
      </span>
      <span className="mt-1 text-sm font-medium text-foreground">
        {stat.label}
      </span>
      <span className="mt-0.5 text-xs text-muted-foreground">
        {stat.context}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center px-4 pb-10 pt-14 sm:pb-16 sm:pt-20 text-center"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        April 7, 2026
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Claude Mythos Preview
      </h1>

      <p className="mt-2 text-lg text-primary sm:text-xl">
        The first Anthropic model withheld from public release
      </p>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Mythos Preview demonstrated unprecedented capabilities in software
        engineering and cybersecurity research. Anthropic ultimately chose not
        to release it publicly, citing the model's ability to discover and
        exploit real-world software vulnerabilities at a scale that outpaced
        existing safeguards.
      </p>

      <div
        ref={ref}
        className="mx-auto mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {(heroStats as HeroStat[]).map((stat) => (
          <AnimatedCounter key={stat.label} stat={stat} inView={inView} />
        ))}
      </div>
    </section>
  );
}
