import { Router } from 'express';
import { PlayerController } from '../controllers/playerController';

const playerRoutes = Router();
const playerController = new PlayerController();

// Define os endpoints e os associa aos métodos do controller.
playerRoutes.post('/register', playerController.register);
playerRoutes.post('/login', playerController.login);

export default playerRoutes;
