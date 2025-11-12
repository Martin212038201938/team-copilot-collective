import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthor } from "@/data/authors";
import { Linkedin, Mail } from "lucide-react";
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useMemo } from "react";

export interface KnowledgePagePreviewProps {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
  category: string;
  readTime: string;
  publishDate: string;
  authorId?: string;
  markdownContent: string;
}

const KnowledgePagePreview = ({
  title,
  description,
  slug,
  keywords,
  category,
  readTime,
  publishDate,
  authorId = 'martin-lang',
  markdownContent
}: KnowledgePagePreviewProps) => {
  const author = getAuthor(authorId);

  if (!author) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Autor nicht gefunden: {authorId}</p>
      </div>
    );
  }

  // Parse markdown and extract sections
  const { quickAnswer, tableOfContents, faqItems, contentHtml } = useMemo(() => {
    try {
      // Safety check
      if (!markdownContent || typeof markdownContent !== 'string') {
        return {
          quickAnswer: '',
          tableOfContents: [],
          faqItems: [],
          contentHtml: '<p>Kein Inhalt vorhanden</p>'
        };
      }

      // Configure marked
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
      });

      // Split content by sections
      const lines = markdownContent.split('\n');
      let quickAnswerContent = '';
      let faqSection = '';
      let mainContent = '';
      let inQuickAnswer = false;
      let inFaq = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect Quick Answer section
        if (line.match(/^##\s*🎯\s*Quick Answer/i)) {
          inQuickAnswer = true;
          inFaq = false;
          continue;
        }

        // Detect FAQ section
        if (line.match(/^##\s*❓\s*(Häufig gestellte Fragen|FAQ)/i)) {
          inFaq = true;
          inQuickAnswer = false;
          continue;
        }

        // Detect new H2 section (end of Quick Answer or FAQ)
        if (line.match(/^##\s+[^🎯❓]/)) {
          inQuickAnswer = false;
          if (!line.match(/^##\s*❓/)) {
            inFaq = false;
          }
        }

        if (inQuickAnswer) {
          quickAnswerContent += line + '\n';
        } else if (inFaq) {
          faqSection += line + '\n';
        } else {
          mainContent += line + '\n';
        }
      }

      // Extract FAQ items
      const faqItems: Array<{ question: string; answer: string }> = [];
      if (faqSection) {
        const faqMatches = faqSection.match(/###\s*(.+?)\n([\s\S]*?)(?=###|$)/g);
        if (faqMatches) {
          faqMatches.forEach(match => {
            const questionMatch = match.match(/###\s*(.+?)$/m);
            const answerMatch = match.replace(/###\s*.+?\n/, '').trim();
            if (questionMatch && answerMatch) {
              faqItems.push({
                question: questionMatch[1].trim(),
                answer: answerMatch
              });
            }
          });
        }
      }

      // Extract table of contents from H2 headers
      const tocItems: Array<{ id: string; title: string; level: number }> = [];
      const h2Regex = /^##\s+(.+?)$/gm;
      let match;

      while ((match = h2Regex.exec(mainContent)) !== null) {
        const headerText = match[1].replace(/[🎯❓💡]/g, '').trim();
        const id = headerText
          .toLowerCase()
          .replace(/ä/g, 'ae')
          .replace(/ö/g, 'oe')
          .replace(/ü/g, 'ue')
          .replace(/ß/g, 'ss')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        tocItems.push({
          id,
          title: headerText,
          level: 2
        });
      }

      // Convert markdown to HTML with error handling
      let mainContentHtml = '';
      let quickAnswerHtml = '';

      try {
        mainContentHtml = DOMPurify.sanitize(marked(mainContent) as string);
      } catch (err) {
        console.error('Error parsing main content:', err);
        mainContentHtml = '<p>Fehler beim Parsen des Inhalts</p>';
      }

      try {
        quickAnswerHtml = quickAnswerContent ? DOMPurify.sanitize(marked(quickAnswerContent) as string) : '';
      } catch (err) {
        console.error('Error parsing quick answer:', err);
        quickAnswerHtml = '';
      }

      return {
        quickAnswer: quickAnswerHtml,
        tableOfContents: tocItems,
        faqItems,
        contentHtml: mainContentHtml
      };
    } catch (error) {
      console.error('Error in markdown parsing:', error);
      return {
        quickAnswer: '',
        tableOfContents: [],
        faqItems: [],
        contentHtml: '<p>Fehler beim Verarbeiten des Inhalts</p>'
      };
    }
  }, [markdownContent]);

  // Format date with error handling
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Ungültiges Datum';
      }
      return new Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Datum nicht verfügbar';
    }
  };

  const canonicalUrl = `https://copilotenschule.de/wissen/${slug || 'article'}`;
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Wissen', href: '/wissen' },
    { label: title || 'Artikel', href: `/wissen/${slug || 'article'}` }
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        author={author}
        publishedTime={publishDate}
        modifiedTime={new Date().toISOString()}
      />

      <ContentLayout
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
        lastUpdated={formatDate(publishDate)}
        readTime={readTime}
        tableOfContents={tableOfContents}
      >
        {/* Quick Answer Section */}
        {quickAnswer && (
          <section id="quick-answer" className="mb-8">
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-2xl">⚡</span>
                  Schnellantwort
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: quickAnswer }}
                />
              </CardContent>
            </Card>
          </section>
        )}

        {/* Main Content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <section id="faq" className="mt-12 mb-12">
            <h2 className="text-3xl font-bold mb-6">Häufig gestellte Fragen (FAQ)</h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(faq.answer) as string) }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio */}
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

export default KnowledgePagePreview;
