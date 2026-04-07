import { render, screen } from "@testing-library/react";
import { SafetyDashboard } from "@/components/SafetyDashboard";

describe("SafetyDashboard", () => {
  it("renders 'The Safety Calculus' heading", () => {
    render(<SafetyDashboard />);
    expect(
      screen.getByText("The Safety Calculus"),
    ).toBeInTheDocument();
  });

  it("renders all 5 RSP threat cards", () => {
    render(<SafetyDashboard />);
    const threats = [
      "Autonomy (Misalignment)",
      "Autonomy (Automated R&D)",
      "Chemical/Biological (CB-1)",
      "Chemical/Biological (CB-2)",
      "Cybersecurity",
    ];
    for (const threat of threats) {
      expect(screen.getByText(threat)).toBeInTheDocument();
    }
  });

  it("renders the safeguards table with all metrics", () => {
    render(<SafetyDashboard />);
    const metrics = [
      "Violative Harmless Rate",
      "Overrefusal Rate",
      "Child Safety (harmless)",
      "Child Safety (overrefusal)",
      "Suicide/Self-Harm Multi-Turn",
      "Malicious Code Refusal",
      "Malicious Computer Use Refusal",
      "Prompt Injection (w/ safeguards)",
    ];
    for (const metric of metrics) {
      expect(screen.getByText(metric)).toBeInTheDocument();
    }
  });
});
