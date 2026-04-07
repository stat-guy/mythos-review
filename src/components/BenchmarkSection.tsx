import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import benchmarks from "@/data/benchmarks.json";

interface Benchmark {
  name: string;
  category: string;
  mythos: number;
  opus46: number;
  gpt54: number | null;
  gemini31: number | null;
}

const data = benchmarks as Benchmark[];

const CATEGORIES = [
  "All",
  "Coding",
  "Math",
  "Reasoning",
  "Science",
  "Agentic",
] as const;

const chartConfig = {
  mythos: {
    label: "Mythos Preview",
    color: "var(--chart-1)",
  },
  opus46: {
    label: "Opus 4.6",
    color: "var(--chart-2)",
  },
  gpt54: {
    label: "GPT-5.4",
    color: "var(--chart-3)",
  },
  gemini31: {
    label: "Gemini 3.1",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const MODEL_KEYS = ["mythos", "opus46", "gpt54", "gemini31"] as const;

const CALLOUTS = [
  {
    name: "USAMO 2026",
    from: 42.3,
    to: 97.6,
    relative: "+130%",
    description:
      "USA Math Olympiad problems -- tests advanced mathematical reasoning and proof construction at the competition level.",
  },
  {
    name: "SWE-bench Multimodal",
    from: 27.1,
    to: 59.0,
    relative: "+118%",
    description:
      "Real-world GitHub issues requiring both visual understanding and code changes across full repositories.",
  },
  {
    name: "GraphWalks BFS",
    from: 38.7,
    to: 80.0,
    relative: "+107%",
    description:
      "Breadth-first search over massive token-length graphs -- tests long-context structured reasoning up to 1M tokens.",
  },
];

function CustomBarLabel(props: Record<string, unknown>) {
  const { x, y, width, height, value } = props as {
    x: number;
    y: number;
    width: number;
    height: number;
    value: number | null;
  };
  if (value == null || width < 28) return null;
  return (
    <text
      x={x + width - 4}
      y={y + height / 2}
      textAnchor="end"
      dominantBaseline="central"
      className="fill-foreground text-[10px] font-medium"
    >
      {value}
    </text>
  );
}

export default function BenchmarkSection() {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return data;
    return data.filter((b) => b.category === category);
  }, [category]);

  const chartHeight = Math.max(300, filtered.length * 80 + 80);

  return (
    <section id="benchmarks" className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:py-16">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">
          The Capability Leap
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Mythos Preview shows striking improvements across coding, math,
          reasoning, science, and agentic tasks. The chart below compares scores
          against leading frontier models on established benchmarks -- revealing
          where the biggest jumps occurred and what they mean for real-world
          capability.
        </p>
      </div>

      {/* Category filter tabs + chart */}
      <Tabs defaultValue="All" onValueChange={(v: string) => setCategory(v)}>
        <TabsList className="flex-wrap">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat} value={cat} className="overflow-x-auto">
            <ChartContainer
              config={chartConfig}
              className="mt-4 aspect-auto w-full min-w-[480px]"
              style={{ height: chartHeight }}
            >
              <BarChart
                data={filtered}
                layout="vertical"
                margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
                barCategoryGap="18%"
                barGap={2}
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend
                  verticalAlign="top"
                  content={<ChartLegendContent />}
                />
                {MODEL_KEYS.map((key) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={`var(--color-${key})`}
                    radius={[0, 4, 4, 0]}
                    maxBarSize={16}
                  >
                    {filtered.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fillOpacity={
                          entry[key as keyof Benchmark] == null ? 0 : 1
                        }
                        strokeOpacity={
                          entry[key as keyof Benchmark] == null ? 0 : 1
                        }
                      />
                    ))}
                    <LabelList
                      dataKey={key}
                      content={<CustomBarLabel />}
                    />
                  </Bar>
                ))}
              </BarChart>
            </ChartContainer>
          </TabsContent>
        ))}
      </Tabs>

      {/* Standout callouts */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Standout Improvements</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALLOUTS.map((item) => (
            <Card key={item.name}>
              <CardHeader>
                <CardTitle className="text-sm">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-muted-foreground line-through">
                    {item.from}%
                  </span>
                  <span className="text-xl font-bold">{item.to}%</span>
                  <span className="rounded-md bg-chart-1/15 px-1.5 py-0.5 text-xs font-semibold text-chart-1">
                    {item.relative}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
