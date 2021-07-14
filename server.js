// Use the express module and require the relevant route files
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Begin the app and state the port 
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start server, console.log the port 
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));