const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { sendEmail } = require('./mail/sendMail');
const PORT = process.env.PORT || 8080;
const cors = require('cors')
var cron = require('node-cron');
const GenerateSitemap = require('./utils/SiteMap');
const sitemap_update = "0 0 * * *" // At 12:00 AM, every day

cron.schedule(sitemap_update, ()=>updateSiteMap());

app.use(cors());


// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));
// Middleware
app.use(bodyParser.json()); // To parse JSON request bodies

app.post("/sendMail",sendEmail)

// Serve the sitemap
app.get('/sitemap.xml.gz', (req, res) => {
    console.log('sitemap_update')
    const filePath = path.join(__dirname, '/utils/public', 'sitemap.xml.gz');
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');
    res.sendFile(filePath);
  });


// Handle any request and serve 'index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});


  // Schedule sitemap generation every day at midnight
function updateSiteMap () {
    GenerateSitemap()
      .then(() => console.log('Sitemap generated successfully'))
      .catch(console.error);
  };