import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI não definido no arquivo .env');
  }

  try {
    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado do MongoDB');
});
