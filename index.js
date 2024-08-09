const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.send('Server health is fine');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
