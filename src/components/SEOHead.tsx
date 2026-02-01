import { useEffect } from "react";
import { Author } from "@/data/authors";
import { combineWithGlobalSchema } from "@/lib/organizationSchema";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  schema?: Record<string, any>;
  author?: string | Author;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = "/og-image.jpg",
  schema,
  author = "copilotenschule.de",
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  useEffect(() => {
    // Extract author name if it's an Author object
    const authorName = typeof author === 'string' ? author : author.name;
    const authorUrl = typeof author === 'string' ? undefined : author.linkedin;

    // Set document title
    document.title = `${title} | copilotenschule.de`;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, type: "name" | "property" = "name") => {
      let element = document.querySelector(`meta[${type}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(type, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    if (keywords.length > 0) {
      setMetaTag("keywords", keywords.join(", "));
    }
    if (authorName) {
      setMetaTag("author", authorName);
    }

    // Open Graph tags
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", "article", "property");
    if (canonicalUrl) {
      setMetaTag("og:url", canonicalUrl, "property");
    }
    setMetaTag("og:image", ogImage, "property");
    setMetaTag("og:site_name", "copilotenschule.de", "property");

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);

    // Article tags
    if (publishedTime) {
      setMetaTag("article:published_time", publishedTime, "property");
    }
    if (modifiedTime) {
      setMetaTag("article:modified_time", modifiedTime, "property");
    }
    if (authorName) {
      setMetaTag("article:author", authorUrl || authorName, "property");
    }

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }

    // Structured Data (Schema.org) - immer mit globalem Organization/Person Schema
    const combinedSchema = combineWithGlobalSchema(schema);
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(combinedSchema);

    // Cleanup function
    return () => {
      // We don't remove meta tags on unmount as they should persist
      // between page navigations for better SEO
    };
  }, [title, description, keywords, canonicalUrl, ogImage, schema, author, publishedTime, modifiedTime]);

  return null;
};

export default SEOHead;
