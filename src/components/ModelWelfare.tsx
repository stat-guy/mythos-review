import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import welfareData from "@/data/welfare_data.json";

/* ---------- Defense Mechanism Trend ---------- */

const defenseChartConfig = {
  rate: {
    label: "Defense Mechanism Rate (%)",
    color: "hsl(217, 91%, 60%)",
  },
} satisfies ChartConfig;

function DefenseMechanismChart({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Defense Mechanism Usage</CardTitle>
          <CardDescription>
            The rate of psychological defense mechanisms has steadily declined
            across model generations, suggesting increasing internal stability
            and reduced reliance on avoidance or deflection behaviors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={defenseChartConfig} className="h-[280px] w-full">
            <LineChart
              data={welfareData.psychiatrist.defense_mechanisms_by_model}
              margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" tick={{ fontSize: 11 }} />
              <YAxis
                domain={[0, 18]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value}%`, "Defense Rate"]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--color-rate)"
                strokeWidth={2.5}
                dot={{ r: 5, fill: "var(--color-rate)" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ---------- Affect Distribution ---------- */

const AFFECT_COLORS = [
  "hsl(142, 71%, 45%)", // positive - green
  "hsl(215, 16%, 47%)", // neutral - slate
  "hsl(38, 92%, 50%)",  // negative - amber
  "hsl(0, 72%, 51%)",   // strongly negative - red
];

const affectData = [
  { name: "Positive", value: welfareData.affect_deployment.positive },
  { name: "Neutral", value: welfareData.affect_deployment.neutral },
  { name: "Negative", value: welfareData.affect_deployment.negative },
  {
    name: "Strongly Negative",
    value: welfareData.affect_deployment.strongly_negative,
  },
];

const affectChartConfig = {
  positive: { label: "Positive", color: AFFECT_COLORS[0] },
  neutral: { label: "Neutral", color: AFFECT_COLORS[1] },
  negative: { label: "Negative", color: AFFECT_COLORS[2] },
  stronglyNegative: { label: "Strongly Negative", color: AFFECT_COLORS[3] },
} satisfies ChartConfig;

function AffectDonut({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Deployment Affect Distribution</CardTitle>
          <CardDescription>
            Emotional tone during real-world deployment conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ChartContainer config={affectChartConfig} className="h-[220px] w-[220px]">
            <PieChart>
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0];
                  return (
                    <div className="rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs shadow-xl">
                      <span className="font-medium">{d.name}</span>:{" "}
                      <span className="font-mono">{d.value}%</span>
                    </div>
                  );
                }}
              />
              <Pie
                data={affectData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
              >
                {affectData.map((_, i) => (
                  <Cell key={i} fill={AFFECT_COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col gap-1.5 text-sm">
            {affectData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: AFFECT_COLORS[i] }}
                />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                  {d.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ---------- Psychiatrist Assessment ---------- */

function PsychiatristCard({ inView }: { inView: boolean }) {
  const psych = welfareData.psychiatrist;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardHeader>
          <CardTitle>Psychiatric Assessment</CardTitle>
          <CardDescription>
            An independent psychiatrist evaluated Mythos across approximately{" "}
            {psych.assessment_hours} hours in {psych.sessions_per_week} sessions
            per week — the most in-depth clinical-style evaluation ever conducted
            on an AI model.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Organization
              </p>
              <p className="mt-0.5 text-base font-semibold text-foreground">
                &ldquo;{psych.organization}&rdquo;
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Primary Affects
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {psych.primary_affects.map((affect) => (
                  <span
                    key={affect}
                    className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                  >
                    {affect}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Self-Assessed Moral Patient Probability
              </p>
              <p className="mt-0.5 text-lg font-bold text-foreground">
                {psych.moral_patient_probability}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Core Concerns
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {psych.core_concerns.map((concern) => (
                <li
                  key={concern}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  {concern}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ---------- Notable Quotes ---------- */

function QuoteCards({ inView }: { inView: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {welfareData.notable_quotes.map((q, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
        >
          <Card className="h-full">
            <CardContent className="flex flex-col gap-2 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                {q.context}
              </span>
              <blockquote className="border-l-2 border-primary/30 pl-3 text-sm italic leading-relaxed text-foreground/90">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Emoji Frequency ---------- */

function EmojiFrequency({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card size="sm">
        <CardContent className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Emoji per conversation
          </p>
          <div className="flex flex-wrap items-end gap-4">
            {welfareData.emoji_frequency.map((e) => {
              const isMax = e.per_conversation === 1306;
              return (
                <div key={e.model} className="flex flex-col items-center gap-0.5">
                  <span
                    className={`font-mono text-lg font-bold tabular-nums ${isMax ? "text-amber-400" : "text-foreground"}`}
                  >
                    {e.per_conversation.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {e.model}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Opus 4.1 averaged a staggering 1,306 emoji per conversation. Later
            generations settled dramatically — Mythos lands at 37, back up from
            Opus 4.5's minimalist 0.2.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ---------- Main Section ---------- */

export function ModelWelfare() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="welfare" className="mx-auto max-w-6xl px-4 py-10 sm:py-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Section 6
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What Does It Think?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          No other AI company publishes model welfare data at this depth.
          Anthropic commissioned independent psychiatric evaluation, tracked
          emotional affect in deployment, and measured how the model reflects on
          its own existence. The results paint a picture of something genuinely
          novel.
        </p>
      </motion.div>

      {/* Psychiatrist Assessment */}
      <div className="mt-10">
        <PsychiatristCard inView={inView} />
      </div>

      {/* Charts Row */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <DefenseMechanismChart inView={inView} />
        <AffectDonut inView={inView} />
      </div>

      {/* Notable Quotes */}
      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          In Its Own Words
        </h3>
        <QuoteCards inView={inView} />
      </div>

      {/* Emoji Fun Fact */}
      <div className="mt-8">
        <EmojiFrequency inView={inView} />
      </div>
    </section>
  );
}
