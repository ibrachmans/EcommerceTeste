import Head from 'next/head';
import { GetServerSideProps } from 'next';
import styles from './home.module.scss';
import { api } from '../services/api';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Pagination } from '@material-ui/lab';
import { Select, MenuItem } from '@material-ui/core';

interface Props {
  pagination: Pagination
}

interface PaginationHeader {
  page: number,
  nextPage: number,
  lastPage: number,
  limit: number,
  total: number,
  totalPage: number,
  results: any
}

interface Pagination {
  meta: PaginationHeader,
  results: Product[]
}

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  discount?: number;
  description: string;
}

export default function Home(props: Props) {
  const [searchTitle, setSearchTitle] = useState("Lista de produtos");
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(props.pagination.results);
  const [totalPages, setTotalPages] = useState(props.pagination.meta.totalPage)
  const [totalProducts, setTotalProducts] = useState(props.pagination.meta.total)

  async function getResult(limit, name, page) {
    const result = await api.get(`products?limit=${limit}&name=${name}&page=${page}`);
    setData(result.data.results)
    setTotalProducts(result.data.meta.total)
    setTotalPages(result.data.meta.totalPage)
    setLimit(result.data.meta.limit)
  }

  const updateSearch = (text) => {
    setSearchTitle(text.length === 0 ? "Lista de produtos" : text);
    getResult(limit, text, page);
    setName(text);
}

return (
  <>
    <Head>
      <title>Desafio Ecommerce</title>
    </Head>
    <Header updateSearch={(text) => updateSearch(text)} />
    <div className={styles.searchTitleContainer}>
      <h1 className={styles.searchTitleContent}>{searchTitle}</h1>
    </div>
    <main className={styles.mainContainer}>
      <span className={styles.productFound}>{`${totalProducts} PRODUTO(S) ENCONTRADO(S)`}</span>
      <span className={styles.underline}></span>
      {data.map(product => (
        <section key={product.id} className={styles.contentContainer}>
          <div className={styles.productImages}><img className={styles.images} src={product.image} alt="Fotos dos produtos" /></div>
          <div className={styles.productData}>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>
          <div className={styles.productPrice}>
            <span className={styles.originalPrice}>{`R$${product.price}`}</span>
            <span className={styles.salePrice}>{`por ${product.discount}`}</span>
          </div>
        </section>
      ))}
    </main>
    <footer className={styles.footerContainer}>
    <Select
          className={styles.perPage}
          value={limit}
          onChange={(event) => getResult(event.target.value, name, page)}
        >
          <MenuItem value={5}>5 produtos por página</MenuItem>
          <MenuItem value={10}>10 produtos por página</MenuItem>
          <MenuItem value={15}>15 produtos por página</MenuItem>
        </Select>
      <div className={styles.productPagination}>
        <Pagination 
          count={totalPages}
          siblingCount={1}
          defaultPage={1}
          onChange={(event, page) => getResult(limit, name, page)}
          variant="outlined" 
          shape="rounded" />      
      </div>
    </footer>
  </>
)
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<Pagination>('products');
  return {
    props: {
      pagination: response.data
    }
  }
}