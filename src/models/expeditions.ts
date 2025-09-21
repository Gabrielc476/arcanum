/**
 * Representa uma expedição disponível para o jogador.
 */
export interface Expedition {
    id: string;
    name: string;
    description: string;
    recommendedPower: number;
    rewards: {
        gold: number;
        rareMaterials: string[]; // IDs de materiais raros
    };
}

/**
 * Um registro do que aconteceu em uma expedição automatizada.
 */
export interface ExpeditionReport {
    expeditionId: string;
    wasSuccessful: boolean;
    log: string[]; // Ex: ["Você encontrou um goblin.", "Sua Bola de Fogo o desintegrou."]
    rewardsGained: Expedition['rewards'];
}
