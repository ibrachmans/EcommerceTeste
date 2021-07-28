import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, discount, category, description, amount } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({ name, price, discount, category, description, amount });

    return response.json(product);
  }
}

export { CreateProductController };