import { Request, Response } from "express";
import { CreateTodoInput, UpdateTodoInput } from "../db/schemas/todoSchema";
import { createTodo, getTodos, updateTodo } from "../services/todoService";
import logger from "../utils/logger/logger";
import { getErrorMessage, NotFoundError } from "../utils/errors/customErrors";

export const createTodoHandler = async (req: Request, res: Response) => {
  try {
    const { title, description, priority }: CreateTodoInput = req.body;
    const data: CreateTodoInput = { title, description, priority };
    const userId = (req as any).user._id;

    const todo = await createTodo(data, userId)
    res.status(201).json({
      success: true,
      todo
    });
  } catch (error) {
    logger.error(`Falha ao criar todo: ${getErrorMessage(error)}`);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
};

export const getUserTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const raw = req.query.priority;
    const priority =
      typeof raw === 'string'
        ? raw.toLowerCase().trim()
        : undefined;


    const todos = await getTodos(userId, priority);
    res.status(200).json({
      success: true,
      todos
    });
  } catch (error) {
    logger.error(`Falha ao retornar todos ${getErrorMessage(error)}`);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  try {
    const { title, description, priority }: UpdateTodoInput = req.body;
    const data: UpdateTodoInput = { title, description, priority };

    const userId = (req as any).user._id;
    const todoId = req.params.id;

    const updatedTodo = await updateTodo(userId, todoId, data);
    res.status(200).json({
      success: true,
      updatedTodo
    });
  } catch (error) {
    logger.error(`Falha ao atualizar todo ${getErrorMessage(error)}`);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
}