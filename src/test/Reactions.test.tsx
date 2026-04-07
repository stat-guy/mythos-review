import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReactionsSection } from "@/components/ReactionsSection";
import tweets from "@/data/tweets.json";

describe("ReactionsSection", () => {
  it("renders the section heading", () => {
    render(<ReactionsSection />);
    expect(screen.getByText("Reactions")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<ReactionsSection />);
    expect(
      screen.getByText("What people are saying about Claude Mythos Preview")
    ).toBeInTheDocument();
  });

  it("has a section with id='reactions'", () => {
    const { container } = render(<ReactionsSection />);
    const section = container.querySelector("#reactions");
    expect(section).toBeInTheDocument();
  });

  it("renders the correct number of tweet embeds", () => {
    const { container } = render(<ReactionsSection />);
    const embedDivs = container.querySelectorAll(".tweet-embed");
    expect(embedDivs.length).toBe(10);
  });

  it("tweets.json has 10 entries with valid URLs", () => {
    expect(tweets).toHaveLength(10);
    for (const tweet of tweets) {
      expect(tweet.url).toMatch(/^https:\/\/x\.com\//);
      expect(tweet.id).toBeGreaterThan(0);
    }
  });

  it("tweets.json includes expected authors", () => {
    const authors = tweets.map((t) => t.author);
    expect(authors).toContain("Alex Albert");
    expect(authors).toContain("Kevin Roose");
    expect(authors).toContain("Felix Rieseberg");
    expect(authors).toContain("Alex Finn");
  });

  it("tweets.json has no more than 3 Anthropic employees (not counting official account)", () => {
    const anthropicPeople = tweets.filter(
      (t) =>
        (t.affiliation === "Anthropic" || t.affiliation === "Anthropic Engineer") &&
        t.author !== "Anthropic"
    );
    expect(anthropicPeople.length).toBeLessThanOrEqual(3);
  });
});
