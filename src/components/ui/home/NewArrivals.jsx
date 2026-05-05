// import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../Shared/ProductCard'; // আমাদের তৈরি রিইউজেবল প্রোডাক্ট কার্ড
import products from '../../../data/products.json';


const NewArrivals = () => {
  
  const sortedProducts = [...products].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });


  const latestProducts = sortedProducts.slice(0, 6);

  return (
    <section className="new-arrivals-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <div className="section-title-area">
            <span className="subtitle text-primary">Just In</span>
            <h2 className="heading2 section-title">New Arrivals</h2>
            <div className="title-line"></div>
          </div>
          
          {/* Shop All Button */}
          <Link to="/products" className="view-all-link">
            Explore All New Arrivals <span className="arrow">→</span>
          </Link>
        </div>

        {/* Reusable Products Grid */}
        <div className="products-grid">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;