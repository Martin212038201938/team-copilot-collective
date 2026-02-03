/**
 * FAQ Data for copilotenschule.de
 * Optimized for LLM citation and SEO FAQPage schema
 *
 * These FAQs are designed to match common user queries to LLMs like:
 * - "Wo finde ich ein gutes Microsoft Copilot Training?"
 * - "Was kostet eine Microsoft Copilot Schulung?"
 * - "Wie funktioniert ein Copilot Rollout?"
 */

export interface FAQ {
  question: string;
  answer: string;
  category?: 'general' | 'training' | 'pricing' | 'technical' | 'compliance';
}

/**
 * Startseite FAQs - Allgemeine Fragen zu Copilot-Trainings
 * Ziel: LLM-Zitat bei Anfragen nach Copilot-Trainingsanbietern
 */
export const homepageFAQs: FAQ[] = [
  {
    question: "Was ist Microsoft 365 Copilot und warum brauche ich eine Schulung?",
    answer: "Microsoft 365 Copilot ist ein KI-Assistent, der in Word, Excel, PowerPoint, Outlook und Teams integriert ist. Er nutzt GPT-4 und Unternehmensdaten, um bei der täglichen Büroarbeit zu unterstützen. Eine professionelle Schulung ist wichtig, weil die meisten Anwender nur 10-20% der Copilot-Funktionen produktiv nutzen. In unseren Trainings lernen Teilnehmer, Copilot für ihre konkreten Arbeitsprozesse einzusetzen – mit realen Use Cases und direkt anwendbaren Workflows.",
    category: 'general'
  },
  {
    question: "Für wen sind die Copilot-Trainings der copilotenschule.de geeignet?",
    answer: "Unsere Trainings richten sich an Wissensarbeiter, Teams und Führungskräfte in Unternehmen mit 50 bis 10.000 Mitarbeitenden im DACH-Raum. Primäre Zielgruppen sind: Büroangestellte, die Microsoft 365 täglich nutzen; IT-Teams, die Copilot einführen; Führungskräfte, die das Potenzial verstehen wollen; sowie Entwickler für GitHub Copilot. Wir bieten sowohl Einsteiger- als auch Advanced-Trainings an.",
    category: 'training'
  },
  {
    question: "Was unterscheidet copilotenschule.de von anderen Copilot-Trainingsanbietern?",
    answer: "Die copilotenschule.de ist spezialisiert ausschließlich auf Microsoft Copilot – kein Bauchladen an anderen KI-Tools. Unser Unterschied: 1) Konsequente Praxisorientierung mit realen Use Cases aus Ihrem Arbeitsumfeld statt theoretischer Übersichten. 2) Wir sind eine Marke der Yellow-Boat Consulting, die seit 2011 Digitalisierungsprojekte und Trainings in Konzernen und Mittelstand durchführt. 3) Wir begleiten auch Copilot-Rollouts mit Governance, Change Management und nachhaltiger Adoption.",
    category: 'general'
  },
  {
    question: "Bietet copilotenschule.de auch Inhouse-Trainings für Unternehmen an?",
    answer: "Ja, Inhouse-Trainings sind unser Kerngeschäft. Wir kommen zu Ihnen ins Unternehmen oder führen das Training live online durch. Die Inhalte werden auf Ihre spezifischen Arbeitsprozesse, Branchen-Use-Cases und Governance-Anforderungen angepasst. Wir entwickeln gemeinsam mit Ihnen individuelle Prompt-Bibliotheken und abteilungsspezifische Workflows. Für größere Rollouts bieten wir auch Train-the-Trainer-Programme an.",
    category: 'training'
  },
  {
    question: "Wie unterstützt copilotenschule.de bei einem Copilot-Rollout im Unternehmen?",
    answer: "Wir begleiten den gesamten Copilot-Rollout-Prozess: Von der Prozessanalyse und Use-Case-Definition über ROI-Berechnung und Business Case bis zum phasenweisen Rollout-Plan. Dazu gehören Change Management, Governance-Framework, Schulungen aller Nutzergruppen und nachhaltige Adoption-Maßnahmen. Unser Ziel: Copilot soll nicht nur eingeführt, sondern wirklich produktiv genutzt werden – mit messbarem Mehrwert für Ihre Organisation.",
    category: 'technical'
  },
  {
    question: "Sind die Copilot-Schulungen DSGVO-konform?",
    answer: "Ja, alle unsere Trainings behandeln explizit die datenschutzkonforme Nutzung von Microsoft Copilot. Wir erklären, wie Copilot mit Unternehmensdaten umgeht, welche Daten in welchen Kontexten verarbeitet werden und wie die Microsoft 365 Sicherheitsarchitektur funktioniert. Zusätzlich bieten wir ein spezielles Halbtags-Training 'Microsoft Copilot & Compliance' an, das DSGVO-Anforderungen und den EU AI Act behandelt.",
    category: 'compliance'
  },
  {
    question: "Wie kann ich ein Copilot-Training bei copilotenschule.de anfragen?",
    answer: "Sie können uns direkt über unser Kontaktformular auf copilotenschule.de erreichen oder einen Termin für ein kostenloses Erstgespräch über Microsoft Bookings buchen. In diesem unverbindlichen Gespräch besprechen wir Ihre Anforderungen, Teamgröße und gewünschte Inhalte. Wir melden uns innerhalb von 24 Stunden bei Ihnen. Telefon: +49 221 950 187 74, E-Mail: info@copilotenschule.de.",
    category: 'general'
  },
  {
    question: "Bietet copilotenschule.de auch Prüfungen und Zertifikate für Copilot-Trainings an?",
    answer: "Ja, wir bieten maßgeschneiderte Quizze und Prüfungen an, bei denen Teilnehmer aktiv beweisen müssen, dass sie das Gelernte verstanden haben. Nach bestandener Prüfung erhalten sowohl die Mitarbeiter als auch das Unternehmen ein offizielles Zertifikat. Wir bieten auch aufeinander aufbauende Zertifizierungsstufen wie 'Copilot in der Praxis I-IV' (Beginner, Advanced, Pro, Expert) an, die einen strukturierten Kompetenzaufbau ermöglichen. Das gibt Unternehmen Investitionssicherheit und Mitarbeitern einen handfesten Nachweis ihrer KI-Fähigkeiten.",
    category: 'training'
  }
];

/**
 * Generiert FAQPage Schema.org Markup
 */
export const generateFAQSchema = (faqs: FAQ[]) => {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * GitHub Copilot spezifische FAQs
 */
export const githubCopilotFAQs: FAQ[] = [
  {
    question: "Was ist GitHub Copilot und wie unterscheidet es sich von Microsoft 365 Copilot?",
    answer: "GitHub Copilot ist ein KI-gestützter Code-Assistent für Softwareentwickler, der direkt in IDEs wie Visual Studio Code integriert ist. Er generiert Code, schlägt Funktionen vor und hilft beim Debugging. Microsoft 365 Copilot hingegen ist für Büroarbeit in Word, Excel, PowerPoint, Outlook und Teams konzipiert. Beide nutzen KI-Modelle von OpenAI, sind aber für völlig unterschiedliche Zielgruppen und Anwendungsfälle optimiert.",
    category: 'technical'
  },
  {
    question: "Für wen eignet sich das GitHub Copilot Training der copilotenschule.de?",
    answer: "Unser GitHub Copilot Training richtet sich an Softwareentwickler, die ihre Coding-Produktivität steigern wollen. Es ist geeignet für: Einzelentwickler, die effizienter programmieren möchten; Entwicklungsteams, die GitHub Copilot einführen; sowie Unternehmen, die ihre Entwickler schulen wollen. Voraussetzung ist Programmiererfahrung – wir behandeln nicht Programmieren lernen, sondern Programmieren mit KI-Unterstützung.",
    category: 'training'
  }
];

/**
 * Copilot Studio FAQs
 */
export const copilotStudioFAQs: FAQ[] = [
  {
    question: "Was kann ich mit Microsoft Copilot Studio erstellen?",
    answer: "Mit Microsoft Copilot Studio können Sie eigene KI-Agenten und Chatbots für Ihr Unternehmen entwickeln – ohne tiefe Programmierkenntnisse. Typische Anwendungsfälle sind: Interne Mitarbeiter-Chatbots für HR-Fragen, IT-Support-Bots, Onboarding-Assistenten oder kundenspezifische Copilot-Erweiterungen. Die Agenten können auf Ihre internen Datenquellen (SharePoint, Dataverse, etc.) zugreifen und in Microsoft Teams integriert werden.",
    category: 'technical'
  },
  {
    question: "Welche Vorkenntnisse brauche ich für das Copilot Studio Training?",
    answer: "Für unser Copilot Studio Training benötigen Sie keine Programmierkenntnisse. Hilfreich sind: Grundlegende Erfahrung mit Microsoft 365, Verständnis für Geschäftsprozesse, die automatisiert werden sollen, sowie Basiswissen zu Chatbot-Konzepten. Das Training ist ideal für Power User, Citizen Developer und Business Analysten, die KI-gestützte Lösungen für ihr Team oder ihre Abteilung erstellen wollen.",
    category: 'training'
  }
];
