export interface ExtractedTopic {
  title: string;
  description: string;
  keywords: string[];
  relevance: number;
}

export interface ExtractedFacts {
  numbers: string[]; // ROI, Kosten, Zeiten, Prozentzahlen
  tools: string[]; // Spezifische Tools, Features, Namen
  examples: string[]; // Use Cases, Szenarien, Praxisbeispiele
  quotes: string[]; // Zitate für Authority
}

export interface AIVisibilityScore {
  total: number; // 0-100
  entityDensity: number; // 0-100: Konkrete Namen vs. Pronomen
  extractability: number; // 0-100: Listen, Tabellen, Callouts
  answerQuality: number; // 0-100: Beantwortet erste 100 Wörter die Hauptfrage?
  faqQuality: number; // 0-100: Sind FAQs real search query basiert?
  schemaCompleteness: number; // 0-100: Alle Schema.org Felder ausgefüllt?
  suggestions: string[]; // Konkrete Verbesserungsvorschläge
}

export interface GeneratorState {
  step: 'transcript' | 'topics' | 'focus' | 'fact-extraction' | 'metadata' | 'content-generation' | 'content-review' | 'content-refinement' | 'visibility-score' | 'page-design' | 'completed';
  transcript: string;
  extractedTopics: ExtractedTopic[];
  selectedTopic: ExtractedTopic | null;
  extractedFacts?: ExtractedFacts; // Facts aus Transkript
  generatedContent: string; // AI-generated article content (markdown)
  reviewedContent: string; // User-reviewed/edited content
  refinedContent?: string; // Multi-pass refined content
  visibilityScore?: AIVisibilityScore; // AI-Visibility Score
  finalCode: string; // Final TSX code for the knowledge page
}

export interface Draft {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content or code
  contentType?: 'markdown' | 'code'; // Type of content (default: markdown)
  codeFileName?: string; // Original filename if uploaded as code
  publishDate: string; // ISO date string
  author: string; // Author ID from authors.ts
  category: string;
  slug: string; // URL slug
  keywords: string[];
  readTime: string;
  icon: string;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: string;
  updatedAt: string;

  // Content Generator State (persistent)
  generatorState?: GeneratorState;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
