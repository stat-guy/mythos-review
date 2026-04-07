import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";

describe("Hero", () => {
  it("renders the title 'Claude Mythos Preview'", () => {
    render(<Hero />);
    expect(
      screen.getByText("Claude Mythos Preview"),
    ).toBeInTheDocument();
  });

  it("renders the subtitle about first model withheld", () => {
    render(<Hero />);
    expect(
      screen.getByText("The first Anthropic model withheld from public release"),
    ).toBeInTheDocument();
  });

  it("renders all 6 stat labels", () => {
    render(<Hero />);
    const labels = [
      "SWE-bench Verified",
      "USAMO 2026",
      "Firefox Exploits",
      "Zero-Day Targets",
      "Oldest Bug Found",
      "Misuse Rate Drop",
    ];
    for (const label of labels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders the date 'April 7, 2026'", () => {
    render(<Hero />);
    expect(screen.getByText("April 7, 2026")).toBeInTheDocument();
  });
});
