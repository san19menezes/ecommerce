import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, Footer } from '../components';

const Home = ({ products, bannerData }) =>
(
  <>
    {/* HeroBanner */}
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    {/* Products List */}
    <div className='products-container'>
      {products?.map((product) =>
        <Product
          key={product._id}
          product={product}
        />)}
    </div>

    {/* Footer Banner */}
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </>
);

export const getServerSideProps = async () => {
  // Fetch the product document from sanity
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // Fetch the banner document from sanity
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}


export default Home;