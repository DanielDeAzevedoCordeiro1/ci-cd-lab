import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { User, UserInput } from './interfaces/User.js';
import { soma } from './utils/soma.js';


const app = Fastify({ logger: true });

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
});

const users: User[] = [];


app.get('/users', async () => {
  const num = soma(2, 3);
  return users;
});

app.post('/users', async (request, reply) => {
  const { nome, senha } = request.body as UserInput;

  if (!nome || !senha) {
    return reply.status(400).send({ error: 'Nome e senha são obrigatórios' });
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    nome,
    senha,
  };

  users.push(newUser);
  return reply.status(201).send(newUser);
});

app.delete('/users/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return reply.status(404).send({ error: 'Tem nada aqui nao' });
  }

  const deleted = users.splice(index, 1);
  return reply.status(200).send(deleted[0]);
});


app.listen({ host: "0.0.0.0", port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Servidor rodando em ${address}`);
});
