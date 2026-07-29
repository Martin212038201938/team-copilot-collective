<?php
/**
 * E-Mail-Versand für den ROI-Business-Case-Generator.
 * Gleicher multipart/alternative-Aufbau wie api/download-lead.php, damit Zustellbarkeit
 * und Optik konsistent bleiben.
 */

require_once __DIR__ . '/roi-config.php';

function roiMailLayout(string $title, string $bodyHtml): string {
    return "
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background-color: #0066cc; color: white !important; text-decoration: none; border-radius: 4px; margin: 8px 6px; }
            .button.secondary { background-color: #ffffff; color: #0066cc !important; border: 1px solid #0066cc; }
            .footer { font-size: 12px; color: #666; padding: 20px; text-align: center; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'><h1>Copilotenschule</h1></div>
            <div class='content'>{$bodyHtml}</div>
            <div class='footer'>
                <p>© " . date('Y') . " Copilotenschule | <a href='https://copilotenschule.de/impressum'>Impressum</a> | <a href='https://copilotenschule.de/datenschutz'>Datenschutz</a></p>
            </div>
        </div>
    </body>
    </html>";
}

function roiSendMultipart(string $to, string $subject, string $htmlBody, string $textBody, string $fromHeader): bool {
    $boundary = md5(uniqid((string)mt_rand(), true));
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'From: ' . $fromHeader,
        'X-Mailer: PHP/' . phpversion(),
    ];

    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $textBody . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";
    $body .= "--{$boundary}--";

    return mail($to, mailHeaderSafe($subject), $body, implode("\r\n", $headers));
}

/** Wird NUR verschickt, nachdem die Datei tatsächlich validiert und gespeichert wurde. */
function roiSendReadyEmail(string $email, string $downloadUrl, string $confirmationUrl, ?string $companyName): bool {
    $greeting = $companyName ? " für {$companyName}" : "";
    $html = roiMailLayout('Ihre Präsentation und Excel sind fertig', "
        <h2>Ihr Copilot Business Case{$greeting} ist fertig</h2>
        <p>Zwei Dateien stehen für Sie bereit: die editierbare Präsentation für die
        Entscheidungsvorlage und die Excel mit der vollständigen, nachvollziehbaren Berechnung.</p>
        <p style='text-align:center;'>
            <a href='{$downloadUrl}' class='button'>Präsentation und Excel herunterladen</a>
        </p>
        <p>Damit wir Sie zu diesem Thema kontaktieren dürfen, bestätigen Sie bitte einmal kurz Ihre E-Mail-Adresse:</p>
        <p style='text-align:center;'>
            <a href='{$confirmationUrl}' class='button secondary'>E-Mail-Adresse bestätigen</a>
        </p>
        <p style='font-size:12px;color:#666;'>Der Download-Link ist " . ROI_FILE_TTL_DAYS . " Tage gültig.</p>
        <hr>
        <p><strong>Datenschutz:</strong> Ihre Daten werden gemäß DSGVO verarbeitet. Sie können Ihre Einwilligung jederzeit widerrufen.</p>
    ");
    $text = "Ihr Copilot Business Case{$greeting} ist fertig\n\n"
        . "Praesentation und Excel herunterladen: {$downloadUrl}\n"
        . "(Link ist " . ROI_FILE_TTL_DAYS . " Tage gültig)\n\n"
        . "E-Mail-Adresse bestätigen: {$confirmationUrl}\n";

    return roiSendMultipart($email, 'Ihre Präsentation und Excel sind fertig', $html, $text, 'Copilotenschule <info@copilotenschule.de>');
}

function roiSendReminderEmail(string $email, string $downloadUrl, ?string $companyName, int $reminderNumber): bool {
    $greeting = $companyName ? " für {$companyName}" : "";
    $isFinal = $reminderNumber === 2;
    $subject = $isFinal
        ? 'Letzte Erinnerung: Ihre Dateien warten noch auf Sie'
        : 'Erinnerung: Ihre Dateien warten auf Sie';

    $html = roiMailLayout($subject, "
        <h2>Ihr Copilot Business Case{$greeting} wartet noch auf Sie</h2>
        <p>Präsentation und Excel-Berechnung liegen weiterhin für Sie bereit.</p>
        <p style='text-align:center;'>
            <a href='{$downloadUrl}' class='button'>Jetzt herunterladen</a>
        </p>
        " . ($isFinal
            ? "<p style='font-size:12px;color:#666;'>Dies ist die letzte Erinnerung. Danach senden wir Ihnen keine weitere E-Mail zu dieser Anfrage mehr; der Link bleibt bis zum Ablauf von " . ROI_FILE_TTL_DAYS . " Tagen gültig.</p>"
            : "<p style='font-size:12px;color:#666;'>Der Link ist noch " . ROI_FILE_TTL_DAYS . " Tage ab Erstellung gültig.</p>"
        ) . "
    ");
    $text = "Ihr Copilot Business Case{$greeting} wartet noch auf Sie\n\n"
        . "Jetzt herunterladen: {$downloadUrl}\n";

    return roiSendMultipart($email, $subject, $html, $text, 'Copilotenschule <info@copilotenschule.de>');
}

/** Wird EINMALIG statt weiterer Erinnerungen verschickt, sobald die Datei wirklich abgeholt wurde. */
function roiSendBookingInviteEmail(string $email, ?string $companyName): bool {
    $greeting = $companyName ? " für {$companyName}" : "";
    $html = roiMailLayout('Zahlen gemeinsam besprechen?', "
        <h2>Ihre Zahlen kurz mit Martin besprechen?</h2>
        <p>Schön, dass Sie Ihren Copilot Business Case{$greeting} heruntergeladen haben.</p>
        <p>Falls hilfreich: Martin nimmt sich gerne 30 Minuten Zeit, um die Annahmen und Zahlen Ihres Business Case kurz mit Ihnen durchzugehen — unverbindlich.</p>
        <p style='text-align:center;'>
            <a href='" . ROI_BOOKING_URL . "' class='button'>Termin auswählen</a>
        </p>
    ");
    $text = "Ihre Zahlen kurz mit Martin besprechen?\n\n"
        . "Schön, dass Sie Ihren Copilot Business Case{$greeting} heruntergeladen haben.\n"
        . "Termin auswählen: " . ROI_BOOKING_URL . "\n";

    return roiSendMultipart($email, 'Zahlen gemeinsam besprechen?', $html, $text, 'Copilotenschule <info@copilotenschule.de>');
}

/**
 * Interne Lead-Benachrichtigung an Martin — keine Finanzwerte, nur grobe Nutzerklasse
 * (Konzept Abschnitt 16.4) plus die freiwilligen Kontextangaben zur Qualifizierung.
 */
function roiSendLeadNotificationToMartin(string $email, ?string $companyName, string $usersBucket, array $context = []): bool {
    $company = $companyName ? htmlspecialchars($companyName) : '(kein Firmenname angegeben)';

    $rows = [
        'E-Mail' => $email,
        'Unternehmen' => $company,
        'Ansprechpartner' => trim(($context['contactName'] ?? '') . (!empty($context['contactRole']) ? ', ' . $context['contactRole'] : '')),
        'Microsoft-365-Nutzer' => !empty($context['m365Users']) ? (string) $context['m365Users'] : '',
        'Geplante Copilot-Lizenzen' => !empty($context['copilotLicenses']) ? (string) $context['copilotLicenses'] : '',
        'Nutzerklasse' => $usersBucket,
        'Branche' => $context['industry'] ?? '',
        'Ziele' => !empty($context['goals']) ? str_replace('|', ', ', $context['goals']) : '',
        'Aktueller Stand' => $context['adoptionStage'] ?? '',
    ];

    $htmlRows = '';
    $textRows = '';
    foreach ($rows as $label => $value) {
        if ($value === '' || $value === null) continue;
        $safe = htmlspecialchars((string) $value);
        $htmlRows .= "<p><strong>{$label}:</strong> {$safe}</p>";
        $textRows .= "{$label}: {$value}\n";
    }

    $html = "<html><body><h2>Neuer ROI-Business-Case-Download</h2>{$htmlRows}</body></html>";
    $text = "Neuer ROI-Business-Case-Download\n\n" . $textRows;

    return roiSendMultipart('martin@yellow-boat.com', 'Neuer ROI-Business-Case-Download: ' . $company, $html, $text, 'Copilotenschule ROI-Generator <y-b@alwaysdata.net>');
}
