import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor } from "@/data/authors";
import { generateBreadcrumbSchema } from "@/lib/schema";
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
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    "headline": title,
    "description": description,
    "author": {
      "@id": "https://copilotenschule.de/#martin-lang"
    },
    "publisher": {
      "@id": "https://copilotenschule.de/#organization"
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
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Build BreadcrumbList Schema from breadcrumbs prop
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(bc => ({
      name: bc.label,
      url: bc.href.startsWith('http') ? bc.href : `https://copilotenschule.de${bc.href}`
    }))
  );

  // Combined schema with @graph
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      articleSchema,
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : [])
    ]
  };

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
        <section id="quick-answer" className="mb-12">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />

            <Card className="relative border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

              <CardHeader className="relative z-10 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {quickAnswer.title || "Schnellantwort"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-8 relative z-10">
                <p className="text-lg leading-relaxed font-medium">
                  {quickAnswer.content}
                </p>
                {quickAnswer.highlights && quickAnswer.highlights.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {quickAnswer.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="group/card relative p-5 bg-card/80 backdrop-blur-sm rounded-xl border-2 border-border/50 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl" />

                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <div className="text-xs font-bold text-primary uppercase tracking-wider">
                              {highlight.label}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3 leading-relaxed">
                            {highlight.description}
                          </div>
                          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            {highlight.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        {children}

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <section id="faq" className="mt-16 mb-16">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-4 mb-4">
                <span className="w-2 h-12 bg-gradient-to-b from-primary to-accent rounded-full" />
                Häufig gestellte Fragen (FAQ)
              </h2>
              <p className="text-lg text-muted-foreground ml-6">
                Antworten auf die wichtigsten Fragen
              </p>
            </div>
            <div className="space-y-6">
              {faqItems.map((faq, idx) => (
                <Card
                  key={idx}
                  className="group border-2 border-border/50 hover:border-primary/40 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                  <CardHeader className="border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                    <CardTitle className="text-xl font-bold flex items-start gap-3 group-hover:text-primary transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                        <span className="text-primary font-bold text-sm">Q{idx + 1}</span>
                      </div>
                      <span className="flex-1 leading-tight">{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 relative">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <span className="text-accent font-bold text-sm">A</span>
                      </div>
                      <p className="flex-1 text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio für E-E-A-T */}
        <section className="my-16">
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-4">
              <span className="w-1.5 h-10 bg-gradient-to-b from-primary to-accent rounded-full" />
              Über den Autor
            </h3>
          </div>

          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />

            <Card className="relative border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />

              <CardContent className="pt-8 pb-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    {author.image && (
                      <div className="relative group/avatar">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-50 group-hover/avatar:opacity-75 transition" />
                        <img
                          src={author.image}
                          alt={author.name}
                          className="relative w-40 h-40 rounded-full object-cover border-4 border-card shadow-2xl group-hover/avatar:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        {author.name}
                      </div>
                      <div className="flex items-center gap-2 text-base text-primary font-semibold mb-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {author.role}
                      </div>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {author.bio}
                      </p>
                    </div>

                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Expertise
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {author.expertise.map((exp, idx) => (
                          <span
                            key={idx}
                            className="group/tag px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary rounded-xl text-sm font-semibold hover:from-primary/20 hover:to-accent/20 hover:scale-105 transition-all duration-200 cursor-default"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {author.linkedin && (
                        <a
                          href={author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/80 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105"
                        >
                          <Linkedin className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                          LinkedIn besuchen
                        </a>
                      )}
                      {author.email && (
                        <a
                          href={`mailto:${author.email}`}
                          className="group/link inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary/30 text-primary rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-sm font-semibold hover:scale-105"
                        >
                          <Mail className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                          Kontakt aufnehmen
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};

export default KnowledgePageTemplate;
