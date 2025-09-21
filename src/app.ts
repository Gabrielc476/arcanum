import express from 'express';
import 'dotenv/config';
import cors from 'cors'; // 1. Importe o pacote cors
import router from './routes';

const app = express();

// 2. Use o middleware cors
// Isto irá adicionar os cabeçalhos necessários para permitir pedidos do seu frontend
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Arcanum Academia API is running!' });
});

app.use('/api', router);

export default app;