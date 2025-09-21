import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Player } from './Player';

@Entity('expedition_reports')
export class ExpeditionReport {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    expeditionId!: string;

    @Column()
    wasSuccessful!: boolean;

    @Column('text', { array: true })
    log!: string[];

    @Column('jsonb')
    rewardsGained!: {
        gold: number;
        rareMaterials: string[];
    };
    
    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => Player, (player) => player.expeditionHistory)
    player!: Player;
}

