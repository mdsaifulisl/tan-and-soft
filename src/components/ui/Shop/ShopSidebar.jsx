// import React from "react";
import { HiOutlineX } from "react-icons/hi"; //  সঠিক পাথ 'react-icons/hi'

const ShopSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedCategory,
  handleCategoryChange,
  priceRange,
  handlePriceChange,
  selectedSize,
  handleSizeChange,
  handleResetFilters,
}) => {
  const categories = ["all", "panjabi", "kurta", "shirt", "dhuti"];
  const sizes = ["all", "S", "M", "L", "XL", "XXL"];

  return (
    <>
      <aside className={`shop-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3 className="heading5">Filters</h3>
          <button
            className="close-sidebar-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            <HiOutlineX />
          </button>
        </div>

        {/* ক্যাটাগরি ফিল্টার */}
        <div className="filter-group">
          <h4 className="filter-title">Categories</h4>
          <div className="filter-options">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => {
                  handleCategoryChange(cat);
                  setIsSidebarOpen(false);
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* প্রাইস রেঞ্জ ফিল্টার */}
        <div className="filter-group">
          <h4 className="filter-title">Price Range</h4>
          <div className="price-slider-wrapper">
            <input
              type="range"
              min="1000"
              max="5000"
              step="100"
              value={priceRange}
              onChange={handlePriceChange}
              className="price-range-slider"
            />
            <div className="price-values">
              <span>Min: ৳1,000</span>
              <span>Max: ৳{priceRange.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* সাইজ ফিল্টার */}
        <div className="filter-group">
          <h4 className="filter-title">Filter by Size</h4>
          <div className="size-options">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => {
                  handleSizeChange(size);
                  setIsSidebarOpen(false);
                }}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* রিসেট ফিল্টার বাটন */}
        <button className="btn-reset-filters" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </aside>

      {/* ব্যাকড্রপ লেয়ার */}
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ShopSidebar;