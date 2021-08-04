import { getCustomRepository, Like } from 'typeorm';
import { ProductsRepositories } from "../repositories/ProductsRepositories";

interface IProductRequest {
  name?: string;
  page: number;
  limit: number;
}

interface Pagination {
    meta: {
        page: number,
        nextPage?: number,
        lastPage?: number,
        limit: number,
        total: number,
        totalPage: number
    },
    results: any
}

class FindProductService {
  async execute({ name, page, limit }: IProductRequest) {
    const productsRepository = await getCustomRepository(ProductsRepositories);
    
    page = page ? page : 1;
    limit = limit? limit: 10;
    const startIndex = (page - 1) * limit;

    const [ result, count ] = await productsRepository.findAndCount(
      {
        where: name ? { name: Like(`%${name}%`) } : {},
        order: { name: "DESC" },
        take: limit,
        skip: startIndex
      }
    );

    const pagination = <Pagination>{
        meta: {
            page: (page)? page : 0,
            nextPage: (page !== count / limit)? page + 1: null,
            lastPage: (page > 1)? page - 1 : null,
            limit: limit,
            total: count,
            totalPage: count / limit
        },
        results: result
    };
    
    return pagination
  }
}

export { FindProductService }