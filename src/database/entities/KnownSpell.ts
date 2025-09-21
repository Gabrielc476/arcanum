import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from './Player';
import { Element, School } from '../../models/enums';

@Entity('known_spells')
export class KnownSpell {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    spellModelId!: string; // Ex: "EVOCATION_FIRE_1"

    @Column()
    name!: string;

    @Column({
        type: 'enum',
        enum: Element,
    })
    element!: Element;

    @Column({
        type: 'enum',
        enum: School,
    })
    school!: School;

    @Column({ default: 1 })
    masteryLevel!: number;

    @Column('float', { default: 10 })
    power!: number;

    @Column({ default: false })
    isPrepared!: boolean;

    @ManyToOne(() => Player, (player) => player.knownSpells)
    player!: Player;
}

