const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Load data from JSON file
const sampleItems = JSON.parse(
  fs.readFileSync('./data/items.json', 'utf8')
);

// Serve static files
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Week 7 Tailwind App');
});

// Gallery route
app.get('/gallery', (req, res) => {
  const cards = sampleItems.map(item => `
    <div class="bg-white rounded-lg shadow-lg p-6 mb-4 max-w-md mx-auto">
      <h2 class="text-xl font-bold text-indigo-800">${item.title}</h2>
      <p class="mt-2 text-gray-600">${item.note}</p>
    </div>
  `).join('');

  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gallery</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body class="min-h-screen bg-gray-100 py-8">

  <h1 class="text-4xl font-bold text-center text-indigo-800 mb-8">
    Gallery
  </h1>

  ${cards}

</body>
</html>`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body class="min-h-screen flex items-center justify-center bg-gray-100">

  <div class="text-center">
    <h1 class="text-4xl font-bold text-red-700">404</h1>
    <p class="mt-2 text-gray-600">
      That page doesn't exist.
    </p>
    <a href="/gallery" class="mt-4 inline-block text-blue-600 underline">
      Back to the gallery
    </a>
  </div>

</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});