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
    name: "Kai Opladen",
    rating: 5,
    date: "vor 4 Monaten",
    text: "Das Training zu den Basic von Copilot im Arbeitsalltag war super! Ich dachte ich wüsste schon viel rund um das Thema KI und Anwedungen, aber tatsächlich wurde ich von Copilot überzeugt und werde zukünftig weniger mit ChatGPT arbeiten. Sondern eher mit Copilot.",
  },
  {
    name: "Judi Ju",
    rating: 5,
    date: "vor einem Monat",
    text: "Super Training. Der Trainer war absolut kompetent und hat es geschafft, auch komplexe Inhalte locker und gut verständlich zu vermitteln. Klare Empfehlung!",
  },
  {
    name: "Hannes Wenner",
    rating: 5,
    date: "vor einem Monat",
    text: "Super Training! Sehr angenehme Atmosphäre und spannende Inhalte. Top aktuell, aber mit Blick auf die unterschiedlichen Wissensstände von Teilnehmenden.",
  },
  {
    name: "Andi W.",
    rating: 5,
    date: "vor 4 Monaten",
    text: "Ich hatte das Vergnügen, am KI-Einsteigerkurs bei Yellow-Boat Consulting teilzunehmen, und ich kann mit voller Überzeugung sagen, dass es eine außergewöhnliche Erfahrung war. Martin, unser Trainer, hat den Kurs mit seiner Expertise und seiner Leidenschaft für das Thema zu einem echten Highlight gemacht. Der Kurs bot eine hervorragende Mischung aus Theorie und praktischer Anwendung. Martin verstand es, die theoretischen Grundlagen der Künstlichen Intelligenz mit praxisnahen Beispielen zu verknüpfen, was das Lernen sehr effektiv und spannend machte. Er ermöglichte es uns, Fragen aus unserem Alltag einzubringen und zu klären, was den Kurs sehr relevant und persönlich gemacht hat.",
  },
  {
    name: "Ela B.",
    rating: 5,
    date: "vor 5 Monaten",
    text: "Ich habe an einer KI-Session für Einsteiger teilgenommen und bin absolut begeistert! Martin hat den Kurs mit hoher Professionalität und gleichzeitig großer Leichtigkeit geleitet. Besonders gefallen haben mir seine Flexibilität, auf Fragen und Interessen der Teilnehmenden einzugehen, sowie die vielen praxisnahen Beispiele, die das Thema greifbar und verständlich gemacht haben. Trotz der Komplexität des Themas war das Seminar durchweg kurzweilig und hat richtig Spaß gemacht. Martin schafft es, nicht nur Wissen zu vermitteln, sondern auch echte Neugierde und Lust auf mehr zu wecken. Ich fühle mich nun motiviert, KI aktiv in meinen Alltag zu integrieren, und freue mich schon auf weiterführende Kurse!",
  },
  {
    name: "Kerstin",
    rating: 5,
    date: "vor 5 Monaten",
    text: "Hervorragendes KI-Einsteiger-Training! Martin ist inhaltlich unglaublich versiert und verfügt über beeindruckende Kenntnisse zum gesamten Themenkomplex. Er schafft es durchweg, dieses umfangreiche Wissen für KI-Newbies in gut strukturierten Einheiten verständlich und anschaulich zu vermitteln. Mit vielen Praxisbeispielen und auf erfrischende Art erklärt, ist das Training trotz der umfassenden Inhalte sehr kurzweilig und Martins eigene Begeisterung fürs Thema zudem sehr ansteckend. Ich habe bei dem Training ganz viel mitgenommen und komme jederzeit gern zu einem Fortsetzungskurs. Alles in allem einfach top!",
  },
  {
    name: "Verena Gietler",
    rating: 5,
    date: "vor 4 Monaten",
    text: "Tolles KI-Training bei Yellow-Boat Consulting! Mit viel Expertise und toller didaktischer Aufbereitung führt Martin das Training. Durch seine sympathische, offene Art gelingt es ihm, in angenehmer Atmosphäre nicht nur fundiertes Wissen zu vermitteln, sondern seine Leidenschaft für das Thema auch weiterzugeben. Ich freu mich auf weitere Kurse, vielen Dank!",
  },
  {
    name: "Simon Korn",
    rating: 5,
    date: "vor 5 Monaten",
    text: "Ich habe an einem ausgezeichneten KI-Training bei Martin teilgenommen und kann ihn sowohl fachlich als auch menschlich wärmstens empfehlen. Mit seiner sympathischen und zugleich sehr kompetenten Art gelang es ihm, eine angenehme Lernatmosphäre zu schaffen, in der sich alle Teilnehmenden abgeholt und motiviert fühlten. Das Training war inhaltlich fundiert und praxisnah sowie didaktisch hervorragend aufgebaut. Im Vorfeld wurden die individuellen Bedürfnisse und Vorkenntnisse abgefragt, darauf aufbauend setzte Martin sein Training mit anschaulichen Beispielen und praxisrelevanten Übungen um. Eine rundum gelungene Schulung!",
  },
  {
    name: "Lydia Möcklinghoff",
    rating: 5,
    date: "vor einem Monat",
    text: "Das KI Training war super. Angenehmer Trainer. Sehr hands-on und genau zugeschnitten auf die jeweiligen Bedürfnisse der Teilnehmenden! Ich wende bereits vieles an und merke einen deutlichen Effizienzgewinn. Vielen Dank nochmal!",
  },
  {
    name: "Julian",
    rating: 5,
    date: "vor 5 Monaten",
    text: "Sehr starkes Training! Hatte selbst schon lange geplant mich im Bereich KI weiter zu bilden aber hatte nicht erwartet, dass es so gut wird. Martin nimmt sich Zeit für jeden einzelnen und schafft es mit seiner offenen und sympathischen Art, auch Menschen, die nur wenig Vorkenntnissen haben, auf ein hohes Level zu bringen! Bin absolut begeistert und werde bald wiederkommen!",
  },
  {
    name: "Nils De Rop",
    rating: 5,
    date: "vor 5 Monaten",
    text: "Martin ist ein fantastischer Trainer, der in einer einzigartigen Mischung aus inhaltlicher Tiefe, Witz und didaktischer Frische Themen rund um Künstliche Intelligenz und Agilität trainiert. Ich arbeite seit mehreren Jahren mit YellowBoat und Martin zusammen und habe hierbei sowohl Zertifikatsschulungen im Bereich ProductOwner, SCRUM-Master und Agile Coach als auch Nutzung von KI im organisationalen Kontext verprobt und implementiert. Er schafft es immer wieder, die Teilnehmer für die Themen zu faszinieren und mit innovativen Ansätzen zu überraschen, weshalb ich ihn sehr empfehlen kann.",
  },
  {
    name: "Jana Graetschel",
    rating: 5,
    date: "vor 5 Monaten",
    text: "Habe das KI Training als super hilfreich und gleichzeitig kurzweilig wahrgenommen. Es wurde auf individuelle Anliegen und Probleme eingegangen und alle Tools sehr anschaulich besprochen.",
  },
  {
    name: "Elfi Heesch",
    rating: 5,
    date: "vor 3 Monaten",
    text: "Der Trainer ist super: viel Fachwissen. Auf Wünsche der Teilnehmenden geht er flexibel ein und passt bei entsprechenden Wünschen das Programm/ den Ablauf darauf an. 👍",
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
            Das sagen Teilnehmer unserer Trainings
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">5.0 auf Google</span>
          </div>
          <a
            href="https://maps.app.goo.gl/JWTPeDLVeuDu9WiJ8"
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
              <CarouselItem key={index} className="md:basis-1/2 basis-full">
                <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2">{review.name}</h3>
                      <div className="flex items-center gap-2">
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
                    <p className="text-muted-foreground leading-none">
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

      </div>
    </section>
  );
};

export default CustomerReviews;
