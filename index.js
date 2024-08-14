const express = require('express');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const globalError = require('./src/utils/globalError');
const routes = require('./src/routes/v1');
const logger = require('./src/middleware/logger');

app.use('/public', express.static('public'));
app.use(
  cors({
    origin: ['https://healthifyrx.vercel.app', 'http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(logger);
app.use(routes);
app.use(globalError);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server health is fine' });
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = app;
