import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware para verificar a validade de um token JWT.
 * Se o token for válido, anexa os dados do jogador (`payload`) ao objeto `req`.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Pega o cabeçalho de autorização da requisição
    const authHeader = req.headers.authorization;

    // 1. Verifica se o cabeçalho existe
    if (!authHeader) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }

    // 2. Divide o cabeçalho para separar o "Bearer" do token
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token malformatado.' });
    }

    const token = parts[1];

    // 3. Verifica se o token é válido
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // Anexa o payload decodificado (que contém o ID do jogador) ao objeto request
        req.player = decoded as { id: string };

        // Continua para a próxima rota/middleware
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};
