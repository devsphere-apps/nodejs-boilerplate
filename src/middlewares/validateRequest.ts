import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      res.status(400).json(error);
    }
};

export default validateRequest; 