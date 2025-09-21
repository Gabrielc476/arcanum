import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Carrega as variáveis do arquivo .env para process.env
config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    
    // IMPORTANTE: Em produção, você deve desativar o synchronize e usar migrations.
    // Durante o desenvolvimento, pode ser útil mantê-lo como true para criar as tabelas automaticamente.
    synchronize: true, 
    logging: true, // Mostra as queries SQL no console, útil para debug.

    // Caminho para suas entidades. O TypeORM irá procurar por arquivos .ts aqui.
    entities: [__dirname + '/entities/**/*.ts'],

    // Caminho para suas migrations.
    migrations: [__dirname + '/migrations/**/*.ts'],
});
