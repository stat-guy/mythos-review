import { render, screen } from "@testing-library/react";
import BenchmarkSection from "@/components/BenchmarkSection";

describe("BenchmarkSection", () => {
  it("renders 'The Capability Leap' heading", () => {
    render(<BenchmarkSection />);
    expect(
      screen.getByText("The Capability Leap"),
    ).toBeInTheDocument();
  });

  it("renders filter tabs (All, Coding, Math, etc.)", () => {
    render(<BenchmarkSection />);
    const tabs = ["All", "Coding", "Math", "Reasoning", "Science", "Agentic"];
    for (const tab of tabs) {
      expect(screen.getByRole("tab", { name: tab })).toBeInTheDocument();
    }
  });

  it("renders the 3 standout callout cards", () => {
    render(<BenchmarkSection />);
    expect(screen.getByText("USAMO 2026")).toBeInTheDocument();
    expect(screen.getByText("SWE-bench Multimodal")).toBeInTheDocument();
    expect(screen.getByText("GraphWalks BFS")).toBeInTheDocument();
  });
});
