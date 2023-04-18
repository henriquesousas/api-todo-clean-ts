import './main/config/module-alias';

import express, { Request, Response } from 'express';

const app = express();
const port = 5050;

app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'OK' });
});

app.post('/user', (req: Request, res: Response) => {
  res.status(201).json({ message: req.body.name });
});

app.listen(port, () => {
  console.log(`App running in port ${port}`);
});
