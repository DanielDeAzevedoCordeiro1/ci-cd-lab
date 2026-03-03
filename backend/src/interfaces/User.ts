export interface User {
  id: string;
  nome: string;
  senha: string;
}

export interface UserInput extends Omit<User, 'id'> {}