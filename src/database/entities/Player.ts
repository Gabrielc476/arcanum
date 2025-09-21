import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn, // Importe o CreateDateColumn
} from 'typeorm';
import { ManaCoreColor, BodyPurity } from '../../models/enums';
import { KnownSpell } from './KnownSpell';
import { ExpeditionReport } from './ExpeditionReport';

@Entity({ name: 'players' })
export class Player {
  // ... (propriedades existentes: id, name, email, password, etc.)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // --- RECURSOS ---
  @Column({ type: 'float', name: 'mana_current', default: 10.0 })
  mana_current!: number;

  @Column({ type: 'float', name: 'mana_max', default: 100.0 })
  mana_max!: number;

  @Column({ type: 'float', name: 'mana_per_second', default: 1.0 })
  mana_perSecond!: number;

  @Column({ type: 'float', name: 'research_points_current', default: 0.0 })
  researchPoints_current!: number;

  @Column({ type: 'float', name: 'research_points_max', default: 50.0 })
  researchPoints_max!: number;

  @Column({ type: 'float', name: 'research_points_per_second', default: 0.5 })
  researchPoints_perSecond!: number;

  @Column({ type: 'float', name: 'cognitive_stamina_current', default: 10.0 })
  cognitiveStamina_current!: number;

  @Column({ type: 'float', name: 'cognitive_stamina_max', default: 10.0 })
  cognitiveStamina_max!: number;

  // --- CULTIVO (CORPO) ---
  @Column({
    type: 'enum',
    enum: ManaCoreColor,
    name: 'cultivation_mana_core_color',
    default: ManaCoreColor.Red,
  })
  cultivation_manaCoreColor!: ManaCoreColor;

  @Column({
    type: 'enum',
    enum: BodyPurity,
    name: 'cultivation_body_purity',
    default: BodyPurity.Basic,
  })
  cultivation_bodyPurity!: BodyPurity;

  // --- ESTUDO (MENTE) ---
  @Column({ name: 'mind_character_level', default: 1 })
  mind_characterLevel!: number;

  @Column({ name: 'mind_arcanist_level', default: 1 })
  mind_arcanistLevel!: number;

  @Column({ type: 'float', name: 'mind_logical_engine_efficiency', default: 1.0 })
  mind_logicalEngineEfficiency!: number;

  // --- INVENTÁRIO ---
  @Column({ type: 'float', default: 0.0 })
  gold!: number;

  @Column({ type: 'jsonb', default: {} })
  materials!: Record<string, number>;

  // --- RELAÇÕES ---
  @OneToMany(() => KnownSpell, (spell) => spell.player, { cascade: true })
  knownSpells!: KnownSpell[];

  @OneToMany(() => ExpeditionReport, (report) => report.player, { cascade: true })
  expeditionHistory!: ExpeditionReport[];

  // --- NOVA COLUNA ---
  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate!: Date;
}

