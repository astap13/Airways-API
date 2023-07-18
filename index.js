import express from 'express';
import bodyParser from 'body-parser';
import { getPlain, addPlain } from './src/plain.js';

const app = express();
const PORT = 3333;

app.use(bodyParser.json());

app.get('/plain', getPlain);
app.post('/plain', addPlain);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
