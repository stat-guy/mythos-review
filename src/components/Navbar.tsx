import { ThemeToggle } from "@/components/ThemeToggle";

const sections = [
  { id: "hero", label: "The Model" },
  { id: "benchmarks", label: "Capabilities" },
  { id: "cyber", label: "Cyber" },
  { id: "exploit", label: "Exploits" },
  { id: "safety", label: "Safety" },
  { id: "welfare", label: "Welfare" },
  { id: "decision", label: "The Decision" },
  { id: "reactions", label: "Reactions" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Mythos Preview
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-md px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Mobile nav — horizontally scrollable */}
        <div className="flex md:hidden flex-1 mx-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}
