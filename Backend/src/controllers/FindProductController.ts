import { Request, Response } from 'express';
import { FindProductService } from '../services/FindProductsService';

class FindProductController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const findProductService = new FindProductService();

    const findProduct = await findProductService.execute({ name });

    return response.json(findProduct);
  }
}

export { FindProductController };