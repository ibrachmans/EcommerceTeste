import Head from 'next/head';
import { GetServerSideProps } from 'next';
import styles from './home.module.scss';
import { api } from '../services/api';
import { useState, useEffect } from 'react';

interface Props {
  products: Product[]
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
  const [searchTitle, setSearchTitle] = useState("Lista de Produtos");
  const updateSearch = (text) => {
    setSearchTitle(text);
  }

  return (
    <>
      <Head>
        <title>Desafio Ecommerce</title>
      </Head>
      
      <div className={styles.searchTitleContainer}>
        <h1 className={styles.searchTitleContent}>{searchTitle}</h1>
      </div>
      
      <main className={styles.mainContainer}>
        <span className={styles.productFound}>{`${props.products.length} PRODUTO(S) ENCONTRADO(S)`}</span>
        <span className={styles.underline}></span>
        {props.products.map(product => (
          <section key={product.id} className={styles.contentContainer}>
            <div className={styles.productImages}><img className={styles.images} src={product.image} alt="Fotos dos produtos" /></div>
            <div className={styles.productData}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
            </div>
            <div>
              {`R$${product.price} ${product.discount}`}
            </div>
          </section>
        ))}
      </main>
      <footer className={styles.footerContainer}>
        <span className={styles.productsNumber}> {props.products.length} produto(s) por página</span>
        <span className={styles.productPagination}>PAGINATION</span>
      </footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<Product[]>('products');
  console.log(response);

  return {
    props: {
      products: response.data
    }
  }
}
