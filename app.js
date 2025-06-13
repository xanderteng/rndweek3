import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './src/routes/api.js';
import authRouter from './src/routes/auth.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', apiRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
