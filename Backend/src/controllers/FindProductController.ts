import { Request, Response } from 'express';
import { FindProductService } from '../services/FindProductsService';

class FindProductController {
  async handle(request: Request, response: Response) {
    let { name = "", page = 1, limit = 5 } = request.query;
    name = name.toString();
    page = parseInt(page.toString());
    limit = parseInt(limit.toString());

    const findProductService = new FindProductService();

    const findProduct = await findProductService.execute({ name, page, limit });

    return response.json(findProduct);
  }
}

export { FindProductController };