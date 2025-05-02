import { IUser, User } from "../../models/User";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date
};

export function toUserResponse(user: IUser) : UserResponse {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
};