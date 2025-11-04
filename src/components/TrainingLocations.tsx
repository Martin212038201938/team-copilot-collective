import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Monitor, Building2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import raumChill from "@/assets/raum-chill.jpg";
import raumVibes from "@/assets/raum-vibes.jpg";
import raumMeeting from "@/assets/raum-meeting.jpg";
import raumOffice from "@/assets/raum-office.jpg";

const locations = [
  {
    icon: Building2,
    title: "Inhouse bei Ihnen",
    description: "Wir kommen zu Ihnen ins Unternehmen. Training direkt an Ihrem Arbeitsplatz mit Ihren Tools und Daten – für maximale Praxisnähe.",
    benefits: [
      "Training in Ihrer gewohnten Umgebung",
      "Keine Reisekosten für Ihre Mitarbeiter",
      "Arbeit mit Ihren echten Systemen",
      "Flexible Terminplanung"
    ]
  },
  {
    icon: Monitor,
    title: "Online Remote",
    description: "Live-Training per Microsoft Teams oder Zoom. Interaktiv, praxisnah und genauso effektiv wie vor Ort – von überall aus.",
    benefits: [
      "Keine Anreise notwendig",
      "Deutschlandweit verfügbar",
      "Screen-Sharing für Live-Demos",
      "Aufzeichnung auf Wunsch"
    ]
  },
  {
    icon: MapPin,
    title: "In unseren Räumen in Köln",
    description: "Moderne, inspirierende Trainingsräume im Herzen von Köln. Perfekt ausgestattet für produktive Workshop-Sessions.",
    benefits: [
      "Moderne Räume mit grüner Atmosphäre",
      "Zentral in Köln gelegen",
      "Professionelles Equipment",
      "Kaffee & Verpflegung inklusive"
    ]
  }
];

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

const TrainingLocations = () => {
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
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-accent/90 text-accent-foreground rounded-full text-sm font-medium">
            Ihre Wahl
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Wo möchten Sie trainieren?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexibel nach Ihren Bedürfnissen: Online, bei Ihnen vor Ort oder in unseren 
            modernen Trainingsräumen in Köln.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {locations.map((location, index) => {
            const Icon = location.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{location.title}</h3>
                  <p className="text-muted-foreground mb-4">{location.description}</p>
                  <ul className="space-y-2">
                    {location.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-background rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Trainieren Sie ohne Zusatzkosten direkt bei uns in Köln</h3>
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

export default TrainingLocations;
