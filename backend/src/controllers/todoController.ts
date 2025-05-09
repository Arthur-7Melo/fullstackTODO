import { Request, Response } from "express";
import { CreateTodoInput } from "../db/schemas/todoSchema";
import { createTodo } from "../services/todoService";
import logger from "../utils/logger/logger";
import { getErrorMessage } from "../utils/errors/customErrors";

export const createTodoHandler = async(req: Request, res: Response) =>{
  try {
    const { title, description, priority } : CreateTodoInput = req.body;
    const data : CreateTodoInput = {title, description, priority};
    const userId = (req as any).user._id;

    const todo = await createTodo(data, userId)
    res.status(201).json({
      success: true,
      todo
    });
  } catch(error){
    logger.error(`Falha ao criar todo: ${getErrorMessage(error)}`);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
};