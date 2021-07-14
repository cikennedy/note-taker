const express = require('express');

// Begin the app and state the port 
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Start server, console.log the port 
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));