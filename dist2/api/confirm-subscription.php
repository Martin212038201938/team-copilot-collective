<?php
// Include database configuration
require_once __DIR__ . '/db-config.php';

// Get token from URL
$token = isset($_GET['token']) ? trim($_GET['token']) : '';

if (empty($token)) {
    showErrorPage('Ungültiger Bestätigungslink', 'Der Bestätigungslink ist ungültig oder abgelaufen.');
    exit;
}

// Confirm subscription
$confirmed = confirmSubscription($token);

if ($confirmed) {
    showSuccessPage();
} else {
    showErrorPage('Bestätigung fehlgeschlagen', 'Die E-Mail-Adresse wurde bereits bestätigt oder der Link ist ungültig.');
}

/**
 * Show success page
 */
function showSuccessPage() {
    ?>
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-Mail bestätigt - Copilotenschule</title>
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
                background: #10b981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 30px;
            }
            .icon svg {
                width: 50px;
                height: 50px;
                stroke: white;
                stroke-width: 3;
                fill: none;
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
            .button {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 14px 32px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                transition: background 0.3s;
            }
            .button:hover {
                background: #5a67d8;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">
                <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <h1>E-Mail erfolgreich bestätigt!</h1>
            <p>Vielen Dank für die Bestätigung Ihrer E-Mail-Adresse. Sie sind jetzt für unseren Newsletter angemeldet und wir werden uns in Kürze bei Ihnen melden.</p>
            <a href="https://copilotenschule.de" class="button">Zur Startseite</a>
        </div>
    </body>
    </html>
    <?php
}

/**
 * Show error page
 */
function showErrorPage($title, $message) {
    ?>
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo htmlspecialchars($title); ?> - Copilotenschule</title>
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
                background: #ef4444;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 30px;
            }
            .icon svg {
                width: 50px;
                height: 50px;
                stroke: white;
                stroke-width: 3;
                fill: none;
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
            .button {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 14px 32px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                transition: background 0.3s;
            }
            .button:hover {
                background: #5a67d8;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">
                <svg viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <h1><?php echo htmlspecialchars($title); ?></h1>
            <p><?php echo htmlspecialchars($message); ?></p>
            <a href="https://copilotenschule.de" class="button">Zur Startseite</a>
        </div>
    </body>
    </html>
    <?php
}
?>
