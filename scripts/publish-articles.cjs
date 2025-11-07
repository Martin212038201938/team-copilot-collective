#!/usr/bin/env node

/**
 * Automatic Article Publishing Script
 *
 * This script:
 * 1. Reads all draft articles from content/drafts/
 * 2. Checks which drafts should be published (publishDate <= now && status === 'scheduled')
 * 3. Generates .tsx pages from the drafts
 * 4. Updates App.tsx with new routes
 * 5. Updates Wissen.tsx with new articles
 * 6. Marks drafts as published
 */

const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, '../content/drafts');
const PAGES_DIR = path.join(__dirname, '../src/pages');
const APP_FILE = path.join(__dirname, '../src/App.tsx');
const WISSEN_FILE = path.join(__dirname, '../src/pages/Wissen.tsx');

// Read all draft files
function getDrafts() {
  const files = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(DRAFTS_DIR, file), 'utf-8');
    return JSON.parse(content);
  });
}

// Check if draft should be published
function shouldPublish(draft) {
  const now = new Date();
  const publishDate = new Date(draft.publishDate);
  return draft.status === 'scheduled' && publishDate <= now;
}

// Convert markdown to React JSX
function markdownToJSX(markdown) {
  // Simple markdown to JSX converter
  // In production, you might want to use a library like react-markdown

  const lines = markdown.split('\n');
  let jsx = [];
  let inList = false;
  let sectionId = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // H1
    if (line.startsWith('# ')) {
      const title = line.substring(2);
      sectionId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      jsx.push(`        <section id="${sectionId}" className="mb-8">`);
      jsx.push(`          <h1 className="text-3xl font-bold mb-4">${title}</h1>`);
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      if (inList) {
        jsx.push('          </ul>');
        inList = false;
      }
      if (sectionId && jsx[jsx.length - 1] !== '        </section>') {
        jsx.push('        </section>');
      }
      const title = line.substring(3);
      sectionId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      jsx.push('');
      jsx.push(`        <section id="${sectionId}" className="mb-8">`);
      jsx.push(`          <h2 className="text-2xl font-bold mb-4">${title}</h2>`);
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      if (inList) {
        jsx.push('          </ul>');
        inList = false;
      }
      const title = line.substring(4);
      jsx.push(`          <h3 className="text-xl font-semibold mb-3 mt-6">${title}</h3>`);
      continue;
    }

    // List items
    if (line.startsWith('- ')) {
      if (!inList) {
        jsx.push('          <ul className="list-disc list-inside space-y-2 mb-4">');
        inList = true;
      }
      const item = line.substring(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
      jsx.push(`            <li>${item}</li>`);
      continue;
    }

    // Code blocks
    if (line.startsWith('```')) {
      if (inList) {
        jsx.push('          </ul>');
        inList = false;
      }
      const lang = line.substring(3);
      let codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      const code = codeLines.join('\\n').replace(/`/g, '\\`').replace(/\$/g, '\\$');
      jsx.push('          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">');
      jsx.push(`            <pre className="text-sm"><code>${code}</code></pre>`);
      jsx.push('          </div>');
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      if (inList) {
        jsx.push('          </ul>');
        inList = false;
      }
      continue;
    }

    // Regular paragraphs
    if (line.trim() && !line.startsWith('#') && !line.startsWith('-') && !line.startsWith('```')) {
      if (inList) {
        jsx.push('          </ul>');
        inList = false;
      }
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      jsx.push(`          <p className="mb-4 text-gray-700 leading-relaxed">${formatted}</p>`);
    }
  }

  if (inList) {
    jsx.push('          </ul>');
  }
  if (sectionId) {
    jsx.push('        </section>');
  }

  return jsx.join('\n');
}

// Generate table of contents from markdown
function generateTableOfContents(markdown) {
  const lines = markdown.split('\n');
  const toc = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const title = line.substring(3);
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      toc.push(`    { id: "${id}", title: "${title}", level: 2 }`);
    } else if (line.startsWith('### ')) {
      const title = line.substring(4);
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      toc.push(`    { id: "${id}", title: "${title}", level: 3 }`);
    }
  }

  return toc.join(',\n');
}

// Generate component name from slug
function getComponentName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Generate .tsx page from draft
function generatePage(draft) {
  const componentName = getComponentName(draft.slug);
  const toc = generateTableOfContents(draft.content);
  const content = markdownToJSX(draft.content);

  return `import ContentLayout from "@/components/ContentLayout";
import SEOHead from "@/components/SEOHead";
import { getAuthor, getAuthorSchemaMarkup } from "@/data/authors";

const ${componentName} = () => {
  const author = getAuthor("${draft.author}");

  const tableOfContents = [
${toc}
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${draft.title}",
    "description": "${draft.description}",
    "author": getAuthorSchemaMarkup(author),
    "datePublished": "${new Date(draft.publishDate).toISOString().split('T')[0]}",
    "dateModified": "${new Date(draft.updatedAt).toISOString().split('T')[0]}",
    "keywords": ${JSON.stringify(draft.keywords)},
    "articleSection": "${draft.category}"
  };

  return (
    <>
      <SEOHead
        title="${draft.title} | Copilotenschule"
        description="${draft.description}"
        keywords={${JSON.stringify(draft.keywords)}}
        canonicalUrl="https://copilotenschule.de/wissen/${draft.slug}"
        schema={articleSchema}
        publishedTime="${new Date(draft.publishDate).toISOString().split('T')[0]}"
        modifiedTime="${new Date(draft.updatedAt).toISOString().split('T')[0]}"
      />
      <ContentLayout
        breadcrumbs={[
          { label: "Wissen", href: "/wissen" },
          { label: "${draft.title}", href: "/wissen/${draft.slug}" }
        ]}
        title="${draft.title}"
        description="${draft.description}"
        tableOfContents={tableOfContents}
        author={author}
        publishDate="${new Date(draft.publishDate).toISOString().split('T')[0]}"
        readTime="${draft.readTime}"
      >
${content}
      </ContentLayout>
    </>
  );
};

export default ${componentName};
`;
}

// Update App.tsx with new route
function addRoute(draft) {
  const componentName = getComponentName(draft.slug);
  let appContent = fs.readFileSync(APP_FILE, 'utf-8');

  // Add import if not exists
  const importStatement = `import ${componentName} from "./pages/${componentName}";`;
  if (!appContent.includes(importStatement)) {
    const lastImportIndex = appContent.lastIndexOf('import');
    const nextLineIndex = appContent.indexOf('\n', lastImportIndex);
    appContent = appContent.slice(0, nextLineIndex + 1) + importStatement + '\n' + appContent.slice(nextLineIndex + 1);
  }

  // Add route if not exists
  const routeStatement = `          <Route path="/wissen/${draft.slug}" element={<${componentName} />} />`;
  if (!appContent.includes(routeStatement)) {
    const impressumRoute = appContent.indexOf('<Route path="/impressum"');
    const lineStart = appContent.lastIndexOf('\n', impressumRoute);
    appContent = appContent.slice(0, lineStart + 1) + routeStatement + '\n' + appContent.slice(lineStart + 1);
  }

  fs.writeFileSync(APP_FILE, appContent);
  console.log(`✓ Added route for ${componentName}`);
}

// Update Wissen.tsx with new article
function addToWissen(draft) {
  let wissenContent = fs.readFileSync(WISSEN_FILE, 'utf-8');

  const newTopic = `  {
    title: "${draft.title}",
    description: "${draft.description}",
    link: "/wissen/${draft.slug}",
    badge: "${draft.category}",
    icon: "${draft.icon}",
    readTime: "${draft.readTime}",
    lastUpdated: "${new Date(draft.publishDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}"
  }`;

  // Find the knowledgeTopics array and add the new topic
  const topicsArrayStart = wissenContent.indexOf('const knowledgeTopics = [');
  if (topicsArrayStart !== -1) {
    const arrayEnd = wissenContent.indexOf('];', topicsArrayStart);
    const currentTopics = wissenContent.substring(topicsArrayStart, arrayEnd);

    // Check if topic already exists
    if (!currentTopics.includes(`link: "/wissen/${draft.slug}"`)) {
      // Add before the closing bracket
      wissenContent = wissenContent.slice(0, arrayEnd) + ',\n' + newTopic + '\n' + wissenContent.slice(arrayEnd);
      fs.writeFileSync(WISSEN_FILE, wissenContent);
      console.log(`✓ Added article to Wissen overview`);
    }
  }
}

// Mark draft as published
function markAsPublished(draft) {
  draft.status = 'published';
  const draftFile = path.join(DRAFTS_DIR, `${draft.id}.json`);
  fs.writeFileSync(draftFile, JSON.stringify(draft, null, 2));

  // Also update in public folder
  const publicDraftFile = path.join(__dirname, '../public/content/drafts', `${draft.id}.json`);
  if (fs.existsSync(publicDraftFile)) {
    fs.writeFileSync(publicDraftFile, JSON.stringify(draft, null, 2));
  }
}

// Main execution
function main() {
  console.log('🚀 Starting automatic article publishing...\n');

  const drafts = getDrafts();
  console.log(`Found ${drafts.length} total drafts`);

  const toPublish = drafts.filter(shouldPublish);
  console.log(`${toPublish.length} articles ready to publish\n`);

  if (toPublish.length === 0) {
    console.log('✓ No articles to publish at this time');
    return;
  }

  for (const draft of toPublish) {
    console.log(`\nPublishing: ${draft.title}`);
    console.log(`  ID: ${draft.id}`);
    console.log(`  Slug: ${draft.slug}`);
    console.log(`  Publish Date: ${draft.publishDate}`);

    try {
      // Generate page
      const componentName = getComponentName(draft.slug);
      const pageContent = generatePage(draft);
      const pagePath = path.join(PAGES_DIR, `${componentName}.tsx`);
      fs.writeFileSync(pagePath, pageContent);
      console.log(`  ✓ Created page: ${componentName}.tsx`);

      // Update App.tsx
      addRoute(draft);

      // Update Wissen.tsx
      addToWissen(draft);

      // Mark as published
      markAsPublished(draft);
      console.log(`  ✓ Marked as published`);

      console.log(`✓ Successfully published: ${draft.title}`);
    } catch (error) {
      console.error(`✗ Error publishing ${draft.title}:`, error);
    }
  }

  console.log(`\n🎉 Publishing complete! ${toPublish.length} article(s) published.`);
}

main();
