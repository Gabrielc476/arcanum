import { Request, Response } from 'express';
import { PlayerService } from '../services/playerService';

export class PlayerController {
    private playerService = new PlayerService();

    register = async (req: Request, res: Response) => {
        // ... (lógica do controller de registro permanece a mesma)
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
            }

            const newPlayer = await this.playerService.register({ name, email, password });
            res.status(201).json(newPlayer);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(409).json({ message: errorMessage });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
            }

            // A resposta agora inclui o jogador e o token
            const result = await this.playerService.login({ email, password });
            res.status(200).json(result);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(401).json({ message: errorMessage });
        }
    };
}

