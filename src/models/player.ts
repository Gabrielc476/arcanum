import { GameResource, CognitiveStamina } from './resources';
import { CultivationProgress, MindProgress, BloodlineProgress } from './progression';
import { SpellModel, KnownSpell } from './magic';
import { ExpeditionReport } from './expeditions';

/**
 * Agrega todos os outros tipos e representa o estado completo do jogo para um jogador.
 */
export interface Player {
    name: string;

    // Recursos Principais
    mana: GameResource; // Mana Bruta gerada pelo Núcleo
    researchPoints: GameResource; // Pontos de Pesquisa gerados pela Biblioteca Espiritual
    cognitiveStamina: CognitiveStamina; // Usado para praticar feitiços
    
    // Caminhos da Ascensão
    cultivation: CultivationProgress;
    mind: MindProgress;
    bloodline?: BloodlineProgress; // Opcional, nem todo mago tem uma linhagem

    // Magia
    spiritualLibrary: Record<string, SpellModel>; // Todos os modelos de feitiços que o jogador pode pesquisar
    knownSpells: Record<string, KnownSpell>; // Os feitiços que o jogador já praticou

    // Inventário e Expedições
    gold: number;
    materials: Record<string, number>; // Componentes materiais para feitiços ou cultivo
    expeditionHistory: ExpeditionReport[];
}
