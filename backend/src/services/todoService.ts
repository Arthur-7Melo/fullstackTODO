import { Types } from "mongoose";
import { CreateTodoInput, UpdateTodoInput } from "../db/schemas/todoSchema";
import { ITodo, Todo } from "../models/Todo";
import { NotFoundError } from "../utils/errors/customErrors";

export const createTodo = async (data: CreateTodoInput, userId: Types.ObjectId): Promise<ITodo> => {
  const todo = await Todo.create({
    title: data.title,
    description: data.description,
    priority: data.priority,
    user: userId
  });

  return todo;
}

export const getTodos = async (userId: Types.ObjectId, priority?: string): Promise<ITodo[]> => {
  const filter: Record<string, any> = { user: userId };

  if (priority) {
    filter.priority = priority
  };

  const todos = await Todo.find(filter).sort({ createdAt: -1 });
  return todos;
}

export const updateTodo = async (userId: Types.ObjectId, todoId: string, data: UpdateTodoInput): Promise<ITodo> => {
  const toSet: Partial<UpdateTodoInput> = {};
  if (data.title !== undefined) toSet.title = data.title;
  if (data.description !== undefined) toSet.description = data.description;
  if (data.priority !== undefined) toSet.priority = data.priority;

  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, user: userId },
    { $set: toSet },
    { new: true, runValidators: true })

  return todo!;
}

export const deleteTodo = async (userId: Types.ObjectId, todoId: string): Promise<ITodo> => {
  const deletedTodo = await Todo.findOneAndDelete(
    { _id: todoId, user: userId }
  )

  return deletedTodo!;
}