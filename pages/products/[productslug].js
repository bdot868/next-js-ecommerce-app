import Head from 'next/head';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import styles from '../../styles/SingleProduct.module.css';

export async function getStaticPaths() {
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
  const paths = data.data.products.map((singleproduct) => {
    return {
      params: {
        productslug: singleproduct.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clrquq2t304zb01upbl4t5622/master',
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query MyQuery($slug: String) {
        product(where: { slug: $slug }) {
          id
          name
          slug
          price
          description {
            html
          }
          image {
            url
          }
        }
      }
    `,
    variables: {
      slug: params.productslug,
    },
  });
  const product = data.data.product;
  return {
    props: {
      product,
    },
  }
}


const singleproduct = ({ product }) => {
  console.log(product);
	return (
		<>
			<Head>
				<title>{product.name}</title>
			</Head>
			<div className={styles.single_container}>
				<div className={styles.left_section}>
					<img src={product.image.url} width={300} height={700} className={styles.left_img} alt="" />
				</div>
				<div className={styles.right_section}>
					<h3 className={styles.title}>{product.name}</h3>
					<p className={styles.price}>${product.price}</p>
					<div className={styles.para}>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. At
							impedit voluptatum vitae labore molestiae, maiores, hic ad
							officiis laudantium in officia, nam vel quod! Nesciunt aperiam
							explicabo facere laboriosam eius.
						</p>
					</div>
          <button
            className="btn snipcart-add-item"
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-url={`products/${product.slug}`}
            data-item-image={product.image.url}
            data-item-name={product.name}
          >Add to cart 🛒</button>
				</div>
			</div>
		</>
	);
};

export default singleproduct;
