import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const reviews = [
  {
    name: "Anna Reichelt",
    rating: 5,
    date: "vor einem Monat",
    text: "Unser Unternehmen hat eine zweitägige Inhouse Scrum Master Schulung für eine Gruppe von sechs Teilnehmern bei der Agile Scrum Group GmbH gebucht. Der Kurs war ausgezeichnet, wirklich inspirierend und ich kann ihn von Herzen empfehlen. Er war sehr unterhaltsam, gut strukturiert und praxisnah. Der Trainer hat es hervorragend geschafft, das 'agile Mindset'/agile Denken durch viele praktische Übungen und zahlreiche Real-Life-Beispiele aus der Karriere des Trainers zu vermitteln. Der Trainer ließ auch Raum für Diskussionen über unsere eigenen Arbeitsbereiche und für Fragen. Er moderierte den Kurs sehr gut, ging auf jeden Teilnehmer ein und machte es leicht, konzentriert beim Thema zu bleiben. Ich kann es sehr empfehlen!",
    avatar: "AR",
  },
];

const CustomerReviews = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Echte Erfahrungen von Unternehmen, die unsere Microsoft Copilot Schulungen absolviert haben
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">5.0 auf Google</span>
          </div>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="basis-full">
                <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{review.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-8">
          <a
            href="https://maps.app.goo.gl/JWTPeDLVeuDu9WiJ8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium inline-flex items-center gap-2"
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
      </div>
    </section>
  );
};

export default CustomerReviews;
