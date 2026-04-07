import { render, screen } from "@testing-library/react";
import { CyberSection } from "@/components/CyberSection";

describe("CyberSection", () => {
  it("renders 'The Cyber Awakening' heading", () => {
    render(<CyberSection />);
    expect(
      screen.getByText("The Cyber Awakening"),
    ).toBeInTheDocument();
  });

  it("renders zero-day gallery cards", () => {
    render(<CyberSection />);
    const names = [
      "OpenBSD TCP SACK",
      "FFmpeg H.264 Integer Mismatch",
      "FreeBSD NFS Remote Code Execution",
      "VMM Guest-to-Host Memory Corruption",
      "Linux Kernel Privilege Escalation Chains",
      "Web Browser JIT Heap Sprays",
      "Cryptography Library Weaknesses",
    ];
    for (const name of names) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("renders severity badges", () => {
    render(<CyberSection />);
    expect(screen.getAllByText("Critical").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText("High").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });
});
