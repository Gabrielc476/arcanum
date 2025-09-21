import 'reflect-metadata'; // DEVE ser o primeiro import
import app from './app';
import { AppDataSource } from './database/dataSource';

const PORT = process.env.PORT || 3333;

async function startServer() {
    try {
        // Inicializa a conexão com o banco de dados
        await AppDataSource.initialize();
        console.log('✅ Database connection established successfully.');

        // Inicia o servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to initialize the database connection.');
        console.error(error);
    }
}

startServer();
