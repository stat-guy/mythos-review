import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/* ---------- Pillar Cards ---------- */

const pillars = [
  {
    number: "01",
    title: "Dual-Use Cyber Capabilities",
    description:
      "Mythos can autonomously discover and exploit zero-day vulnerabilities across every major operating system and browser. This is the first AI model to demonstrate this capability at a scale that outpaces the existing security ecosystem's ability to respond.",
    accent: "text-red-400",
    border: "border-red-500/20",
  },
  {
    number: "02",
    title: "Transitional Risk",
    description:
      "In the near term, attackers are likely to benefit more from these capabilities than defenders. The security landscape needs time to reach a new equilibrium — releasing the model now would widen the gap before defenses can catch up.",
    accent: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    number: "03",
    title: "Responsible Scaling",
    description:
      "Mythos is the first model evaluated under RSP v3.0. Its cybersecurity threat model triggered restricted deployment — the first time any Anthropic model has crossed that threshold. The policy worked as designed.",
    accent: "text-blue-400",
    border: "border-blue-500/20",
  },
];

function PillarCard({
  pillar,
  index,
  inView,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      className="flex"
    >
      <Card className={`flex h-full flex-col ${pillar.border}`}>
        <CardHeader>
          <span
            className={`text-xs font-bold uppercase tracking-widest ${pillar.accent}`}
          >
            {pillar.number}
          </span>
          <CardTitle>{pillar.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {pillar.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ---------- Main Section ---------- */

export function TheDecision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="decision" className="mx-auto max-w-6xl px-4 py-10 sm:py-16" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Section 7
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The Decision
        </h2>
      </motion.div>

      {/* Core Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-10"
      >
        <Card className="border-primary/20 bg-primary/[0.02]">
          <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Unprecedented
            </p>
            <h3 className="max-w-2xl text-xl font-bold leading-snug text-foreground sm:text-2xl">
              Claude Mythos Preview is the first Anthropic model withheld from
              public release.
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Despite being the most capable and best-aligned model Anthropic has
              ever built, its cybersecurity capabilities posed risks that
              existing safeguards could not adequately mitigate. The Responsible
              Scaling Policy triggered a restricted deployment.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Three Pillars */}
      <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <PillarCard
            key={pillar.number}
            pillar={pillar}
            index={i}
            inView={inView}
          />
        ))}
      </div>

      {/* Project Glasswing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10"
      >
        <Card>
          <CardHeader>
            <CardTitle>Project Glasswing</CardTitle>
            <CardDescription>
              Anthropic's plan to channel these capabilities for defense
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                A defensive cybersecurity program with a small number of vetted
                partners, including government agencies and critical
                infrastructure operators
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Goal: secure critical systems by finding and patching
                vulnerabilities before similar capabilities become broadly
                available through open-source or competing models
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                New safeguards developed through Project Glasswing are planned
                for integration into an upcoming Claude Opus model for wider
                release
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Closing Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10"
      >
        <blockquote className="mx-auto max-w-3xl border-l-2 border-primary/40 py-2 pl-6 text-base italic leading-relaxed text-foreground/80 sm:text-lg">
          &ldquo;We find it alarming that the world looks on track to proceed
          rapidly to developing superhuman systems without stronger mechanisms in
          place for ensuring adequate safety across the industry as a
          whole.&rdquo;
        </blockquote>
        <p className="mx-auto mt-2 max-w-3xl pl-6 text-xs text-muted-foreground">
          — Anthropic, Claude Mythos Preview System Card
        </p>
      </motion.div>

      {/* Footer */}
      <Separator className="mx-auto mt-14 max-w-3xl" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-2 text-center text-xs text-muted-foreground"
      >
        <p>April 7, 2026</p>
        <div className="flex gap-4">
          <a
            href="https://www.anthropic.com/research/claude-mythos-preview-system-card"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Full System Card
          </a>
          <a
            href="https://www.anthropic.com/research/claude-mythos-preview-red-team"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Red Team Blog Post
          </a>
        </div>
      </motion.div>
    </section>
  );
}
