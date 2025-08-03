import * as dotenv from 'dotenv';
import express, { type Request, type Response, json } from 'express';
import { ReportsController } from './service/reports.controller';
import { config, validateEnvVars } from './core/infrastructure/config';
import cors from 'cors';
import errorHandler from './middlewares';
require('express-async-errors');

dotenv.config();

validateEnvVars();

const port = config.BFF_DASHBOARD_PORT; // Porta do serviço
const frontendUrl = config.FRONTEND_URL; // URL do frontend permitida para CORS

const reportsController = new ReportsController();

// Configuração do CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express(); // Cria uma aplicação Express
app.disable('x-powered-by'); // Desativa o cabeçalho 'x-powered-by' por segurança
app.use(json()); // Middleware para parsear JSON
app.use(cors(corsOptions)); // Middleware para habilitar CORS

// Rota para obter relatórios por tipo de relatório
app.get('/reports', async (req: Request, res: Response) => {
  return await reportsController.getReportByType(req, res);
});

// Rota de verificação de saúde do serviço
app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
});

app.use(errorHandler); // Middleware para tratamento de erros

// Inicializa o servidor na porta configurada
app.listen(port, () => {
  console.log(`Servidor está executando na porta: ${port}`);
});
