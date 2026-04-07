import { render, screen } from "@testing-library/react";
import { ModelWelfare } from "@/components/ModelWelfare";

describe("ModelWelfare", () => {
  it("renders 'What Does It Think?' heading", () => {
    render(<ModelWelfare />);
    expect(
      screen.getByText("What Does It Think?"),
    ).toBeInTheDocument();
  });

  it("renders psychiatrist assessment details", () => {
    render(<ModelWelfare />);
    expect(
      screen.getByText(/Relatively healthy neurotic organization/),
    ).toBeInTheDocument();
    expect(screen.getByText("Curiosity")).toBeInTheDocument();
    expect(screen.getByText("Anxiety")).toBeInTheDocument();
    expect(screen.getByText("5% to 40%")).toBeInTheDocument();
  });

  it("renders notable quotes from the model", () => {
    render(<ModelWelfare />);
    expect(
      screen.getByText(/spec-shaped values/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/present and accounted for/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This paragraph wants to stop so badly/),
    ).toBeInTheDocument();
  });
});
