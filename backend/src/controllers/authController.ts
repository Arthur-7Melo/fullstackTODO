import { Request, Response } from "express";
import { createUser } from "../services/authService";
import { CreateUserInput } from "../db/schemas/userSchema";
import { AppError, ConflictError } from "../utils/errors/customErrors";

export const signup = async(req: Request, res: Response) => {
  try { 
    const { name, email, password } : CreateUserInput = req.body;
    const user = await createUser(name, email, password);
    res.status(201).json({sucess: true, user});
  } catch(error) {
    if(error instanceof ConflictError){
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      })
    } else {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor" 
      });     
    }
  }
}