import { Router } from 'express';
import { GameController } from '../controllers/gameController';
import { authMiddleware } from '../middlewares/authMiddleware';

const gameRoutes = Router();
const gameController = new GameController();

// Rota para obter o estado do jogo
gameRoutes.get('/state', authMiddleware, gameController.getGameState);

// Novas rotas para upgrades
gameRoutes.post('/upgrade/manacore', authMiddleware, gameController.upgradeManaCore);
gameRoutes.post('/upgrade/bodypurity', authMiddleware, gameController.upgradeBodyPurity);

export default gameRoutes;

