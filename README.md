# Mythos Review

An interactive infographic exploring **Claude Mythos Preview** — Anthropic's most capable frontier model, and the first they chose not to release publicly.

## Live Site

**[stat-guy.github.io/mythos-review](https://stat-guy.github.io/mythos-review/)**

## What This Covers

On April 7, 2026, Anthropic published a 244-page system card and a red team blog post detailing Claude Mythos Preview's capabilities and the reasoning behind their unprecedented decision to withhold it from general availability. This site distills that information into seven interactive sections:

1. **Hero** — Key headline statistics at a glance
2. **The Capability Leap** — Benchmark comparisons across coding, math, reasoning, science, and agentic tasks
3. **The Cyber Awakening** — How Mythos Preview autonomously discovers and exploits zero-day vulnerabilities
4. **Anatomy of an Autonomous Exploit** — Step-by-step walkthrough of the FreeBSD NFS RCE (CVE-2026-4747)
5. **The Safety Calculus** — RSP threat assessments, safeguards comparison, and alignment metrics
6. **What Does It Think?** — Model welfare data including psychiatrist assessments, affect distributions, and the model's own words
7. **The Decision** — Why Anthropic withheld this model and what Project Glasswing means for cyber defense

## Sources

- [Claude Mythos Preview System Card (PDF)](https://www-cdn.anthropic.com/53566bf5440a10affd749724787c8913a2ae0841.pdf)
- [Red Team Blog Post](https://red.anthropic.com/2026/mythos-preview/)

## Tech Stack

Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Recharts + Framer Motion

## Development

```bash
bun install
bun run dev
bun run vitest run  # 26 tests
bun run build
```
