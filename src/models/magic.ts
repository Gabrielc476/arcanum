import { Element, School } from './enums';

/**
 * Representa o modelo teórico de um feitiço na Biblioteca Espiritual.
 * Este é o "plano" que precisa ser pesquisado antes de poder ser praticado.
 */
export interface SpellModel {
    id: string; // Ex: "EVOCATION_FIRE_1"
    name: string; // Ex: "Bola de Fogo"
    description: string;
    element: Element;
    school: School;
    researchCost: number; // Custo em Pontos de Pesquisa
    baseStaminaCost: number; // Custo base de Estamina Cognitiva para praticar
}

/**
 * Representa um feitiço que foi pesquisado e praticado pelo jogador.
 * Ele existe no grimório do jogador.
 */
export interface KnownSpell extends SpellModel {
    masteryLevel: number; // Nível de maestria aumenta com a prática
    power: number; // Poder de combate, calculado com base na maestria e outros fatores
    isPrepared: boolean; // Se está preparado para uma expedição
}
