import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongoose from 'mongoose';
import { UserInput } from './interfaces/User.js';
import { soma } from './utils/soma.js';
import { sub } from './utils/sub.js';
import { connectDB } from './config/database.js';
import { UserModel } from './models/User.js';

const app = Fastify({ logger: true });

function formatUser(user: { _id: mongoose.Types.ObjectId; nome: string; senha: string }) {
  return {
    id: user._id.toString(),
    nome: user.nome,
    senha: user.senha,
  };
}

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
});

app.get('/health', async () => {
  return { status: 'ok' };
});

app.get('/api/users', async () => {
  const num = soma(2, 3);
  const subt = sub(5, 2);
  const users = await UserModel.find();
  return users.map(formatUser);
});

app.post('/api/users', async (request, reply) => {
  const { nome, senha } = request.body as UserInput;

  if (!nome || !senha) {
    return reply.status(400).send({ error: 'Nome e senha são obrigatórios' });
  }

  const newUser = await UserModel.create({ nome, senha });
  return reply.status(201).send(formatUser(newUser));
});

app.delete('/api/users/:id', async (request, reply) => {
  const { id } = request.params as { id: string };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return reply.status(400).send({ error: 'ID de usuário inválido' });
  }

  const deleted = await UserModel.findByIdAndDelete(id);

  if (!deleted) {
    return reply.status(404).send({ error: 'Usuário não encontrado' });
  }

  return reply.status(200).send(formatUser(deleted));
});

async function start() {
  await connectDB();

  const port = Number(process.env.PORT) || 3000;

  app.listen({ host: '0.0.0.0', port }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Servidor rodando em ${address}`);
  });
}

start();
