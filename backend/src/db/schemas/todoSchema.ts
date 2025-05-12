import z from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  priority: z.enum(['baixa', 'alta']),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(['baixa', 'alta']).optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;