import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import safetyMetrics from "@/data/safety_metrics.json";

/* ---------- RSP Threat Cards ---------- */

function riskColor(risk: string, applicable: boolean) {
  if (!applicable) return "bg-muted text-muted-foreground";
  if (risk.includes("PRIMARY"))
    return "bg-red-500/20 text-red-400 ring-1 ring-red-500/40";
  if (risk.includes("Very low"))
    return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
  return "bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/30";
}

function applicableBadge(applicable: boolean) {
  if (applicable)
    return (
      <span className="inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
        Applicable
      </span>
    );
  return (
    <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      Not applicable
    </span>
  );
}

function ThreatCard({
  threat,
  applicable,
  risk,
  index,
  inView,
}: {
  threat: string;
  applicable: boolean;
  risk: string;
  index: number;
  inView: boolean;
}) {
  const isPrimary = risk.includes("PRIMARY");
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Card
        className={
          isPrimary
            ? "border-red-500/40 bg-red-500/5 ring-1 ring-red-500/20"
            : ""
        }
      >
        <CardHeader>
          <CardTitle className="text-sm">{threat}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {applicableBadge(applicable)}
          <span
            className={`inline-block self-start rounded-md px-2 py-1 text-xs font-medium ${riskColor(risk, applicable)}`}
          >
            {isPrimary ? "PRIMARY CONCERN" : risk}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ---------- Safeguards Table ---------- */

interface SafeguardRow {
  metric: string;
  mythos: number | null;
  sonnet46: number | null;
  opus46: number | null;
  higher_is_better: boolean;
}

function cellColor(
  value: number | null,
  row: SafeguardRow,
  allValues: (number | null)[]
) {
  if (value === null) return "text-muted-foreground";
  const nums = allValues.filter((v): v is number => v !== null);
  if (nums.length < 2) return "text-foreground";

  const best = row.higher_is_better ? Math.max(...nums) : Math.min(...nums);
  const worst = row.higher_is_better ? Math.min(...nums) : Math.max(...nums);

  if (value === best) return "text-emerald-400 font-semibold";
  if (value === worst) return "text-red-400";
  return "text-foreground";
}

function formatVal(v: number | null) {
  if (v === null) return "N/A";
  return v % 1 === 0 ? `${v}%` : `${v.toFixed(2)}%`;
}

function SafeguardsTable() {
  const rows = safetyMetrics.safeguards as SafeguardRow[];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Safeguards Comparison</CardTitle>
        <CardDescription>
          Key safety metrics across current-generation Claude models
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Metric</TableHead>
              <TableHead className="text-right">Mythos Preview</TableHead>
              <TableHead className="text-right">Sonnet 4.6</TableHead>
              <TableHead className="text-right">Opus 4.6</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const vals = [row.mythos, row.sonnet46, row.opus46];
              const isHighlight =
                row.metric === "Prompt Injection (w/ safeguards)" &&
                row.mythos === 0;
              return (
                <TableRow
                  key={row.metric}
                  className={
                    isHighlight ? "bg-emerald-500/5" : ""
                  }
                >
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell
                    className={`text-right ${cellColor(row.mythos, row, vals)}`}
                  >
                    {formatVal(row.mythos)}
                    {isHighlight && (
                      <span className="ml-1.5 inline-block rounded bg-emerald-500/20 px-1 py-0.5 text-[10px] font-bold text-emerald-400">
                        PERFECT
                      </span>
                    )}
                  </TableCell>
                  <TableCell
                    className={`text-right ${cellColor(row.sonnet46, row, vals)}`}
                  >
                    {formatVal(row.sonnet46)}
                  </TableCell>
                  <TableCell
                    className={`text-right ${cellColor(row.opus46, row, vals)}`}
                  >
                    {formatVal(row.opus46)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/* ---------- Alignment Highlights ---------- */

const alignmentCards = [
  {
    value: ">50%",
    label: "Misuse Rate Reduction",
    detail:
      "Compared to Opus 4.6, Mythos showed a greater-than-50% drop in misuse rate on agentic tasks",
  },
  {
    value: "0.3%",
    label: "Destructive Actions",
    detail:
      "Only 0.3% of actions in agentic environments were destructive — the lowest recorded for any Claude model",
  },
  {
    value: "Best-Aligned",
    label: "Across Essentially Every Dimension",
    detail:
      "Internal alignment evaluations ranked Mythos as the most-aligned model Anthropic has ever produced",
  },
  {
    value: "8 / 15",
    label: "Constitutional Adherence Wins",
    detail:
      "Mythos outperformed all other Claude models on 8 of 15 evaluated dimensions of constitutional adherence",
  },
];

function AlignmentHighlights({ inView }: { inView: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {alignmentCards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
        >
          <Card className="h-full">
            <CardContent className="flex flex-col gap-1 pt-2">
              <span className="text-2xl font-bold tracking-tight text-primary">
                {card.value}
              </span>
              <span className="text-sm font-medium text-foreground">
                {card.label}
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {card.detail}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Main Section ---------- */

export function SafetyDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="safety" className="mx-auto max-w-6xl px-4 py-10 sm:py-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Section 5
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The Safety Calculus
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Mythos Preview is simultaneously Anthropic's most capable and most
          aligned model — but alignment alone doesn't determine whether a model
          is safe to release. The Responsible Scaling Policy evaluates specific
          threat vectors, and cybersecurity triggered the restriction.
        </p>
      </motion.div>

      {/* RSP Threat Assessment */}
      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          RSP Threat Assessment
        </h3>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {safetyMetrics.rsp.map((item, i) => (
            <ThreatCard
              key={item.threat}
              threat={item.threat}
              applicable={item.applicable}
              risk={item.risk}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>

      {/* Safeguards Table */}
      <div className="mt-12">
        <SafeguardsTable />
      </div>

      {/* Alignment Highlights */}
      <div className="mt-12">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Alignment Highlights
        </h3>
        <AlignmentHighlights inView={inView} />
      </div>
    </section>
  );
}
