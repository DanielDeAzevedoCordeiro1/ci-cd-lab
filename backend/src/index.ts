import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

interface User {
  id: string;
  nome: string;
  senha: string;
}

const users: User[] = [];

function createServer(): FastifyInstance {
  const app = Fastify({ logger: true });

  app.get('/users', async () => {
    return users;
  });

  app.post<{ Body: Omit<User, 'id'> }>('/users', async (request, reply) => {
    const { nome, senha } = request.body;

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

  app.delete<{ Params: { id: string } }>('/users/:id', async (request, reply) => {
    const { id } = request.params;
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }

    const deleted = users.splice(index, 1);
    return reply.status(200).send(deleted[0]);
  });

  return app;
}

const app = createServer();
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
});

const start = async () => {
  try {
    await app.listen({ port: 3000 , host: "0.0.0.0"});
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};


start();
