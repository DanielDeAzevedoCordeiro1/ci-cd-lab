import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  senha: string;
}

const UserSchema = new Schema<IUser>(
  {
    nome: { type: String, required: true },
    senha: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
