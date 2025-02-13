import { Router } from 'express';
import userController from '../controllers/user.controller';
import validateRequest from '../middlewares/validateRequest';
import { UserSchema, UserUpdateSchema } from '../models/user.model';
import { z } from 'zod';

const router = Router();

const ParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

router.post(
  '/',
  validateRequest(z.object({ body: UserSchema })),
  userController.createUser
);

router.get('/', userController.getUsers);

router.get(
  '/:id',
  validateRequest(ParamsSchema),
  userController.getUserById
);

router.patch(
  '/:id',
  validateRequest(z.object({
    params: ParamsSchema.shape.params,
    body: UserUpdateSchema,
  })),
  userController.updateUser
);

router.delete(
  '/:id',
  validateRequest(ParamsSchema),
  userController.deleteUser
);

export default router; 