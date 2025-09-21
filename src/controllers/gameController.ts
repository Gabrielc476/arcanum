import { Request, Response } from 'express';
import { GameService } from '../services/gameService';

export class GameController {
  private gameService = new GameService();

  /**
   * Obtém o estado atual do jogo para o jogador autenticado.
   * (Esta função permanece a mesma)
   */
  getGameState = async (req: Request, res: Response) => {
    try {
      const playerId = req.player!.id;
      const updatedPlayerState = await this.gameService.updatePlayerState(playerId);
      const { password, ...playerToReturn } = updatedPlayerState;
      res.status(200).json(playerToReturn);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(404).json({ message: errorMessage });
    }
  };

  /**
   * Lida com a requisição de upgrade do Núcleo de Mana.
   */
  upgradeManaCore = async (req: Request, res: Response) => {
    try {
      const playerId = req.player!.id;
      const updatedPlayer = await this.gameService.upgradeManaCore(playerId);
      const { password, ...playerToReturn } = updatedPlayer;
      res.status(200).json(playerToReturn);
    } catch (error) {
      const errorMessage = (error as Error).message;
      // 400 Bad Request é mais apropriado para uma falha de upgrade
      res.status(400).json({ message: errorMessage });
    }
  };

  /**
   * Lida com a requisição de upgrade da Pureza Corporal.
   */
  upgradeBodyPurity = async (req: Request, res: Response) => {
    try {
      const playerId = req.player!.id;
      const updatedPlayer = await this.gameService.upgradeBodyPurity(playerId);
      const { password, ...playerToReturn } = updatedPlayer;
      res.status(200).json(playerToReturn);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(400).json({ message: errorMessage });
    }
  };
}

