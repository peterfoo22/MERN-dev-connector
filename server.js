//server file that works

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));

//testing