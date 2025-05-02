import { Request, Response } from "express";
import { createUser, login } from "../services/authService";
import { CreateUserInput, SignInInput } from "../db/schemas/userSchema";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors/customErrors";

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

export const signin = async(req: Request, res: Response) => {
 try {
  const { email, password} : SignInInput = req.body;
  const token = await login(email, password);
  res.status(200).json({
    success: true,
    token
  });
 } catch (error) {
  if (error instanceof NotFoundError){
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  } else if (error instanceof BadRequestError){
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  } else {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
 }
}