import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createTodoSchema, updateTodoSchema } from "../db/schemas/todoSchema";
import { protect } from "../middlewares/authenticate";
import { createTodoHandler, getUserTodos, updateTodoHandler } from "../controllers/todoController";
import { errorHandler } from "../middlewares/errorHandler";
import { authorizeTodos } from "../middlewares/authorizeTodo";

const router = Router();
router.use(protect);

router.post("/", validateRequest(createTodoSchema), createTodoHandler);
router.get("/", getUserTodos);
router.patch("/:id", authorizeTodos, validateRequest(updateTodoSchema), updateTodoHandler);

router.use(errorHandler);

export default router;