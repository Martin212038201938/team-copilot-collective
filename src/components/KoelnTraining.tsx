import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import raumChill from "@/assets/raum-chill.jpg";
import raumVibes from "@/assets/raum-vibes.jpg";
import raumMeeting from "@/assets/raum-meeting.jpg";
import raumOffice from "@/assets/raum-office.jpg";

const roomImages = [
  {
    src: raumChill,
    alt: "Gemütlicher Lounge-Bereich mit Schallplattenspieler und Ledersofas"
  },
  {
    src: raumVibes,
    alt: "Trainingsraum mit Esstisch und künstlerischem Köln-Wandbild"
  },
  {
    src: raumMeeting,
    alt: "Meetingraum mit großem Konferenztisch für Workshop-Sessions"
  },
  {
    src: raumOffice,
    alt: "Offener Office-Bereich mit begrüntem Ambiente"
  }
];

const KoelnTraining = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="bg-background rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Trainieren Sie ohne Zusatzkosten direkt bei uns in Köln</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bis zu 8 Teilnehmer in unserem modernen, lichtdurchfluteten Trainingsraum mit angefügtem
              Pausenbereich und üppigem Grün für eine inspirierende Lernatmosphäre. Zentral gelegen direkt
              am S-Bahnhof Nippes und perfekt ausgestattet für produktive Workshop-Sessions. Parkplätze begrenzt
              vorhanden. Erfahrene und methodisch geschulte Trainer.
            </p>
          </div>

          <Carousel
            className="w-full max-w-4xl mx-auto"
            setApi={setApi}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {roomImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="p-0">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-[400px] md:h-[500px] object-contain rounded-lg bg-muted/50"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="text-center mt-8 space-y-2">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-accent" />
              <span>Osterather Straße 7, 50739 Köln</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <span>S-Bahnhof Nippes • Zentrale Lage • Parkplätze begrenzt vorhanden</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KoelnTraining;
