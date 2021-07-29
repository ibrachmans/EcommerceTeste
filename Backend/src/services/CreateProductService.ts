import { getCustomRepository } from 'typeorm';
import { ProductsRepositories } from "../repositories/ProductsRepositories";

interface IProductRequest {
  name: string;
  image: string;
  price: number;
  discount?: number;
  category: string;
  description: string;
  amount: number;
}

class CreateProductService {
  async execute({ name, image, price, discount, category, description, amount}: IProductRequest ) {
    const productsRepository = getCustomRepository(ProductsRepositories);

    if(!name) {
      throw new Error("Product incorrect")
    }
    
    const productAlreadyExists = await productsRepository.findOne({
      name
    });

    if(productAlreadyExists) {
      throw new Error("Product already exists");
    }

    const product = productsRepository.create({
      name,
      image,
      price,
      discount,
      category,
      description,
      amount
    })

    await productsRepository.save(product);

    return product;
  }
}

export { CreateProductService }