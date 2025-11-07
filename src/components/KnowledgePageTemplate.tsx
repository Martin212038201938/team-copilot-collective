import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor } from "@/data/authors";
import { Linkedin, Mail } from "lucide-react";
import { ReactNode } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface KnowledgePageTemplateProps {
  // SEO & Metadata
  title: string;
  description: string;
  canonicalUrl: string;
  keywords: string[];
  ogImage?: string;

  // Author & Dates
  authorId: string;
  publishedDate: string;
  modifiedDate: string;

  // Quick Answer
  quickAnswer: {
    title?: string;
    content: string;
    highlights?: Array<{
      label: string;
      description: string;
      value: string;
    }>;
  };

  // Content
  children: ReactNode;

  // FAQ
  faqItems?: FAQItem[];

  // Table of Contents
  tableOfContents: Array<{
    id: string;
    title: string;
    level: number;
  }>;

  // Layout
  breadcrumbs: Array<{
    label: string;
    href: string;
  }>;
  readTime?: string;

  // Optional schema override
  customSchema?: Record<string, any>;
}

const KnowledgePageTemplate = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogImage,
  authorId,
  publishedDate,
  modifiedDate,
  quickAnswer,
  children,
  faqItems = [],
  tableOfContents,
  breadcrumbs,
  readTime,
  customSchema
}: KnowledgePageTemplateProps) => {
  const author = getAuthor(authorId);

  if (!author) {
    throw new Error(`Author with id "${authorId}" not found`);
  }

  // Build Schema.org Article
  const articleSchema = customSchema || {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.role,
      "expertise": author.expertise.join(", "),
      "description": author.bio,
      ...(author.image && { "image": author.image }),
      ...(author.linkedin && { "sameAs": [author.linkedin] })
    },
    "publisher": {
      "@type": "Organization",
      "name": "copilotenschule.de",
      "logo": {
        "@type": "ImageObject",
        "url": "https://copilotenschule.de/logo.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  // Build FAQ Schema if FAQ items exist
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const schemas = faqSchema ? [articleSchema, faqSchema] : articleSchema;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        schema={schemas}
        author={author}
        publishedTime={publishedDate}
        modifiedTime={modifiedDate}
      />

      <ContentLayout
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
        lastUpdated={formatDate(modifiedDate)}
        readTime={readTime}
        tableOfContents={tableOfContents}
      >
        {/* Quick Answer Section für AIO-Optimierung */}
        <section id="quick-answer" className="mb-8">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-2xl">⚡</span>
                {quickAnswer.title || "Schnellantwort"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-base leading-relaxed">
                {quickAnswer.content}
              </p>
              {quickAnswer.highlights && quickAnswer.highlights.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {quickAnswer.highlights.map((highlight, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-gray-900 rounded-lg border">
                      <div className="font-bold text-primary mb-1">{highlight.label}</div>
                      <div className="text-sm text-muted-foreground">{highlight.description}</div>
                      <div className="text-lg font-semibold mt-2">{highlight.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        {children}

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <section id="faq" className="mt-12 mb-12">
            <h2>Häufig gestellte Fragen (FAQ)</h2>
            <div className="space-y-4 my-6">
              {faqItems.map((faq, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio für E-E-A-T */}
        <section className="my-12">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  {author.image && (
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Über den Autor</h3>
                  <div className="text-lg font-semibold text-primary mb-1">{author.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{author.role}</div>
                  <p className="text-sm leading-relaxed mb-4">{author.bio}</p>
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {author.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {author.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                    {author.email && (
                      <a
                        href={`mailto:${author.email}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        Kontakt
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </ContentLayout>
    </>
  );
};

export default KnowledgePageTemplate;
