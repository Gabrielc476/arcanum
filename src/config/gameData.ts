import { ManaCoreColor, BodyPurity } from '../models/enums';

// --- ESTRUTURA DOS UPGRADES ---

interface UpgradeTier<T> {
  cost: {
    mana?: number;
    // Futuramente, poderíamos adicionar materiais: materials?: { [key: string]: number };
  };
  requiredBodyPurity?: BodyPurity; // Pré-requisito para o Núcleo de Mana
  benefits: {
    [key: string]: any; // Benefícios flexíveis
  };
  nextTier: T | null;
}

// --- DADOS DO NÚCLEO DE MANA (MANA CORE) ---

export const manaCoreTiers: Record<ManaCoreColor, UpgradeTier<ManaCoreColor>> = {
  [ManaCoreColor.Red]: {
    cost: { mana: 250 },
    requiredBodyPurity: BodyPurity.Basic,
    benefits: { mana_perSecond: 2.5, mana_max: 200 },
    nextTier: ManaCoreColor.Orange,
  },
  [ManaCoreColor.Orange]: {
    cost: { mana: 1500 },
    requiredBodyPurity: BodyPurity.Refined,
    benefits: { mana_perSecond: 10, mana_max: 1000 },
    nextTier: ManaCoreColor.Yellow,
  },
  [ManaCoreColor.Yellow]: {
    cost: { mana: 10000 },
    requiredBodyPurity: BodyPurity.Strengthened,
    benefits: { mana_perSecond: 50, mana_max: 7500 },
    nextTier: ManaCoreColor.Cyan,
  },
  // Adicionar os outros níveis (Ciano, Azul, etc.) aqui no futuro
  [ManaCoreColor.Cyan]: { cost: {}, benefits: {}, nextTier: null },
  [ManaCoreColor.Blue]: { cost: {}, benefits: {}, nextTier: null },
  [ManaCoreColor.Violet]: { cost: {}, benefits: {}, nextTier: null },
  [ManaCoreColor.White]: { cost: {}, benefits: {}, nextTier: null },
};

// --- DADOS DA PUREZA CORPORAL (BODY PURITY) ---

export const bodyPurityTiers: Record<BodyPurity, UpgradeTier<BodyPurity>> = {
  [BodyPurity.Basic]: {
    cost: { mana: 100 },
    benefits: {}, // Por agora, é apenas um pré-requisito
    nextTier: BodyPurity.Refined,
  },
  [BodyPurity.Refined]: {
    cost: { mana: 800 },
    benefits: {},
    nextTier: BodyPurity.Strengthened,
  },
  [BodyPurity.Strengthened]: {
    cost: { mana: 5000 },
    benefits: {},
    nextTier: BodyPurity.Pure,
  },
  // Adicionar os outros níveis aqui
  [BodyPurity.Pure]: { cost: {}, benefits: {}, nextTier: null },
  [BodyPurity.Transcendental]: { cost: {}, benefits: {}, nextTier: null },
};
