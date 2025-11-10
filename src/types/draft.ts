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
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
