import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { Todo } from "../models/Todo";
import { NotFoundError, UnathourizedError } from "../utils/errors/customErrors";

export const authorizeTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.id;
    const userId = (req as any).user._id as Types.ObjectId;

    if (!Types.ObjectId.isValid(todoId)) {
      throw new NotFoundError("Todo não encontrado")
    };

    const todo = await Todo.findById(todoId);
    if (!todo) {
      throw new NotFoundError("Todo não encontrado")
    };

    if (!todo.user.equals(userId)) {
      throw new UnathourizedError("Você não tem permissão para alterar esse todo")
    };

    (req as any).todo = todo;
    next();
  } catch (error) {
    next(error);
  }
}