# Copilotenschule.de - Team Copilot Collective

Website und Knowledge Base für Microsoft 365 Copilot Training und Beratung.

## 🚀 Key Features

- **📚 Wissensseiten**: Umfangreiche Guides und Tutorials zu Microsoft 365 Copilot
- **🤖 AI Content Generator**: Automatische Generierung von Wissensseiten aus Transkripten (OpenAI GPT-4)
- **📝 Editorial System**: Automatisches Publishing jeden Dienstag um 9:00 Uhr
- **🎨 Modern Design**: React + TypeScript + Tailwind CSS + shadcn/ui
- **⚡ Performance**: < 2.5s Ladezeit, optimiert für AI Answer Engines
- **🔍 SEO**: Schema.org Markup, Meta-Tags, E-E-A-T optimiert

## 🤖 AI Content Generator

**NEU**: Automatische Generierung von hochwertigen Wissensseiten aus YouTube-Transkripten!

### Quick Start

```bash
# 1. Setup (einmalig)
cp .env.example .env.local
# Füge deinen OpenAI API Key in .env.local ein

# 2. Interaktiver Modus
npm run generate:interactive

# 3. Oder: Direkt mit Datei
npm run generate transcripts/mein-video.txt

# 4. Kosten-Statistiken anzeigen
npm run cost:stats
```

**Features:**
- 🎯 Nicht-generische, authentische Texte
- 📊 Dual Schema.org (Article + FAQPage)
- ⚡ 30-60 Sekunden pro Seite
- 💰 ~$0.06 pro Seite
- 🔒 **Kill-Switch bei 3 EUR/Tag** (Schutz vor Schleifen)
- ✅ Publishing-ready

[**Vollständige Dokumentation →**](scripts/CONTENT_GENERATOR_README.md) | [**Security →**](SECURITY.md)

## Project info

**URL**: https://lovable.dev/projects/4ad80b48-7c7b-4c09-9065-ed0f93e58f0c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4ad80b48-7c7b-4c09-9065-ed0f93e58f0c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4ad80b48-7c7b-4c09-9065-ed0f93e58f0c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
