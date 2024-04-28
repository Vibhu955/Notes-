const db = require("./db");
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3005

app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.use('/api/users',require('./routes/users'))

app.listen(port, () => {
  console.log(`My app listening on port ${port} at http://localhost:${port}`);
})