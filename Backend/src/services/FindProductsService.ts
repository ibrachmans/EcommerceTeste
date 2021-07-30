import { getCustomRepository } from 'typeorm';
import { ProductsRepositories } from "../repositories/ProductsRepositories";

interface IProductRequest {
  name?: string;
}

class FindProductService {
  async execute({ name }: IProductRequest ) {
    const productsRepository = getCustomRepository(ProductsRepositories);
    
    return await productsRepository.find();
  }
}

export { FindProductService }