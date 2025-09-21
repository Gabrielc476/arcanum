// Este arquivo estende a interface Request do Express para adicionar
// a propriedade `player`, evitando erros de TypeScript no authMiddleware.
export {};

declare global {
  namespace Express {
    export interface Request {
      player?: {
        id: string;
      };
    }
  }
}
