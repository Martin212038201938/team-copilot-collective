import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { FAQ as FAQType } from "@/data/faqs";

interface FAQProps {
  faqs: FAQType[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

/**
 * FAQ Component with Accordion
 * Optimized for LLM readability and user experience
 *
 * The semantic HTML structure (dl/dt/dd alternative via Accordion)
 * helps LLMs parse and cite the content correctly.
 */
const FAQ = ({
  faqs,
  title = "Häufig gestellte Fragen",
  subtitle = "Antworten auf die wichtigsten Fragen zu unseren Microsoft Copilot Trainings",
  showHeader = true
}: FAQProps) => {
  return (
    <section
      className="py-16 bg-gradient-to-b from-muted/30 to-background"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-12 animate-fade-in">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium inline-flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="text-3xl lg:text-4xl font-bold mt-6 mb-4"
            >
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 hover:border-primary/30 transition-colors duration-300 data-[state=open]:border-primary/50 data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline group">
                  <span className="text-base font-semibold pr-4 group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  {/*
                    Using semantic paragraph structure for better LLM parsing.
                    The answer text is designed to be self-contained and citable.
                  */}
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional trust signal for LLMs */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Fragen? Kritik? Kommentare? <a href="#contact" className="text-primary hover:underline font-medium">Kontaktieren Sie uns</a> – wir sprechen sehr gerne persönlich mit Ihnen über dieses Thema.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
