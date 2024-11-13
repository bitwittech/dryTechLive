// sitemapGenerator.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const fs = require('fs');
const path = require('path');

// Example function to fetch your URLs. Replace this with your own logic.
const fetchURLs = async () => {
  return  [
    { url: '/', changefreq: 'daily', priority: 0.6 },
    { url: '/about', changefreq: 'daily', priority: 1.0 },
    { url: '/listing', changefreq: 'daily', priority: 1.0 },
    { url: '/services', changefreq: 'daily', priority: 1.0 },
    { url: '/details', changefreq: 'daily', priority: 1.0 },
    { url: '/innovations', changefreq: 'daily', priority: 1.0 },
    { url: '/career', changefreq: 'daily', priority: 1.0 },
    { url: '/network', changefreq: 'daily', priority: 1.0 },
    { url: '/milestones', changefreq: 'daily', priority: 1.0 },
    { url: '/listing/Confectioneries', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/Beverage', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/Nutraceutical', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/Bakery', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/Dairy', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/Seasoning', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/Nutrition', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/Creamer', changefreq: 'daily', priority: 0.8 },
    { url: '/details/Caseinate', changefreq: 'daily', priority: 0.8 },
    { url: '/details/fruit-powder', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/gum-arabic', changefreq: 'daily', priority: 0.8 },
    { url: '/listing/natural-color', changefreq: 'daily', priority: 0.8 },
    { url: '/details/instant-fat-filled-powder', changefreq: 'daily', priority: 0.8 },
    { url: '/our-client', changefreq: 'daily', priority: 1.0 },
    { url: '/news', changefreq: 'daily', priority: 1.0 },
    { url: '/download', changefreq: 'daily', priority: 1.0 },
    { url: '/blog', changefreq: 'daily', priority: 1.0 },
    { url: '/contact', changefreq: 'daily', priority: 1.0 },
    { url: '/sustainability', changefreq: 'daily', priority: 1.0 },
    { url: '/appreciation-from-our-customer-speaks-more-than-our-actions', changefreq: 'daily', priority: 1.0 },
    { url: '/our-certification', changefreq: 'daily', priority: 1.0 }
  ]  
};

const GenerateSitemap = async () => {
  const smStream = new SitemapStream({ hostname: 'https://drytechindia.com/'});
  const pipeline = smStream.pipe(createGzip());

  // Fetch URLs and write to sitemap stream
  const urls = await fetchURLs();
  urls.forEach(url => {
    smStream.write(url);
  });

  // Close the stream
  smStream.end();

  // Convert stream to a Promise and write to file
  const sitemap = await streamToPromise(pipeline);
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml.gz'), sitemap);
};


module.exports = GenerateSitemap;