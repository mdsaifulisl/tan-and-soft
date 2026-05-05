// import React from 'react';
import ProductCard from '../../Shared/ProductCard'; 
import products from '../../../data/products.json';


const BestSellers = () => {
  return (
    <section className="best-sellers-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="subtitle text-primary">Trending Now</span>
          <h2 className="heading2 section-title">Best Selling Products</h2>
          <div className="title-divider"></div>
        </div>

        {/* Products Grid (হোম পেজের জন্য প্রথম ৬টি প্রোডাক্ট দেখাবে) */}
        <div className="products-grid">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;