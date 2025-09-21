import { Router } from 'express';
import playerRoutes from './playerRoutes';
import gameRoutes from './gameRoutes'; // Importa as novas rotas

const router = Router();

router.use('/players', playerRoutes);
router.use('/game', gameRoutes); // Usa as rotas do jogo com o prefixo /game

export default router;

