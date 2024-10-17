const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { sendEmail } = require('./mail/sendMail');
const PORT = process.env.PORT || 8080;
const cors = require('cors')

app.use(cors());


// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));
// Middleware
app.use(bodyParser.json()); // To parse JSON request bodies

app.post("/sendMail",sendEmail)

// Handle any request and serve 'index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});
