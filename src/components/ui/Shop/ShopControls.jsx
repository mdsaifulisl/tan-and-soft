// import React from "react";

const ShopControls = ({ totalProducts, sortBy, setSortBy }) => {
  return (
    <div className="shop-controls">
      <p className="results-count">
        Showing <span>{totalProducts}</span> products
      </p>
      <div className="sort-dropdown-wrapper">
        <label htmlFor="sort">Sort By: </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Featured</option>
          <option value="newest">New Arrivals</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Average Rating</option>
        </select>
      </div>
    </div>
  );
};

export default ShopControls;