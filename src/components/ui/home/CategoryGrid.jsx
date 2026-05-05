// import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../../data/categories.json';


const CategoryGrid = () => {

    const allCategories = categories.slice(0, 4);


  return (
    <section className="category-section">
      <div className="container">
        {/* Section Title */}
        <div className="section-header text-center">
          <span className="subtitle text-primary">Our Collections</span>
          <h2 className="heading2 section-title">Shop by Category</h2>
          <div className="title-divider"></div>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {allCategories.map((cat) => (
            <Link to={cat.link} key={cat.id} className="category-card">
              <div className="category-img-wrapper">
                <img src={cat.image} alt={cat.name} className="category-img" />
                <div className="category-overlay"></div>
              </div>
              <div className="category-info">
                <h3 className="heading5 cat-en">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;