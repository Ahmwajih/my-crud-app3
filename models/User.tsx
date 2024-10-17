// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define TypeScript interface for User
export interface IUser extends Document {
  username: string;
  password: string; // Hashed password
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
