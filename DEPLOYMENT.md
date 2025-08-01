# OnlineShop AI - Deployment Guide

## Overview
This guide covers deploying OnlineShop AI with:
- **Frontend**: Vercel (React/Vite)
- **Backend**: Heroku (Node.js/Express with Puppeteer)

## Prerequisites
- Node.js 18+ 
- Git
- Heroku CLI
- Vercel CLI (optional)

## Backend Deployment (Heroku)

### 1. Prepare Backend
```bash
cd server
npm install
npm run build
```

### 2. Create Heroku App
```bash
heroku create onlineshop-ai-backend
heroku config:set NODE_ENV=production
heroku config:set PORT=8080
```

### 3. Configure Puppeteer for Heroku
Add Heroku buildpacks:
```bash
heroku buildpacks:add jontewks/puppeteer
heroku buildpacks:add heroku/nodejs
```

### 4. Deploy Backend
```bash
git add .
git commit -m "Deploy backend"
git push heroku main
```

### 5. Environment Variables
```bash
heroku config:set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
heroku config:set PUPPETEER_EXECUTABLE_PATH=/app/.chrome-for-testing/chrome-linux64/chrome
```

## Frontend Deployment (Vercel)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Configure Environment
Create `.env.production`:
```
VITE_API_URL=https://your-heroku-backend.herokuapp.com
VITE_ADSENSE_CLIENT=ca-pub-YOUR_PUBLISHER_ID
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

### 4. Configure Custom Domain (Optional)
```bash
vercel domains add yourdomain.com
```

## Google AdSense Setup

### 1. Get AdSense Account
- Apply at https://adsense.google.com
- Wait for approval (1-14 days)

### 2. Update AdSense Code
In `client/components/AdSenseBanner.tsx`:
```typescript
data-ad-client="ca-pub-YOUR_ACTUAL_PUBLISHER_ID"
```

### 3. Add AdSense Script to HTML
In `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```

## Real-Time Price Scraping

### Important Legal Considerations
1. **Review Terms of Service**: Check retailer ToS before scraping
2. **Rate Limiting**: Implement delays between requests
3. **User-Agent**: Use proper user agents
4. **IP Rotation**: Consider proxy services for scale

### Compliance Best Practices
```typescript
// Example rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Add delays between requests
await delay(2000); // 2 second delay
```

## Production Optimizations

### 1. Caching Strategy
```typescript
// Redis caching for price data
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

// Cache prices for 30 minutes
await client.setex(cacheKey, 1800, JSON.stringify(prices));
```

### 2. Error Handling
```typescript
// Retry logic for failed scrapes
const retryWithBackoff = async (fn: Function, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
};
```

### 3. Monitoring
```typescript
// Add monitoring with services like:
// - Sentry for error tracking
// - New Relic for performance
// - LogRocket for user sessions
```

## Environment Variables

### Backend (Heroku)
```
NODE_ENV=production
PORT=8080
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/app/.chrome-for-testing/chrome-linux64/chrome
REDIS_URL=redis://...
SENTRY_DSN=https://...
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.herokuapp.com
VITE_ADSENSE_CLIENT=ca-pub-YOUR_ID
VITE_SENTRY_DSN=https://...
```

## API Endpoints

### Price Scraping
```
GET /api/scrape-prices?product=iPhone%2016%20Pro
POST /api/bulk-scrape (with products array)
POST /api/price-monitoring (for price alerts)
```

### Search & Products
```
GET /api/search?q=iPhone
GET /api/trending?category=smartphones
GET /api/products
```

## Monitoring & Analytics

### 1. Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Performance Monitoring
```typescript
// Core Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Security Best Practices

### 1. Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 2. CORS Configuration
```typescript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
```

## Scaling Considerations

### 1. Database Integration
- Add PostgreSQL for price history
- Implement user accounts and favorites
- Store price alerts and notifications

### 2. Queue System
- Use Bull/Agenda for background jobs
- Queue price scraping tasks
- Process price monitoring checks

### 3. Microservices
- Separate scraping service
- Notification service
- Analytics service

## Support & Maintenance

### 1. Error Tracking
- Set up Sentry for error monitoring
- Configure alerting for API failures
- Monitor scraping success rates

### 2. Performance Optimization
- Implement CDN for static assets
- Optimize images and bundling
- Monitor Core Web Vitals

### 3. SEO Optimization
- Add meta tags for products
- Implement structured data
- Create XML sitemaps

## Troubleshooting

### Common Issues
1. **Puppeteer crashes on Heroku**: Check buildpack configuration
2. **AdSense not showing**: Verify publisher ID and approval status
3. **CORS errors**: Check domain whitelist in backend
4. **Rate limiting**: Implement proper delays in scraping

### Debug Commands
```bash
# Check Heroku logs
heroku logs --tail -a your-app-name

# Test local backend
npm run dev

# Test Vercel deployment
vercel dev
```
