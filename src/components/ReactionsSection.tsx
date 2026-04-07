import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tweet } from "react-tweet";
import tweets from "@/data/tweets.json";

function extractTweetId(url: string): string {
  const { pathname } = new URL(url);
  const parts = pathname.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function TweetEmbed({ url, index }: { url: string; index: number }) {
  const tweetId = extractTweetId(url);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="tweet-embed"
    >
      <Tweet id={tweetId} />
    </motion.div>
  );
}

export function ReactionsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reactions" ref={ref} className="px-4 py-10 sm:py-16 mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Reactions
        </h2>
        <p className="mt-2 text-muted-foreground">
          What people are saying about Claude Mythos Preview
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tweets.map((tweet, i) => (
          <TweetEmbed key={tweet.id} url={tweet.url} index={i} />
        ))}
      </div>
    </section>
  );
}
