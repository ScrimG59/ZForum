const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('../routes/userroutes');

// setting up the port of api
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`App live at http://localhost:${port}`);
});