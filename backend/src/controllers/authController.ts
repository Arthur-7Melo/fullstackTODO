import { Request, Response } from "express";
import { User } from "../models/User";

export const userDbTest = async(req: Request, res: Response) => {
  try { 
    const { name, email, password } = req.body;

    const user = await User.create({
      name: name,
      email: email,
      password: password
    });
  
    res.status(201).json({sucess: true, user});
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno do servidor"});
  }
}