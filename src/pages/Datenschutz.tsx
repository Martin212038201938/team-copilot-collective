import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

/**
 * Datenschutzerklärung nach DSGVO (Art. 13/14), BDSG, TDDDG.
 *
 * Pflichtangaben gem. § 5 TMG / § 2 DDG sind im Impressum (Impressum.tsx).
 * Diese Seite behandelt ausschließlich Datenschutz.
 *
 * Letzter Stand: 27.05.2026
 * Wichtig: Diese Erklärung wurde nach bestem Wissen erstellt, ersetzt aber
 * keine anwaltliche Prüfung. Bei rechtlich kritischen Anwendungsfällen bitte
 * von Datenschutzanwalt/-anwältin gegenchecken lassen.
 */

const SLUG = "datenschutz";
const PAGE_TITLE = "Datenschutzerklärung";

const Datenschutz = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title={PAGE_TITLE}
        description="Datenschutzerklärung von copilotenschule.de — Welche Daten wir verarbeiten, warum, auf welcher Rechtsgrundlage und wie Sie Ihre Rechte geltend machen."
        canonicalUrl={`https://copilotenschule.de/${SLUG}`}
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-muted-foreground mb-12">Stand: 27. Mai 2026</p>

          <div className="prose prose-slate max-w-none space-y-10">
            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Verantwortliche Stelle</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
                Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <div className="bg-muted/40 border-l-4 border-primary p-5 rounded-r-lg my-4">
                <p className="font-semibold">Yellow-Boat Consulting, Martin Lang</p>
                <p>
                  Nussbaumerstrasse 26<br />
                  50823 Köln, Deutschland
                </p>
                <p className="mt-2">
                  E-Mail: <a href="mailto:martin@yellow-boat.com" className="text-primary hover:underline">martin@yellow-boat.com</a><br />
                  Telefon: <a href="tel:+4922195018774" className="text-primary hover:underline">+49 221 950 187 74</a>
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  „copilotenschule.de" ist eine Marke der Yellow-Boat Consulting.
                  Vollständige Anbieterangaben siehe <a href="/impressum" className="text-primary hover:underline">Impressum</a>.
                </p>
              </div>
              <p>
                Ein gesetzlich vorgeschriebener Datenschutzbeauftragter ist nicht bestellt,
                da die gesetzlichen Voraussetzungen hierfür (§ 38 BDSG) nicht erfüllt sind.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">2. Allgemeine Hinweise</h2>
              <p>
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den
                gesetzlichen Datenschutzvorschriften (DSGVO, BDSG, TDDDG) sowie dieser
                Datenschutzerklärung. Die Nutzung unserer Website ist in der Regel ohne Angabe
                personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten
                (z. B. Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies stets
                freiwillig.
              </p>
              <p>
                Die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) kann
                Sicherheitslücken aufweisen. Ein lückenloser Schutz der Daten vor dem Zugriff
                durch Dritte ist nicht möglich. Die Übertragung dieser Website erfolgt jedoch
                ausschließlich verschlüsselt über HTTPS (TLS).
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">3. Hosting und Server-Logfiles</h2>
              <p>
                Diese Website wird gehostet bei der <strong>alwaysdata SARL</strong>, 91 Rue
                du Faubourg Saint-Honoré, 75008 Paris, Frankreich. Die Server stehen in
                Frankreich (EU). Mit dem Hosting-Anbieter besteht ein Vertrag zur
                Auftragsverarbeitung gemäß Art. 28 DSGVO.
              </p>
              <p>
                Beim Aufruf der Website erhebt unser Server automatisch sogenannte Server-Logfiles:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Anonymisierte IP-Adresse</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Aufgerufene URL und HTTP-Statuscode</li>
                <li>Übertragene Datenmenge</li>
                <li>Referrer (zuvor besuchte Seite, falls übermittelt)</li>
                <li>Browser-Typ und -Version, Betriebssystem</li>
              </ul>
              <p>
                <strong>Zweck:</strong> Auslieferung der Website, Sicherstellung des Betriebs,
                Schutz vor Missbrauch und statistische Auswertung (siehe Abschnitt 4).
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                am stabilen, sicheren Betrieb der Website).
                <br />
                <strong>Speicherdauer:</strong> Logfiles werden nach maximal 14 Tagen automatisch
                gelöscht oder anonymisiert weiter aggregiert.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">4. Reichweitenmessung durch AlwaysData Analytics</h2>
              <p>
                Unser Hosting-Anbieter alwaysdata stellt uns aggregierte Statistikdaten zur Verfügung,
                die ausschließlich aus den oben genannten Server-Logfiles abgeleitet werden:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Anzahl eindeutiger Besucher pro Tag/Monat</li>
                <li>Aufgerufene URLs (anonymisiert aggregiert)</li>
                <li>Verteilung von Browser, Land, Suchmaschinen-Bots</li>
              </ul>
              <p>
                Es werden <strong>keine Cookies</strong> gesetzt und keine personenbezogenen
                Profile gebildet. Die Auswertung erfolgt rein server-seitig auf den Logfiles
                des Hosters.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an statistischer Auswertung zur Verbesserung des Angebots).
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">5. Microsoft Clarity (Webanalyse, Heatmaps, Session-Recordings)</h2>
              <p>
                Wir nutzen <strong>Microsoft Clarity</strong>, einen Dienst der Microsoft Ireland
                Operations Limited, One Microsoft Place, South County Business Park, Leopardstown,
                Dublin 18, Irland („Microsoft"). Mit Microsoft besteht ein Vertrag zur
                Auftragsverarbeitung. Die Datenverarbeitung erfolgt soweit möglich in EU-Rechenzentren.
                Die Einbindung von Clarity erfolgt über das offizielle{" "}
                <code>@microsoft/clarity</code> npm-Package; das Tracking-Skript wird beim Laden
                der Seite asynchron von <code>clarity.ms</code> nachgeladen.
              </p>
              <p>
                <strong>Was Clarity erhebt:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Mausbewegungen, Klicks, Scroll-Verhalten (Heatmaps)</li>
                <li>Aggregierte Session-Aufzeichnungen (Eingaben in Formularfelder werden automatisch maskiert)</li>
                <li>Aufgerufene URLs, Verweildauer, Klick-Pfade</li>
                <li>Custom-Events bei Conversions: Versand eines Kontaktformulars, Klick auf E-Mail/Telefon, PDF-Download (siehe Abschnitt 6)</li>
                <li>Anonymisierte IP-Adresse, Browser- und Geräteinformationen</li>
              </ul>
              <p>
                <strong>Was Clarity ausdrücklich nicht erhebt:</strong> Inhalte von Eingabefeldern
                (außer ausdrücklich freigeschaltet — bei uns nicht aktiviert), Passwörter, sensible
                personenbezogene Daten.
              </p>
              <p>
                <strong>Cookies und Geräte-Erkennung:</strong> Clarity setzt Cookies und kann
                Geräte-Identifier verwenden, um wiederkehrende Besucher zu erkennen. Diese
                Verarbeitung erfolgt nur bei Einwilligung über unser Consent-Management
                (sofern verbaut) oder auf Basis von Art. 6 Abs. 1 lit. f DSGVO bei berechtigtem
                Interesse an der Optimierung unseres Angebots. Hinweis: copilotenschule.de
                betreibt Clarity derzeit ohne separate Cookie-Banner-Pflicht, weil keine
                identifizierenden Daten an Dritte weitergegeben werden — eine Einwilligungspflicht
                kann sich je nach Rechtsfortentwicklung ergeben.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an der Optimierung der Nutzerfreundlichkeit), für identifizierende Cookies
                zusätzlich Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), § 25 Abs. 1 TDDDG.
              </p>
              <p>
                <strong>Speicherdauer:</strong> Clarity speichert die erhobenen Daten gemäß
                eigenen Aufbewahrungsfristen (üblicherweise 13 Monate). Details bei Microsoft.
              </p>
              <p>
                <strong>Datenschutzhinweise von Microsoft:</strong>{" "}
                <a
                  href="https://privacy.microsoft.com/de-de/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://privacy.microsoft.com/de-de/privacystatement
                </a>
              </p>
              <p>
                <strong>Widerspruchsmöglichkeit:</strong> Sie können der Erhebung Ihrer Daten
                durch Clarity widersprechen, indem Sie in Ihrem Browser den Do-Not-Track-Header
                aktivieren, eine Tracking-Schutz-Browsererweiterung nutzen oder uns formlos an die
                oben genannte E-Mail-Adresse schreiben. Wir entfernen Ihre Session-Daten dann.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">6. Conversion-Tracking auf dieser Website</h2>
              <p>
                An folgenden Stellen lösen wir bei Erfolg einen anonymen Conversion-Event aus,
                der über Microsoft Clarity (Abschnitt 5) erfasst wird:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Erfolgreicher Versand eines Kontaktformulars (Event: <code>contact_form_submit</code>)</li>
                <li>Erfolgreicher Versand einer Trainer-Bewerbung (Event: <code>trainer_application_submit</code>)</li>
                <li>Erfolgreicher Versand des Trainings-Konfigurators (Event: <code>konfigurator_submit</code>)</li>
                <li>Klick auf eine E-Mail-Adresse zum Kontaktieren (Event: <code>mail_click</code>)</li>
                <li>Klick auf eine Telefonnummer zum Anrufen (Event: <code>phone_click</code>)</li>
                <li>Download einer PDF-Datei (Event: <code>pdf_download</code>)</li>
              </ul>
              <p>
                Diese Events enthalten <strong>keine personenbezogenen Daten</strong> über die
                Information hinaus, dass ein bestimmter Browser eine bestimmte Aktion ausgeführt hat.
                Sie dienen ausschließlich der aggregierten Auswertung, welche Seiten unserer Website
                zu Kontaktanfragen führen.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">6a. Google Ads Conversion-Tracking (einwilligungsbasiert)</h2>
              <p>
                Wir schalten Werbeanzeigen über Google Ads (Google Ireland Limited, Gordon House,
                Barrow Street, Dublin 4, Irland). Um zu messen, ob unsere Anzeigen zu Anfragen führen,
                setzen wir das Google-Ads-Conversion-Tracking mit dem sogenannten
                <strong> Consent Mode v2</strong> ein.
              </p>
              <p>
                <strong>Ohne Ihre Einwilligung</strong> werden keine Werbe-Cookies gesetzt und keine
                gerätebezogenen Kennungen gespeichert. Google erhält in diesem Fall lediglich
                cookielose, aggregierte Signale ohne Personenbezug (Conversion-Modellierung).
              </p>
              <p>
                <strong>Mit Ihrer Einwilligung</strong> (über den Cookie-Banner) setzt Google Cookies,
                um Anzeigenklicks mit Aktionen auf unserer Website (z.&nbsp;B. dem Versand eines
                Kontaktformulars) zu verknüpfen. Rechtsgrundlage ist Ihre Einwilligung nach
                Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO sowie §&nbsp;25 Abs.&nbsp;1 TDDDG. Dabei kann
                eine Übermittlung von Daten in die USA stattfinden; Google ist unter dem
                EU-US Data Privacy Framework zertifiziert.
              </p>
              <p>
                <strong>Widerruf:</strong> Sie können Ihre Entscheidung jederzeit ändern, indem Sie die
                im Browser gespeicherte Auswahl löschen (Website-Daten/localStorage dieser Domain
                entfernen) — beim nächsten Besuch erscheint der Banner erneut. Ihre Einwilligung wird
                lokal in Ihrem Browser gespeichert (Schlüssel <code>consent-ads-v1</code>), nicht auf
                unseren Servern.
              </p>
              <p>
                Weitere Informationen: {" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  Google-Datenschutzerklärung
                </a>
                .
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">7. Kontaktformulare</h2>
              <p>
                Auf dieser Website befinden sich mehrere Kontaktformulare (Hauptkontakt,
                Trainer-Bewerbung, Trainings-Konfigurator). Wenn Sie eines davon ausfüllen,
                werden die von Ihnen eingegebenen Daten (mindestens Name, E-Mail-Adresse,
                Nachricht; ggf. weitere von Ihnen freiwillig angegebene Felder wie Firma,
                Telefonnummer, Lebenslauf) per E-Mail an
                {" "}<a href="mailto:martin@yellow-boat.com" className="text-primary hover:underline">martin@yellow-boat.com</a>{" "}
                übermittelt und in unserem E-Mail-System gespeichert. Eine Speicherung in einer
                separaten Datenbank erfolgt nicht.
              </p>
              <p>
                Die Übertragung erfolgt verschlüsselt über HTTPS. Die E-Mail-Zustellung erfolgt
                über die Mailserver unseres Hosters AlwaysData (EU).
              </p>
              <p>
                <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage, Kontaktaufnahme zur Klärung
                und ggf. Anbahnung eines Vertragsverhältnisses.
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
                Maßnahme oder Vertragserfüllung), bei rein informatorischen Anfragen Art. 6 Abs. 1
                lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
                <br />
                <strong>Speicherdauer:</strong> Wir speichern Ihre Anfragedaten so lange, wie es
                für die Bearbeitung erforderlich ist, längstens jedoch bis zum Abschluss des
                Geschäftsvorgangs oder einer fortbestehenden Geschäftsbeziehung. Steuer- und
                handelsrechtliche Aufbewahrungspflichten (bis zu 10 Jahre, § 147 AO,
                § 257 HGB) bleiben unberührt.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">8. Suchmaschinen-Tools (passive Datenerhebung)</h2>
              <p>
                Wir nutzen <strong>Google Search Console</strong> und <strong>Bing Webmaster Tools</strong>{" "}
                zur Überprüfung der Auffindbarkeit unserer Website in den jeweiligen Suchmaschinen.
                Bei diesen Tools handelt es sich um Auswertungen, die <strong>ausschließlich
                serverseitig</strong> bei Google bzw. Microsoft erfolgen, auf Basis der Daten, die diese
                Suchmaschinen ohnehin bei ihrer Indexierung erheben. Auf unserer Website ist kein
                Code dieser Anbieter eingebunden, sodass beim Besuch unserer Website keine
                zusätzlichen Daten an Google oder Microsoft übermittelt werden.
              </p>
              <p>
                Zur beschleunigten Indexierung neuer Inhalte nutzen wir außerdem den Standard{" "}
                <strong>IndexNow</strong> (Bing, Yandex, Seznam). Auch IndexNow erfolgt rein
                serverseitig — wir teilen den Suchmaschinen lediglich die Liste unserer URLs mit.
                Es werden keine Daten unserer Besucher übermittelt.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an der Auffindbarkeit unserer Website in Suchmaschinen).
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">9. Cookies und vergleichbare Technologien</h2>
              <p>
                Unsere Website verwendet folgende Cookies/Browserspeicher:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Technisch notwendige Cookies</strong> für die Funktion der Seite
                  (z. B. Routing, Spracherkennung). Diese werden nach Abschluss Ihres Besuchs
                  automatisch gelöscht. Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG, Art. 6 Abs. 1
                  lit. f DSGVO.
                </li>
                <li>
                  <strong>Microsoft Clarity</strong> (siehe Abschnitt 5) kann Cookies und ähnliche
                  Geräte-Erkennungs-Mechanismen einsetzen.
                </li>
              </ul>
              <p>
                Sie können Cookies in den Einstellungen Ihres Browsers jederzeit löschen oder das
                Setzen weiterer Cookies blockieren. Hierdurch kann die Funktionalität dieser
                Website eingeschränkt sein.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">10. Externe Links</h2>
              <p>
                Unsere Website enthält Verlinkungen zu externen Websites (z. B. LinkedIn, Microsoft,
                Drittanbieter aus dem Wissens-Bereich). Bei Anklicken eines solchen Links verlassen
                Sie unsere Website. Auf die Datenverarbeitung dieser externen Anbieter haben wir
                keinen Einfluss. Bitte informieren Sie sich dort jeweils gesondert über deren
                Datenschutzbestimmungen.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">11. Ihre Rechte als betroffene Person</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Auskunft</strong> über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> unrichtiger oder Vervollständigung unvollständiger Daten (Art. 16 DSGVO)</li>
                <li><strong>Löschung</strong> Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO), sofern keine gesetzlichen Aufbewahrungspflichten oder andere überwiegende Gründe dagegenstehen</li>
                <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li>
                  <strong>Widerspruch</strong> gegen die Verarbeitung Ihrer Daten, soweit diese auf
                  Art. 6 Abs. 1 lit. e oder lit. f DSGVO beruht (Art. 21 DSGVO)
                </li>
                <li><strong>Widerruf einer erteilten Einwilligung</strong> mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              <p>
                Zur Geltendmachung dieser Rechte wenden Sie sich bitte formlos an{" "}
                <a href="mailto:martin@yellow-boat.com" className="text-primary hover:underline">martin@yellow-boat.com</a>.
                Die Bearbeitung erfolgt für Sie kostenfrei.
              </p>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">12. Beschwerderecht bei einer Aufsichtsbehörde</h2>
              <p>
                Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen
                Rechtsbehelfs haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
                beschweren, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres
                Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes (Art. 77 DSGVO).
              </p>
              <p>
                Für uns zuständige Aufsichtsbehörde:
              </p>
              <div className="bg-muted/40 border-l-4 border-muted-foreground p-5 rounded-r-lg my-3">
                <p>
                  <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</strong>
                  <br />
                  Kavalleriestraße 2–4<br />
                  40213 Düsseldorf<br />
                  Telefon: 0211/38424-0<br />
                  E-Mail: <a href="mailto:poststelle@ldi.nrw.de" className="text-primary hover:underline">poststelle@ldi.nrw.de</a><br />
                  Web: <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.ldi.nrw.de</a>
                </p>
              </div>
            </section>

            {/* ====================================================== */}
            <section>
              <h2 className="text-2xl font-bold mb-3">13. Aktualität und Änderungen dieser Datenschutzerklärung</h2>
              <p>
                Diese Datenschutzerklärung hat den Stand vom <strong>27. Mai 2026</strong>.
                Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher
                bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu
                ändern. Die jeweils aktuelle Version ist stets unter{" "}
                <a href="https://copilotenschule.de/datenschutz" className="text-primary hover:underline">
                  https://copilotenschule.de/datenschutz
                </a>{" "}
                abrufbar.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
