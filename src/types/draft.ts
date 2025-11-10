export interface ExtractedTopic {
  title: string;
  description: string;
  keywords: string[];
  relevance: number;
}

export interface GeneratorState {
  step: 'transcript' | 'topics' | 'focus' | 'metadata' | 'content-generation' | 'content-review' | 'page-design' | 'completed';
  transcript: string;
  extractedTopics: ExtractedTopic[];
  selectedTopic: ExtractedTopic | null;
  generatedContent: string; // AI-generated article content (markdown)
  reviewedContent: string; // User-reviewed/edited content
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
