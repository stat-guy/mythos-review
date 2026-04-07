import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";

describe("Navbar", () => {
  it("renders the brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("Mythos Preview")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    const labels = [
      "The Model",
      "Capabilities",
      "Cyber",
      "Exploits",
      "Safety",
      "Welfare",
      "The Decision",
    ];
    for (const label of labels) {
      const matches = screen.getAllByText(label);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });
});
