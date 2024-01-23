import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import allProducts from './data/products.json';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export async function getStaticProps(context) {
  const client = new ApolloClient({
    uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clrquq2t304zb01upbl4t5622/master',
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query ProductsQuery {
        products {
          id
          name
          slug
          price
          image {
            url
          }
        }
      }
    `
  });
  const allProducts = data.data.products;
  console.log(allProducts);
  return {
    props: {
      allProducts
    },
  }
}

export default function Home({ allProducts }) {
	return (
		<>
			<Head>
				<title>Plants | Home</title>
			</Head>
			<div className="container">
				<h2 className={styles.title}>
					All Products <span>🌿</span>
				</h2>
				<div className={styles.products_container}>
					{allProducts.map((product) => {
            console.log(product);
						return (
							<div className={styles.product_card} key={product.id}>
								<Link href={`products/${product.slug}`}>
										<div className={styles.product_img}>
											<img src={product.image.url} alt={product.name} />
										</div>
								</Link>
								<div className={styles.product_content}>
									<h3>{product.name}</h3>
									<p>${product.price}</p>
									<button className="btn">Add to cart 🛒</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

// export async function getStaticProps() {
//   return {
//     props: {
//       allProducts,
//     }
//   };
// }
