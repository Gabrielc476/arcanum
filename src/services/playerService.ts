import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Importa a biblioteca JWT
import { AppDataSource } from '../database/dataSource';
import { Player } from '../database/entities/Player';

export class PlayerService {
    private playerRepository = AppDataSource.getRepository(Player);

    async register(data: Pick<Player, 'name' | 'email' | 'password'>): Promise<Omit<Player, 'password'>> {
        // ... (lógica de registro permanece a mesma)
        const { name, email, password } = data;

        const existingPlayer = await this.playerRepository.findOne({ where: [{ name }, { email }] });
        if (existingPlayer) {
            throw new Error('Nome de usuário ou email já cadastrado.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPlayer = this.playerRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await this.playerRepository.save(newPlayer);

        const { password: _, ...playerToReturn } = newPlayer;
        return playerToReturn;
    }

    /**
     * Realiza o login e retorna os dados do jogador junto com um token JWT.
     */
    async login(data: Pick<Player, 'email' | 'password'>): Promise<{ player: Omit<Player, 'password'>, token: string }> {
        const { email, password } = data;
        const player = await this.playerRepository.findOneBy({ email });

        if (!player) {
            throw new Error('Email ou senha inválidos.');
        }

        const isPasswordMatching = await bcrypt.compare(password, player.password);

        if (!isPasswordMatching) {
            throw new Error('Email ou senha inválidos.');
        }

        // Gera o token JWT
        const tokenPayload = { id: player.id };
        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign(tokenPayload, secret, { expiresIn: '1d' }); // Token expira em 1 dia

        const { password: _, ...playerToReturn } = player;
        
        // Retorna o jogador e o token
        return { player: playerToReturn, token };
    }
}

