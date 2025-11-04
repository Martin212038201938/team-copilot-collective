import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung / Impressum</h1>
          
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <p className="text-lg text-muted-foreground mb-6">
                <strong>copilotenschule.de</strong> ist eine Marke der Yellow-Boat Consulting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Impressum</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Angaben gemäß § 5 TMG</h3>
              <p>
                Yellow-Boat Consulting, Martin Lang<br />
                Nussbaumerstrasse 26<br />
                50823 Köln
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Vertreten durch:</h3>
              <p>Martin Lang</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Kontakt</h3>
              <p>
                Telefon: +49 221 950 187 74<br />
                E-Mail: martin (at) yellow-boat .com
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Umsatzsteuer-ID</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE306698587
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Redaktionell verantwortlich</h3>
              <p>Martin Lang</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://ec.europa.eu/consumers/odr/
                </a>.<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Informationen gemäß § 5 Telemediengesetz und § 55 Abs. 1 Rundfunkstaatsvertrag</h2>
              <p>
                Inhaltlich verantwortlich im Sinne des § 55 Abs. 2 Rundfunkstaatsvertrag: Martin Lang
              </p>
              <p className="mt-4">
                Diverse Inhalte wie Texte und Bilder wurden mit Unterstützung KI-basierter Tools erstellt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Externe Links</h2>
              <p>
                Trotz einer sorgfältigen inhaltlichen Kontrolle übernehmen wir keine Haftung für die Inhalte 
                externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
              <p className="mt-4">
                <strong>Hinweis zur Problematik von externen Links:</strong> YBC ist als Inhaltsanbieter nach 
                § 7 Abs. 1 Telemediengesetz für die "eigenen Inhalte", die er zur Nutzung bereithält, nach den 
                allgemeinen Gesetzen verantwortlich. Von diesen eigenen Inhalten sind Querverweise ("Links") auf 
                die von anderen Anbietern bereitgehaltenen Inhalte zu unterscheiden. Durch den Querverweis hält 
                YBC insofern "fremde Inhalte" zur Nutzung bereit, die in dieser Weise gekennzeichnet sind: Bei 
                "Links" handelt es sich stets um "lebende" (dynamische) Verweisungen. YBC hat bei der erstmaligen 
                Verknüpfung zwar den fremden Inhalt daraufhin überprüft, ob durch ihn eine mögliche zivilrechtliche 
                oder strafrechtliche Verantwortlichkeit ausgelöst wird. Er überprüft aber die Inhalte, auf die er 
                in seinem Angebot verweist, nicht ständig auf Veränderungen, die eine Verantwortlichkeit neu begründen 
                könnten. Wenn er feststellt oder von anderen darauf hingewiesen wird, dass ein konkretes Angebot, zu 
                dem er einen Link bereitgestellt hat, eine zivil- oder strafrechtliche Verantwortlichkeit auslöst, 
                wird er den Verweis auf dieses Angebot aufheben. Bitte beachten Sie die AGB mit Stand vom 11.11.2016, 
                die Grundlage jeder Dienstleistung bzw. Lieferung sind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Google Analytics</h2>
              <p>
                Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google"). Google 
                Analytics verwendet sog. „Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die 
                eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch das Cookie erzeugten 
                Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in 
                den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser 
                Website, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union 
                oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. 
                Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und 
                dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um 
                Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um 
                weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem 
                Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte 
                IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der 
                Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch 
                darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website 
                vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie 
                erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie 
                die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link 
                verfügbare Browser-Plugin herunterladen und installieren:{" "}
                <a href="http://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  http://tools.google.com/dlpage/gaoptout?hl=de
                </a>
              </p>
              <p className="mt-4">
                Sie können die Erfassung durch Google Analytics verhindern, indem Sie auf folgenden Link klicken. 
                Es wird ein Opt-Out-Cookie gesetzt, das die zukünftige Erfassung Ihrer Daten beim Besuch dieser 
                Website verhindert.
              </p>
              <p className="mt-4">
                Nähere Informationen zu Nutzungsbedingungen und Datenschutz finden Sie unter{" "}
                <a href="http://www.google.com/analytics/terms/de.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  http://www.google.com/analytics/terms/de.html
                </a>{" "}
                bzw. unter{" "}
                <a href="https://www.google.de/intl/de/policies/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://www.google.de/intl/de/policies/
                </a>. 
                Wir weisen Sie darauf hin, dass auf dieser Website Google Analytics um den Code „anonymizeIp" 
                erweitert wurde, um eine anonymisierte Erfassung von IP-Adressen (sog. IP-Masking) zu gewährleisten.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
