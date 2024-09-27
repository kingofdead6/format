const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
