import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';

export const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('[Router] - Server is running');
});

// set up routes
app.use(router);

app.listen(port, () => {
  console.log(
    `[App] - 🚀 Express server listening on http://127.0.0.1:${port}`
  );
});
