import { Request, Response } from "express";
import { createUser, forgotPassword, login, resetPassword } from "../services/authService";
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, SignInInput } from "../db/schemas/userSchema";
import { BadRequestError, ConflictError, getErrorMessage, NotFoundError } from "../utils/errors/customErrors";
import logger from "../utils/logger/logger";

export const signup = async(req: Request, res: Response) => {
  try { 
    const { name, email, password } : CreateUserInput = req.body;
    const user = await createUser(name, email, password);
    logger.info(`Usuário criado: ${email}`);
    res.status(201).json({sucess: true, user});
  } catch(error) {
    if(error instanceof ConflictError){
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      })
    } else {
      logger.error(`Falha no signup: ${getErrorMessage(error)}`);
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
    logger.error(`Falha no signin: ${getErrorMessage(error)}`);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
 }
}

export const forgotPasswordHandler = async(req: Request, res: Response) => {
  try {
    const { email } : ForgotPasswordInput = req.body;
    await forgotPassword(email)
    logger.info(`Email enviado para o user: ${email}`);
    res.status(200).json({
      success: true,
      message: "Email enviado com sucesso"
    });
  } catch(error) {
    if(error instanceof NotFoundError){
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      logger.error(`Falha no forgot-Password: ${getErrorMessage(error)}`);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
 };
}

export const resetPasswordHandler = async(req: Request, res: Response) => {
  try {
    const resetToken = req.params.token;
    const { password } : ResetPasswordInput = req.body;

    await resetPassword(resetToken, password);
    res.status(200).json({
      success: true,
      message: "Senha alterada com sucesso"
    });
  } catch(error) {
    if(error instanceof BadRequestError){
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      logger.error(`Falha no reset-Password: ${getErrorMessage(error)}`);
      res.status(500).json({
        sucess: false,
        message: "Erro interno do servidor"
      });
    }
  };
}