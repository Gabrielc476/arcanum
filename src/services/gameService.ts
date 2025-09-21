import { AppDataSource } from '../database/dataSource';
import { Player } from '../database/entities/Player';
import { manaCoreTiers, bodyPurityTiers } from '../config/gameData';
import { BodyPurity } from '../models/enums';

export class GameService {
  private playerRepository = AppDataSource.getRepository(Player);

  /**
   * Atualiza os recursos de um jogador com base no tempo offline.
   * (Esta função permanece a mesma)
   */
  async updatePlayerState(playerId: string): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ id: playerId });

    if (!player) {
      throw new Error('Jogador não encontrado.');
    }

    const now = new Date();
    const lastUpdate = player.lastUpdate;
    const elapsedSeconds = (now.getTime() - lastUpdate.getTime()) / 1000;

    if (elapsedSeconds < 1) {
      return player;
    }

    player.mana_current = Math.min(
      player.mana_max,
      player.mana_current + elapsedSeconds * player.mana_perSecond
    );

    player.researchPoints_current = Math.min(
      player.researchPoints_max,
      player.researchPoints_current + elapsedSeconds * player.researchPoints_perSecond
    );

    player.lastUpdate = now;

    return this.playerRepository.save(player);
  }

  /**
   * Realiza o upgrade do Núcleo de Mana do jogador.
   */
  async upgradeManaCore(playerId: string): Promise<Player> {
    const player = await this.updatePlayerState(playerId);

    const currentTierData = manaCoreTiers[player.cultivation_manaCoreColor];
    const nextTier = currentTierData.nextTier;

    if (!nextTier) {
      throw new Error('Já atingiu o nível máximo do Núcleo de Mana.');
    }

    const upgradeData = manaCoreTiers[nextTier];
    const cost = upgradeData.cost.mana || 0;

    if (player.cultivation_bodyPurity !== upgradeData.requiredBodyPurity) {
      throw new Error(`Pureza Corporal necessária: ${upgradeData.requiredBodyPurity}.`);
    }

    if (player.mana_current < cost) {
      throw new Error('Mana insuficiente para o upgrade.');
    }

    // Aplica o upgrade
    player.mana_current -= cost;
    player.cultivation_manaCoreColor = nextTier;
    player.mana_perSecond = upgradeData.benefits.mana_perSecond;
    player.mana_max = upgradeData.benefits.mana_max;

    return this.playerRepository.save(player);
  }

  /**
   * Realiza o upgrade da Pureza Corporal do jogador.
   */
  async upgradeBodyPurity(playerId: string): Promise<Player> {
    const player = await this.updatePlayerState(playerId);

    const currentTierData = bodyPurityTiers[player.cultivation_bodyPurity];
    const nextTier = currentTierData.nextTier;

    if (!nextTier) {
      throw new Error('Já atingiu o nível máximo de Pureza Corporal.');
    }

    const upgradeData = bodyPurityTiers[nextTier];
    const cost = upgradeData.cost.mana || 0;

    if (player.mana_current < cost) {
      throw new Error('Mana insuficiente para o upgrade.');
    }

    // Aplica o upgrade
    player.mana_current -= cost;
    player.cultivation_bodyPurity = nextTier;

    return this.playerRepository.save(player);
  }
}

