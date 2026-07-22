/**
 * Kompakter Social-Proof-Block für Trainings-Produktseiten (Phase 3, 2026-07-22).
 *
 * Auszug aus den echten Google-Bewertungen – bewusst nur Zitate, die vom
 * "Trainer" sprechen statt Personen beim Namen zu nennen (Vorgabe Martin,
 * 22.07.2026). Im Zitat von Andi W. ist dafür lediglich der Trainer-Name
 * durch "Der Trainer" ersetzt, sonst wörtlich. Vollständige Bewertungen: Google-Profil (Link
 * unten, gleiches Muster wie das Karussell auf der Startseite).
 *
 * Bewusst OHNE aggregateRating-Schema: Die Bewertungen gelten dem Unternehmen,
 * nicht einzelnen Kursen – Self-Serving-Markup wäre angreifbar (Entscheid 22.07.2026).
 */
import { Star } from "lucide-react";

const quotes = [
  {
    name: "Judi Ju",
    text: "Super Training. Der Trainer war absolut kompetent und hat es geschafft, auch komplexe Inhalte locker und gut verständlich zu vermitteln. Klare Empfehlung!",
  },
  {
    name: "Andi W.",
    text: "Ich hatte das Vergnügen, am KI-Einsteigerkurs bei Yellow-Boat Consulting teilzunehmen, und ich kann mit voller Überzeugung sagen, dass es eine außergewöhnliche Erfahrung war. Der Trainer hat den Kurs mit seiner Expertise und seiner Leidenschaft für das Thema zu einem echten Highlight gemacht. Der Kurs bot eine hervorragende Mischung aus Theorie und praktischer Anwendung. Der Trainer verstand es, die theoretischen Grundlagen der Künstlichen Intelligenz mit praxisnahen Beispielen zu verknüpfen, was das Lernen sehr effektiv und spannend machte. Er ermöglichte es uns, Fragen aus unserem Alltag einzubringen und zu klären, was den Kurs sehr relevant und persönlich gemacht hat.",
  },
  {
    name: "Hannes Wenner",
    text: "Super Training! Sehr angenehme Atmosphäre und spannende Inhalte. Top aktuell, aber mit Blick auf die unterschiedlichen Wissensstände von Teilnehmenden.",
  },
];

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/JWTPeDLVeuDu9WiJ8";

const TrainingReviews = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Das sagen Teilnehmende</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">5.0 auf Google</span>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-2 mt-2 text-sm"
            >
              Alle Bewertungen auf Google ansehen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {quotes.map((quote) => (
              <figure key={quote.name} className="bg-card border rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-muted-foreground leading-relaxed mb-3">
                  „{quote.text}"
                </blockquote>
                <figcaption className="text-sm font-semibold">{quote.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingReviews;
