import { Helmet } from "react-helmet-async";
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
  // Extract author name if it's an Author object
  const authorName = typeof author === 'string' ? author : author.name;
  const authorUrl = typeof author === 'string' ? undefined : author.linkedin;

  // Structured Data (Schema.org) - immer mit globalem Organization/Person Schema
  const combinedSchema = combineWithGlobalSchema(schema);

  return (
    <Helmet>
      <title>{`${title} | copilotenschule.de`}</title>

      {/* Basic meta tags */}
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      {authorName && <meta name="author" content={authorName} />}

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="copilotenschule.de" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {authorName && <meta property="article:author" content={authorUrl || authorName} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Structured Data (Schema.org) - für LLM-Zitierbarkeit und SEO */}
      <script type="application/ld+json">
        {JSON.stringify(combinedSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
