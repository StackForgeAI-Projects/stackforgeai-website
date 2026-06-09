import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Allow search engines and AI crawlers; block API and build artifacts only. */
const AI_CRAWLERS = [
  // OpenAI / ChatGPT
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Google (Gemini / Vertex)
  "Google-Extended",
  "GoogleOther",
  // Microsoft / Bing Copilot
  "Bingbot",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Meta AI
  "meta-externalagent",
  "FacebookBot",
  // Amazon
  "Amazonbot",
  // DuckDuckGo AI
  "DuckAssistBot",
  // You.com
  "YouBot",
  // Cohere
  "cohere-ai",
  // Common Crawl (feeds many LLM training sets and AI search engines)
  "CCBot",
  // ByteDance / Doubao
  "Bytespider",
  // Diffbot knowledge graph
  "Diffbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/_next/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
