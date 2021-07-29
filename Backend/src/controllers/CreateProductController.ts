import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, image, price, discount, category, description, amount } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({ name, image, price, discount, category, description, amount });

    return response.json(product);
  }
}

export { CreateProductController };