import { getCustomRepository } from 'typeorm';
import { ProductsRepositories } from "../repositories/ProductsRepositories";

interface IProductRequest {
  name?: string;
}

class FindProductService {
  async execute({ name }: IProductRequest ) {
    const productsRepository = getCustomRepository(ProductsRepositories);

    let productList = [];

    if(name.length > 0) {
      productList = await productsRepository.createQueryBuilder().where("product.name like :name", { name:`%${name}%` })
      .getMany();
      
    } else {
      productList = await productsRepository.find();
    }

    return productList;
  }
}

export { FindProductService }