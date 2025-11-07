# Deployment Guide - copilotenschule.de

This guide covers multiple deployment options for the copilotenschule.de website.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment Options](#deployment-options)
  - [1. Vercel Deployment (Recommended)](#1-vercel-deployment-recommended)
  - [2. Netlify Deployment](#2-netlify-deployment)
  - [3. Docker Deployment](#3-docker-deployment)
  - [4. Manual Deployment](#4-manual-deployment)
- [Environment Configuration](#environment-configuration)
- [Domain Configuration](#domain-configuration)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+ and npm installed
- Git installed and configured
- Access to the GitHub repository
- Domain registrar access (for copilotenschule.de)

## Deployment Options

### 1. Vercel Deployment (Recommended)

Vercel provides the easiest deployment experience for Vite applications.

#### Steps:

1. **Install Vercel CLI** (optional, for CLI deployment):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   # Follow the prompts
   # For production:
   vercel --prod
   ```

4. **Configure Custom Domain**:
   - In Vercel Dashboard → Project Settings → Domains
   - Add `copilotenschule.de` and `www.copilotenschule.de`
   - Update DNS records as instructed by Vercel

#### Configuration

The `vercel.json` file is pre-configured with:
- SPA routing (all routes redirect to index.html)
- Security headers
- Cache headers for static assets

### 2. Netlify Deployment

Netlify is another excellent option for static site hosting.

#### Steps:

1. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `18`
   - Click "Deploy site"

3. **Deploy via CLI**:
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

4. **Configure Custom Domain**:
   - In Netlify Dashboard → Domain Settings → Add custom domain
   - Add `copilotenschule.de`
   - Configure DNS as instructed

#### Configuration

The `netlify.toml` file is pre-configured with:
- Build settings
- SPA redirects
- Security headers
- Cache headers

### 3. Docker Deployment

For containerized deployment on your own infrastructure.

#### Prerequisites:
- Docker installed
- Docker Compose installed (optional)

#### Option A: Using Docker Compose (Recommended)

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

#### Option B: Using Docker directly

```bash
# Build image
docker build -t copilotenschule-web .

# Run container
docker run -d -p 80:80 --name copilotenschule copilotenschule-web

# View logs
docker logs -f copilotenschule

# Stop container
docker stop copilotenschule
docker rm copilotenschule
```

#### Deploy to Production Server

1. **Build and push to registry**:
   ```bash
   # Tag for your registry
   docker tag copilotenschule-web your-registry.com/copilotenschule-web:latest

   # Push to registry
   docker push your-registry.com/copilotenschule-web:latest
   ```

2. **On production server**:
   ```bash
   # Pull image
   docker pull your-registry.com/copilotenschule-web:latest

   # Run container
   docker run -d -p 80:80 --restart unless-stopped \
     --name copilotenschule \
     your-registry.com/copilotenschule-web:latest
   ```

#### With Reverse Proxy (Nginx/Caddy)

If you're using a reverse proxy:

```nginx
# Nginx configuration
server {
    listen 80;
    server_name copilotenschule.de www.copilotenschule.de;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Manual Deployment

For traditional web hosting (shared hosting, VPS, etc.).

#### Steps:

1. **Build the application**:
   ```bash
   npm install
   npm run build
   ```

2. **Upload files**:
   - Upload the contents of the `dist/` directory to your web server
   - Ensure files are in the web root directory (e.g., `/var/www/html`, `public_html`)

3. **Configure web server**:

   **For Apache** (.htaccess):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **For Nginx**:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## Environment Configuration

1. **Copy environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Configure variables**:
   Edit `.env` file with your specific values.

3. **Build with environment**:
   ```bash
   npm run build
   ```

Note: Vite exposes environment variables with the `VITE_` prefix to the client-side code.

## Domain Configuration

### DNS Records

Configure the following DNS records at your domain registrar:

#### For Vercel/Netlify:
```
Type    Name    Value
A       @       [Provider's IP or use CNAME]
CNAME   www     [Provider's domain]
```

#### For Custom Server:
```
Type    Name    Value
A       @       [Your server IP]
A       www     [Your server IP]
```

### SSL/TLS Certificates

- **Vercel/Netlify**: Automatic SSL certificates via Let's Encrypt
- **Docker/VPS**: Use Let's Encrypt with Certbot
  ```bash
  sudo certbot --nginx -d copilotenschule.de -d www.copilotenschule.de
  ```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Troubleshooting

### Build Failures

**Issue**: Build fails with memory errors
```bash
# Solution: Increase Node.js memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

**Issue**: Module not found errors
```bash
# Solution: Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

### Deployment Issues

**Issue**: 404 errors on page refresh
- **Solution**: Ensure SPA routing is configured (vercel.json, netlify.toml, or web server config)

**Issue**: Assets not loading
- **Solution**: Check `base` URL in vite.config.ts matches deployment path

**Issue**: Environment variables not working
- **Solution**: Ensure variables have `VITE_` prefix and rebuild application

### Performance Issues

**Issue**: Slow initial load
```bash
# Solution: Analyze bundle size
npm run build
npx vite-bundle-visualizer
```

**Issue**: Images loading slowly
- **Solution**: Optimize images before deployment
- Use WebP format
- Implement lazy loading

## Monitoring and Maintenance

### Performance Monitoring

- Use [Vercel Analytics](https://vercel.com/analytics) or [Netlify Analytics]
- Integrate Google Analytics (add to environment variables)
- Use [Lighthouse](https://developers.google.com/web/tools/lighthouse) for audits

### Regular Maintenance

1. **Update dependencies monthly**:
   ```bash
   npm outdated
   npm update
   ```

2. **Security audits**:
   ```bash
   npm audit
   npm audit fix
   ```

3. **Rebuild and redeploy** after updates

## Support

For issues or questions:
- Check project README
- Review Vite documentation: https://vitejs.dev
- Contact development team

---

Last updated: 2025-11-05
