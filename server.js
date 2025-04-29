const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const heroRoutes = require('./routes/heroRoutes');
const app = express();

app.use(express.json());

// Use middlewares
app.use('/heroes', heroRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
