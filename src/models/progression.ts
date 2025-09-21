import { ManaCoreColor, BodyPurity } from './enums';

/**
 * O Caminho do Corpo: Foco no fortalecimento do receptáculo físico e do Núcleo de Mana.
 */
export interface CultivationProgress {
    manaCoreColor: ManaCoreColor;
    bodyPurity: BodyPurity;
}

/**
 * O Caminho da Mente: Foco no conhecimento, pesquisa e experiência prática.
 */
export interface MindProgress {
    characterLevel: number; // Nível de D&D, ganho em expedições
    arcanistLevel: number; // Nível de Arcanista, ganho com pesquisa e publicações
    logicalEngineEfficiency: number; // Multiplicador para a velocidade de pesquisa
}

/**
 * Uma habilidade única concedida por uma linhagem.
 */
export interface BloodlineAbility {
    id: string;
    name: string;
    description: string;
    isUnlocked: boolean;
    // Condições para desbloqueio, ex: { coreColor: "Ciano", arcanistLevel: 4 }
    unlockRequirements: Partial<{
        coreColor: ManaCoreColor;
        arcanistLevel: number;
        characterLevel: number;
    }>;
}

/**
 * O Caminho do Sangue: Foco no despertar de um potencial herdado.
 */
export interface BloodlineProgress {
    name: string; // Nome da Linhagem, ex: "Linhagem do Dragão Vermelho"
    abilities: BloodlineAbility[];
}
