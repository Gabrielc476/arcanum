/**
 * Interface genérica para os recursos principais do jogador que se regeneram com o tempo.
 */
export interface GameResource {
    current: number;
    max: number;
    perSecond: number;
}

/**
 * Representa a Estamina Cognitivo-Espiritual, gasta ao praticar feitiços.
 */
export interface CognitiveStamina {
    current: number;
    max: number;
}
