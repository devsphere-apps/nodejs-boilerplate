import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export const UserUpdateSchema = UserSchema.partial();

export type CreateUserInput = z.infer<typeof UserSchema>;
export type UpdateUserInput = z.infer<typeof UserUpdateSchema>; 