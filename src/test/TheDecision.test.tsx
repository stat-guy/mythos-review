import { render, screen } from "@testing-library/react";
import { TheDecision } from "@/components/TheDecision";

describe("TheDecision", () => {
  it("renders 'The Decision' heading", () => {
    render(<TheDecision />);
    expect(screen.getByText("The Decision")).toBeInTheDocument();
  });

  it("renders the three pillar cards", () => {
    render(<TheDecision />);
    expect(screen.getByText("Dual-Use Cyber Capabilities")).toBeInTheDocument();
    expect(screen.getByText("Transitional Risk")).toBeInTheDocument();
    expect(screen.getByText("Responsible Scaling")).toBeInTheDocument();
  });

  it("renders Project Glasswing section", () => {
    render(<TheDecision />);
    expect(screen.getByText("Project Glasswing")).toBeInTheDocument();
    expect(
      screen.getByText(/defensive cybersecurity program/),
    ).toBeInTheDocument();
  });

  it("renders the closing quote", () => {
    render(<TheDecision />);
    expect(
      screen.getByText(/alarming that the world looks on track/),
    ).toBeInTheDocument();
  });
});
