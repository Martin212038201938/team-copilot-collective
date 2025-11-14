import { useParams, Navigate } from "react-router-dom";
import { getPublishedArticleBySlug } from "@/utils/publishedArticles";
import KnowledgePagePreview from "@/components/KnowledgePagePreview";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DynamicKnowledgePage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/wissen" replace />;
  }

  const article = getPublishedArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artikel nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">
            Dieser Artikel existiert nicht oder wurde noch nicht veröffentlicht.
          </p>
          <a href="/wissen" className="text-primary hover:underline">
            ← Zurück zur Wissensübersicht
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16">
        <KnowledgePagePreview
          title={article.title}
          description={article.description}
          slug={article.slug}
          keywords={article.keywords}
          category={article.category}
          readTime={article.readTime}
          publishDate={article.publishDate}
          authorId={article.author}
          markdownContent={article.content}
        />
      </main>
      <Footer />
    </>
  );
};

export default DynamicKnowledgePage;
