// --- ENUMS ---
// Usados para padronizar valores específicos em todo o jogo.

export enum ManaCoreColor {
  Red = 'Vermelho',
  Orange = 'Laranja',
  Yellow = 'Amarelo',
  Cyan = 'Ciano',
  Blue = 'Azul',
  Violet = 'Violeta',
  White = 'Branco',
}

export enum BodyPurity {
  Basic = 'Básica',
  Refined = 'Refinada',
  Strengthened = 'Fortalecida',
  Pure = 'Pura',
  Transcendental = 'Transcendental',
}

export enum Element {
  Fire = 'Fogo',
  Water = 'Água',
  Air = 'Ar',
  Earth = 'Terra',
  Light = 'Luz',
  Darkness = 'Escuridão',
}

export enum School {
  Abjuration = 'Abjuração',
  Conjuration = 'Conjuração',
  Divination = 'Adivinhação',
  Enchantment = 'Encantamento',
  Evocation = 'Evocação',
  Illusion = 'Ilusão',
  Necromancy = 'Necromancia',
  Transmutation = 'Transmutação',
}

// --- INTERFACES DE DADOS ---

export interface KnownSpell {
  id: string;
  spellModelId: string;
  name: string;
  element: Element;
  school: School;
  masteryLevel: number;
  power: number;
  isPrepared: boolean;
}

export interface ExpeditionReport {
  id: string;
  expeditionId: string;
  wasSuccessful: boolean;
  log: string[];
  rewardsGained: {
    gold: number;
    rareMaterials: string[];
  };
  createdAt: string; // A data virá como string no JSON
}

/**
 * A interface principal que representa o estado completo do jogador.
 * Corresponde aos dados retornados pelo endpoint GET /api/game/state.
 */
export interface Player {
  id: string;
  name: string;
  email: string;

  // Recursos
  mana_current: number;
  mana_max: number;
  mana_perSecond: number;
  researchPoints_current: number;
  researchPoints_max: number;
  researchPoints_perSecond: number;
  cognitiveStamina_current: number;
  cognitiveStamina_max: number;

  // Cultivo (Corpo)
  cultivation_manaCoreColor: ManaCoreColor;
  cultivation_bodyPurity: BodyPurity;

  // Estudo (Mente)
  mind_characterLevel: number;
  mind_arcanistLevel: number;
  mind_logicalEngineEfficiency: number;

  // Inventário
  gold: number;
  materials: Record<string, number>;

  // Relações
  knownSpells: KnownSpell[];
  expeditionHistory: ExpeditionReport[];

  // Metadados
  lastUpdate: string; // A data virá como string no JSON
}
