<?php
// Double opt-in confirmation endpoint.
//
// Two-step design (important!):
//   GET  -> shows a confirmation page with a "Jetzt bestätigen" button. It does
//           NOT change any data. This is what defeats automated mail-security
//           scanners such as Microsoft Outlook "Safe Links"/Defender, which
//           pre-fetch links via GET and would otherwise silently confirm the
//           subscription before the human ever clicks (breaking their click and
//           invalidating the GDPR double opt-in).
//   POST -> performs the actual confirmation (triggered only by a real click on
//           the button).

require_once __DIR__ . '/db-config.php';

header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex');

// Accept token from POST (real confirmation) or GET (showing the button).
$token = '';
if (isset($_POST['token'])) {
    $token = trim($_POST['token']);
} elseif (isset($_GET['token'])) {
    $token = trim($_GET['token']);
}

$isPost = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';

// Validate token format (tokens are hex strings, 64 chars by default).
if ($token === '' || !preg_match('/^[a-f0-9]{32,128}$/i', $token)) {
    showErrorPage('Ungültiger Bestätigungslink', 'Der Bestätigungslink ist ungültig oder unvollständig. Bitte verwenden Sie den vollständigen Link aus unserer E-Mail.');
    exit;
}

if ($isPost) {
    // ---- Step 2: a human clicked the button -> perform the confirmation. ----
    $result = confirmSubscription($token);

    switch ($result) {
        case 'confirmed_now':
            showSuccessPage(false);
            break;
        case 'already_confirmed':
            showSuccessPage(true);
            break;
        case 'unsubscribed':
            showInfoPage('Bereits abgemeldet', 'Diese E-Mail-Adresse wurde abgemeldet. Falls das ein Versehen war, kontaktieren Sie uns gerne – wir helfen Ihnen weiter.');
            break;
        case 'not_found':
            showErrorPage('Bestätigung fehlgeschlagen', 'Der Bestätigungslink ist ungültig oder abgelaufen.');
            break;
        case 'db_error':
        default:
            showRetryPage($token);
            break;
    }
    exit;
}

// ---- Step 1: GET -> read-only lookup, then show the appropriate page. ----
$status = getSubscriptionStatusByToken($token);

switch ($status) {
    case 'confirmed':
        // Already confirmed (e.g. a scanner or an earlier click). Show a friendly
        // success page instead of a scary error.
        showSuccessPage(true);
        break;
    case 'unsubscribed':
        showInfoPage('Bereits abgemeldet', 'Diese E-Mail-Adresse wurde abgemeldet. Falls das ein Versehen war, kontaktieren Sie uns gerne – wir helfen Ihnen weiter.');
        break;
    case 'not_found':
        showErrorPage('Bestätigung fehlgeschlagen', 'Der Bestätigungslink ist ungültig oder abgelaufen.');
        break;
    case 'db_error':
        // DB temporarily unavailable: still offer the button so the user can try
        // the confirmation (POST) anyway.
        showConfirmPage($token);
        break;
    case 'pending':
    default:
        showConfirmPage($token);
        break;
}

/**
 * Shared HTML shell for every page.
 *
 * @param string $title       Browser/tab title.
 * @param string $variant     success|error|info|confirm
 * @param string $headline    Visible H1 (will be escaped).
 * @param string $messageHtml Body paragraph(s) – trusted HTML built in this file.
 * @param string $actionHtml  Buttons/forms – trusted HTML built in this file.
 */
function renderPage($title, $variant, $headline, $messageHtml, $actionHtml = '') {
    $accents = [
        'success' => '#10b981',
        'error'   => '#ef4444',
        'info'    => '#0066cc',
        'confirm' => '#0066cc',
    ];
    $accent = isset($accents[$variant]) ? $accents[$variant] : '#0066cc';

    $icons = [
        'success' => '<polyline points="20 6 9 17 4 12"></polyline>',
        'error'   => '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
        'info'    => '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="7" x2="12" y2="13"></line><line x1="12" y1="16.5" x2="12" y2="16.5"></line>',
        'confirm' => '<rect x="3" y="5" width="18" height="14" rx="2"></rect><polyline points="3 7 12 13 21 7"></polyline>',
    ];
    $icon = isset($icons[$variant]) ? $icons[$variant] : $icons['info'];

    $titleEsc = htmlspecialchars($title);
    $headlineEsc = htmlspecialchars($headline);

    echo <<<HTML
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <title>{$titleEsc} - Copilotenschule</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            max-width: 500px;
            width: 100%;
            padding: 40px;
            text-align: center;
        }
        .icon {
            width: 80px;
            height: 80px;
            background: {$accent};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
        }
        .icon svg {
            width: 46px;
            height: 46px;
            stroke: white;
            stroke-width: 2.5;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        h1 {
            color: #1f2937;
            margin-bottom: 16px;
            font-size: 28px;
        }
        p {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 24px;
            font-size: 16px;
        }
        p.hint {
            font-size: 13px;
            margin-top: 18px;
            margin-bottom: 0;
        }
        .button {
            display: inline-block;
            background: {$accent};
            color: white;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            border: none;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .button:hover { opacity: 0.9; }
        .button.secondary {
            background: transparent;
            color: {$accent};
            font-weight: 500;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">
            <svg viewBox="0 0 24 24">{$icon}</svg>
        </div>
        <h1>{$headlineEsc}</h1>
        {$messageHtml}
        {$actionHtml}
    </div>
</body>
</html>
HTML;
}

/**
 * Step 1 page: ask the user to actively confirm (POST). Shown on GET only.
 */
function showConfirmPage($token) {
    $endpoint = '/api/confirm-subscription.php';
    if (!empty($_SERVER['REQUEST_URI'])) {
        $endpoint = strtok($_SERVER['REQUEST_URI'], '?');
    }
    $endpointEsc = htmlspecialchars($endpoint, ENT_QUOTES);
    $tokenEsc = htmlspecialchars($token, ENT_QUOTES);

    $message = '<p>Bitte bestätigen Sie mit einem Klick, dass wir Sie per E-Mail kontaktieren dürfen.</p>';
    $action = <<<HTML
        <form method="post" action="{$endpointEsc}">
            <input type="hidden" name="token" value="{$tokenEsc}">
            <button type="submit" class="button">E-Mail-Adresse bestätigen</button>
        </form>
        <p class="hint">Ihre Einwilligung können Sie jederzeit widerrufen. Ihre Daten werden gemäß DSGVO verarbeitet.</p>
HTML;

    renderPage('Bitte bestätigen', 'confirm', 'Nur noch ein Schritt', $message, $action);
}

/**
 * Success page. $alreadyConfirmed = true when nothing needed to be done.
 */
function showSuccessPage($alreadyConfirmed = false) {
    if ($alreadyConfirmed) {
        $message = '<p>Ihre E-Mail-Adresse ist bereits bestätigt. Sie müssen nichts weiter tun – wir melden uns in Kürze bei Ihnen.</p>';
    } else {
        $message = '<p>Vielen Dank für die Bestätigung Ihrer E-Mail-Adresse. Wir dürfen Sie nun kontaktieren und melden uns in Kürze bei Ihnen.</p>';
    }
    $action = '<a href="https://copilotenschule.de" class="button">Zur Startseite</a>';
    renderPage('E-Mail bestätigt', 'success', 'E-Mail erfolgreich bestätigt!', $message, $action);
}

/**
 * Neutral info page (e.g. already unsubscribed).
 */
function showInfoPage($title, $messageText) {
    $message = '<p>' . htmlspecialchars($messageText) . '</p>';
    $action = '<a href="https://copilotenschule.de" class="button">Zur Startseite</a>';
    renderPage($title, 'info', $title, $message, $action);
}

/**
 * Shown when the database is temporarily unavailable during a POST confirmation.
 * Lets the user retry the confirmation.
 */
function showRetryPage($token) {
    $tokenEsc = htmlspecialchars($token, ENT_QUOTES);
    $endpoint = '/api/confirm-subscription.php';
    if (!empty($_SERVER['REQUEST_URI'])) {
        $endpoint = strtok($_SERVER['REQUEST_URI'], '?');
    }
    $endpointEsc = htmlspecialchars($endpoint, ENT_QUOTES);

    $message = '<p>Es gab ein vorübergehendes technisches Problem. Bitte versuchen Sie es gleich noch einmal.</p>';
    $action = <<<HTML
        <form method="post" action="{$endpointEsc}">
            <input type="hidden" name="token" value="{$tokenEsc}">
            <button type="submit" class="button">Erneut versuchen</button>
        </form>
HTML;
    renderPage('Bitte erneut versuchen', 'info', 'Kurzer Moment', $message, $action);
}

/**
 * Error page (invalid/expired link).
 */
function showErrorPage($title, $message) {
    $messageHtml = '<p>' . htmlspecialchars($message) . '</p>';
    $action = '<a href="https://copilotenschule.de" class="button">Zur Startseite</a>';
    renderPage($title, 'error', $title, $messageHtml, $action);
}
