const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const { testConnection } = require('./database/pg');
require('dotenv').config();


const app = express()
const port = process.env.PORT || 3000

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  testConnection();
})

module.exports = app;