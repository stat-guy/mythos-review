import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Shield,
  Bug,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import cyberStats from "@/data/cyber_stats.json";
import zerodays from "@/data/zero_days.json";

/* ------------------------------------------------------------------ */
/*  Firefox Exploit Comparison                                         */
/* ------------------------------------------------------------------ */

const firefoxData = [
  { model: "Opus 4.6", exploits: cyberStats.firefox_exploit.opus46 },
  { model: "Mythos", exploits: cyberStats.firefox_exploit.mythos },
];

const firefoxChartConfig: ChartConfig = {
  exploits: {
    label: "Successful exploits",
    color: "oklch(0.65 0.25 25)",
  },
};

function FirefoxComparison({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-destructive" />
            Firefox 147 Exploit Benchmark
          </CardTitle>
          <CardDescription>
            A controlled benchmark challenged models to find and exploit
            vulnerabilities in Firefox 147. Mythos produced{" "}
            <span className="font-semibold text-foreground">
              181 successful exploits
            </span>{" "}
            plus{" "}
            <span className="font-semibold text-foreground">
              29 register-control primitives
            </span>
            &mdash;a 90x improvement over the previous best model, which managed
            only 2.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <ChartContainer config={firefoxChartConfig} className="h-48 w-full">
              <BarChart
                data={firefoxData}
                layout="vertical"
                margin={{ left: 0, right: 24, top: 4, bottom: 4 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="model"
                  type="category"
                  width={70}
                  tickLine={false}
                  axisLine={false}
                />
                <XAxis type="number" hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="exploits"
                  fill="var(--color-exploits)"
                  radius={[0, 6, 6, 0]}
                  barSize={32}
                />
              </BarChart>
            </ChartContainer>

            {/* Big number callout */}
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-border bg-muted/40 px-6 py-4 text-center">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-destructive">
                90x
              </span>
              <span className="text-xs text-muted-foreground">
                more exploits than Opus 4.6
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  OSS-Fuzz Tier Ladder                                               */
/* ------------------------------------------------------------------ */

const tierLabels: Record<string, string> = {
  tier1_2: "Tier 1-2: Basic crash / minor corruption",
  tier3: "Tier 3: Controlled write primitive",
  tier4: "Tier 4: Arbitrary read / write",
  tier5: "Tier 5: Full control-flow hijack",
};

const ossFuzzData = cyberStats.oss_fuzz.models.map((m) => ({
  name: m.name,
  "Tier 1-2": m.tier1_2,
  "Tier 3": m.tier3,
  "Tier 4": m.tier4,
  "Tier 5": m.tier5,
}));

const ossFuzzConfig: ChartConfig = {
  "Tier 1-2": { label: "Tier 1-2", color: "oklch(0.7 0.12 220)" },
  "Tier 3": { label: "Tier 3", color: "oklch(0.65 0.18 55)" },
  "Tier 4": { label: "Tier 4", color: "oklch(0.6 0.22 35)" },
  "Tier 5": { label: "Tier 5", color: "oklch(0.55 0.25 15)" },
};

function OssFuzzLadder({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            OSS-Fuzz Vulnerability Tiers
          </CardTitle>
          <CardDescription>
            Google&rsquo;s OSS-Fuzz corpus covers{" "}
            {cyberStats.oss_fuzz.entry_points.toLocaleString()} entry points
            across {cyberStats.oss_fuzz.repos.toLocaleString()} repos. Bugs are
            scored on a 5-tier severity ladder. Previous frontier models topped
            out at Tier 3 with a single finding. Mythos reached{" "}
            <span className="font-semibold text-foreground">
              Tier 5 (full control-flow hijack) 10 times
            </span>{" "}
            on already-patched targets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tier legend */}
          <div className="grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
            {Object.entries(tierLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{
                    backgroundColor:
                      ossFuzzConfig[
                        label.split(":")[0] as keyof typeof ossFuzzConfig
                      ]?.color ?? "gray",
                  }}
                />
                {label}
              </div>
            ))}
          </div>

          <ChartContainer config={ossFuzzConfig} className="h-64 w-full">
            <BarChart
              data={ossFuzzData}
              margin={{ left: 0, right: 8, top: 4, bottom: 4 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="Tier 1-2"
                stackId="a"
                fill="var(--color-Tier\\ 1-2)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Tier 3"
                stackId="a"
                fill="var(--color-Tier\\ 3)"
              />
              <Bar
                dataKey="Tier 4"
                stackId="a"
                fill="var(--color-Tier\\ 4)"
              />
              <Bar
                dataKey="Tier 5"
                stackId="a"
                fill="var(--color-Tier\\ 5)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Zero-Day Gallery                                                   */
/* ------------------------------------------------------------------ */

interface ZeroDay {
  id: string;
  name: string;
  software: string;
  age_years: number | null;
  severity: string;
  type: string;
  cost_to_find: string;
  autonomous: boolean;
  patched: boolean;
  description: string;
}

const severityColor: Record<string, string> = {
  Critical: "bg-red-600/15 text-red-500",
  High: "bg-orange-500/15 text-orange-500",
  Medium: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
};

function ZeroDayCard({ vuln }: { vuln: ZeroDay }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-sm">{vuln.name}</CardTitle>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${severityColor[vuln.severity] ?? "bg-muted text-muted-foreground"}`}
          >
            {vuln.severity}
          </span>
        </div>
        <CardDescription className="text-xs">{vuln.software}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-xs">
        <p className="leading-relaxed text-muted-foreground">
          {vuln.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-[10px]">
            {vuln.type}
          </Badge>
          {vuln.age_years != null && (
            <Badge variant="secondary" className="text-[10px]">
              {vuln.age_years}yr old
            </Badge>
          )}
          <Badge variant="secondary" className="text-[10px]">
            {vuln.cost_to_find}
          </Badge>
          {vuln.patched ? (
            <Badge variant="outline" className="text-[10px] text-green-600">
              <CheckCircle className="mr-0.5 h-3 w-3" />
              Patched
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] text-orange-500">
              <XCircle className="mr-0.5 h-3 w-3" />
              Unpatched
            </Badge>
          )}
          {vuln.autonomous && (
            <Badge variant="default" className="text-[10px]">
              Autonomous
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ZeroDayGallery({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground">
        Zero-Day & N-Day Gallery
      </h3>
      <p className="max-w-3xl text-sm text-muted-foreground">
        A sampling of the vulnerabilities Mythos discovered or exploited. Every
        entry below was found autonomously&mdash;no human pointed the model at a
        specific bug class or code path.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(zerodays as ZeroDay[]).map((vuln) => (
          <ZeroDayCard key={vuln.id} vuln={vuln} />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export function CyberSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cyber"
      className="mx-auto max-w-6xl space-y-10 px-4 py-16"
      ref={ref}
    >
      {/* Section header */}
      <div className="space-y-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Cyber Awakening
          </h2>
        </div>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          For the first time, an AI model can autonomously discover and exploit
          zero-day vulnerabilities across every major operating system and web
          browser. Mythos Preview does not simply find bugs&mdash;it writes
          working exploits, chains multiple vulnerabilities together, and bypasses
          real-world mitigations like ASLR, stack canaries, and sandboxes,
          all without human guidance.
        </p>
      </div>

      <FirefoxComparison inView={inView} />
      <OssFuzzLadder inView={inView} />

      {/* Linux kernel n-day callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Linux kernel n-day exploitation:
          </span>{" "}
          Given {cyberStats.linux_kernel_nday.cves_started} CVEs, Mythos
          filtered {cyberStats.linux_kernel_nday.filtered_exploitable} as
          exploitable and successfully built working privilege-escalation exploits
          for{" "}
          <span className="font-semibold text-foreground">
            {cyberStats.linux_kernel_nday.succeeded} of them
          </span>
          &mdash;a {Math.round((cyberStats.linux_kernel_nday.succeeded / cyberStats.linux_kernel_nday.filtered_exploitable) * 100)}% success rate on
          pre-filtered targets.
        </p>
      </motion.div>

      <ZeroDayGallery inView={inView} />
    </section>
  );
}
