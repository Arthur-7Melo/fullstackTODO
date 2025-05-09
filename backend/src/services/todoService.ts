import { Types } from "mongoose";
import { CreateTodoInput } from "../db/schemas/todoSchema";
import { ITodo, Todo } from "../models/Todo";

export const createTodo = async(data: CreateTodoInput, userId: Types.ObjectId) : Promise<ITodo> =>{
  const todo = await Todo.create({
    title: data.title, 
    description: data.description,
    priority: data.priority,
    user: userId
  });

  return todo;
}