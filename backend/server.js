import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { noteRouter } from './routes/noteRoutes.js';
import { sequelize } from './config/database.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/notes', noteRouter);

app.all('*', (req, res) => {

  res.status(404)

  if (req.accepts('json')) {
    res.json({ message: 'Route not found'});
  } else {
    res.type('text').send('Route not found');
  }
  
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

try {

  setInterval(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

  }, 1500)

  console.log('Postgres database connected');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

