import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Shared/ProductCard";
import productsData from "../../data/products.json";
import { HiOutlineAdjustments, HiOutlineX } from "react-icons/hi";
import "../../style/Shop.css";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");

  // --- States ---
  const [selectedCategory, setSelectedCategory] = useState(
    urlCategory || "all",
  );
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const itemsPerPage = 6;

  // URL-এর ক্যাটাগরি চেঞ্জ হলে স্টেট আপডেট করা
  useEffect(() => {
    if (urlCategory) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory("all");
    }
    setCurrentPage(1); // ফিল্টার চেঞ্জ হলে ১ম পেজে ব্যাক করবে
  }, [urlCategory]);

  // ফিল্টার রিস্টার্ট (Reset) করার লজিক
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setPriceRange(5000);
    setSelectedSize("all");
    setSortBy("default");
    setCurrentPage(1);
    setSearchParams({});
  };

  // --- Core Filtering & Sorting Logic ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsData];

    // ১. ক্যাটাগরি ফিল্টার
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // ২. প্রাইস রেঞ্জ ফিল্টার
    result = result.filter((product) => product.price <= priceRange);

    // ৩. সাইজ ফিল্টার (ডামি ডেটার সাইজ চেক করার জন্য)
    // ৩. সাইজ ফিল্টার (রিয়েল সাইজ অ্যারে চেক)
    if (selectedSize !== "all") {
      result = result.filter(
        (product) => product.sizes && product.sizes.includes(selectedSize),
      );
    }

    // ৪. সর্টিং লজিক (Sort By)
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [selectedCategory, priceRange, selectedSize, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // কারেন্ট পেজের জন্য প্রোডাক্টগুলো আলাদা করা
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // ফিল্টার বা কন্ডিশন চেঞ্জ হলে লোডিং ইফেক্ট তৈরি করা (মডার্ন UI ফিল)
  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchParams(category === "all" ? {} : { category });
    setTimeout(() => setIsLoading(false), 400); // ৪০০ মিলি-সেকেন্ডের আর্টিফিশিয়াল স্মুথ লোডার
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSizeChange = (size) => {
    setIsLoading(true);
    setSelectedSize(size);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 400);
  };

  return (
    <div className="shop-page">
      {/* পেজ হেডার */}
      <div className="shop-header">
        <div className="container">
          <h1 className="heading1">SUTO Collections</h1>
          <p>
            Explore our premium range of handpicked heritage wear designed for
            elite styling.
          </p>
        </div>
      </div>

      <div className="container shop-layout-container">
        {/* --- মোবাইল ফিল্টার বাটন --- */}
        <button
          className="mobile-filter-trigger"
          onClick={() => setIsSidebarOpen(true)}
        >
          <HiOutlineAdjustments /> Filters & Sort
        </button>

        {/* --- ১. FILTER SIDEBAR --- */}
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
              {["all", "panjabi", "kurta", "shirt", "dhuti"].map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    handleCategoryChange(cat);
                    setIsSidebarOpen(false); // মোবাইলে ক্লিক করলে বন্ধ হবে
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
              {["all", "S", "M", "L", "XL", "XXL"].map((size) => (
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

        {/* সাইডবার খোলা থাকলে পেছনে ডার্ক ব্লার ব্যাকড্রপ (মোবাইলে) */}
        {isSidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* --- ২. PRODUCT GRID & CONTROL AREA --- */}
        <main className="shop-main-content">
          {/* সর্টিং এবং টোটাল কাউন্ট সেকশন */}
          <div className="shop-controls">
            <p className="results-count">
              Showing <span>{filteredAndSortedProducts.length}</span> products
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

          {/* --- ৩. LOADING, NO-RESULTS & PRODUCTS GRID --- */}
          {isLoading ? (
            <div className="shop-loading-state">
              <div className="spinner"></div>
              <p>Refreshing collections...</p>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="shop-no-results">
              <h3 className="heading4">No Products Found</h3>
              <p>
                We couldn't find any products matching your selected filters.
                Try resetting the filters or adjusting the price range.
              </p>
              <button className="btn-elegant" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid shop-grid">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* --- ৪. PAGINATION --- */}
          {totalPages > 1 && !isLoading && (
            <div className="pagination-wrapper">
              <button
                className="pagination-btn arrow-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>

              <div className="page-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-btn num-btn ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn arrow-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
