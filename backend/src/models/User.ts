import mongoose, { Schema, Document} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

export const User = mongoose.model<IUser>('User', UserSchema);