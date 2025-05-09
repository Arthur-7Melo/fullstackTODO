import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createTodoSchema } from "../db/schemas/todoSchema";
import { protect } from "../middlewares/authenticate";
import { createTodoHandler } from "../controllers/todoController";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();
router.use(protect);

router.post("/", validateRequest(createTodoSchema), createTodoHandler);

router.use(errorHandler);

export default router;