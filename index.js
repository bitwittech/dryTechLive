const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle any request and serve 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});
