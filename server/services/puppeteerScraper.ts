// Puppeteer-based price scraping service
// Note: This is a demo structure. In production, ensure compliance with website terms of service

import puppeteer from 'puppeteer';

export interface ScrapedPrice {
  retailer: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  availability: string;
  url: string;
  lastUpdated: string;
}

export class PriceScraper {
  private browser: any = null;

  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    return this.browser;
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async scrapeAmazon(searchQuery: string): Promise<ScrapedPrice[]> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    try {
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      // Navigate to Amazon search
      const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      
      // Wait for results to load
      await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
      
      // Extract product data
      const products = await page.evaluate(() => {
        const results: any[] = [];
        const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');
        
        productElements.forEach((element, index) => {
          if (index >= 5) return; // Limit to 5 results
          
          const nameElement = element.querySelector('h2 a span');
          const priceElement = element.querySelector('.a-price-whole');
          const originalPriceElement = element.querySelector('.a-price.a-text-price .a-offscreen');
          const linkElement = element.querySelector('h2 a');
          
          if (nameElement && priceElement && linkElement) {
            results.push({
              name: nameElement.textContent?.trim(),
              price: priceElement.textContent?.trim(),
              originalPrice: originalPriceElement?.textContent?.trim(),
              url: 'https://amazon.in' + linkElement.getAttribute('href'),
              availability: 'In Stock' // Amazon usually shows availability separately
            });
          }
        });
        
        return results;
      });
      
      return products.map(product => ({
        retailer: 'Amazon',
        price: product.price || '0',
        originalPrice: product.originalPrice,
        discount: this.calculateDiscount(product.originalPrice, product.price),
        availability: product.availability,
        url: product.url,
        lastUpdated: new Date().toISOString()
      }));
      
    } catch (error) {
      console.error('Amazon scraping error:', error);
      return [];
    } finally {
      await page.close();
    }
  }

  async scrapeFlipkart(searchQuery: string): Promise<ScrapedPrice[]> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    try {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(searchQuery)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      
      // Wait for products to load
      await page.waitForSelector('[data-id]', { timeout: 10000 });
      
      const products = await page.evaluate(() => {
        const results: any[] = [];
        const productElements = document.querySelectorAll('[data-id]');
        
        productElements.forEach((element, index) => {
          if (index >= 5) return;
          
          const nameElement = element.querySelector('a[title]');
          const priceElement = element.querySelector('._30jeq3');
          const originalPriceElement = element.querySelector('._3I9_wc');
          const linkElement = element.querySelector('a[href]');
          
          if (nameElement && priceElement && linkElement) {
            results.push({
              name: nameElement.getAttribute('title'),
              price: priceElement.textContent?.replace('₹', '').trim(),
              originalPrice: originalPriceElement?.textContent?.replace('₹', '').trim(),
              url: 'https://flipkart.com' + linkElement.getAttribute('href'),
              availability: 'In Stock'
            });
          }
        });
        
        return results;
      });
      
      return products.map(product => ({
        retailer: 'Flipkart',
        price: product.price || '0',
        originalPrice: product.originalPrice,
        discount: this.calculateDiscount(product.originalPrice, product.price),
        availability: product.availability,
        url: product.url,
        lastUpdated: new Date().toISOString()
      }));
      
    } catch (error) {
      console.error('Flipkart scraping error:', error);
      return [];
    } finally {
      await page.close();
    }
  }

  private calculateDiscount(originalPrice?: string, currentPrice?: string): string | undefined {
    if (!originalPrice || !currentPrice) return undefined;
    
    const original = parseFloat(originalPrice.replace(/[^\d.]/g, ''));
    const current = parseFloat(currentPrice.replace(/[^\d.]/g, ''));
    
    if (original > current) {
      const discount = Math.round(((original - current) / original) * 100);
      return `${discount}% off`;
    }
    
    return undefined;
  }

  async scrapeProduct(productName: string): Promise<ScrapedPrice[]> {
    try {
      const [amazonPrices, flipkartPrices] = await Promise.all([
        this.scrapeAmazon(productName),
        this.scrapeFlipkart(productName)
      ]);
      
      return [...amazonPrices, ...flipkartPrices];
    } catch (error) {
      console.error('Product scraping error:', error);
      return [];
    }
  }
}

// Singleton instance
export const priceScraper = new PriceScraper();

// Cleanup on process exit
process.on('exit', () => {
  priceScraper.closeBrowser();
});
