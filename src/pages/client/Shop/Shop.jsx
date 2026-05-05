import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { HiOutlineAdjustments } from "react-icons/hi";

// components
import ShopHeader from "../../../components/ui/Shop/ShopHeader";
import ShopSidebar from "../../../components/ui/Shop/ShopSidebar";
import ShopControls from "../../../components/ui/Shop/ShopControls";
import ShopPagination from "../../../components/ui/Shop/ShopPagination";
import ProductCard from "../../../components/Shared/ProductCard";

// ডাটা এবং সিএসএস
import productsData from "../../../data/products.json";
import "../../../style/Shop.css";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");

  // --- States ---
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const itemsPerPage = 6;

  // URL-এর ক্যাটাগরি চেঞ্জ হলে স্টেট আপডেট
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(urlCategory || "all");
    setCurrentPage(1);
  }, [urlCategory]);

  // ফিল্টার রিসেট
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setPriceRange(5000);
    setSelectedSize("all");
    setSortBy("default");
    setCurrentPage(1);
    setSearchParams({});
  };

  // --- ফিল্টারিং ও সর্টিং লজিক ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsData];

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    result = result.filter((product) => product.price <= priceRange);

    if (selectedSize !== "all") {
      result = result.filter(
        (product) => product.sizes && product.sizes.includes(selectedSize)
      );
    }

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

  // --- পেজিনেশন লজিক ---
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredAndSortedProducts, currentPage]);

  // --- হ্যান্ডলার ফাংশনস ---
  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchParams(category === "all" ? {} : { category });
    setTimeout(() => setIsLoading(false), 400);
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
      <ShopHeader />

      <div className="container shop-layout-container">
        <button
          className="mobile-filter-trigger"
          onClick={() => setIsSidebarOpen(true)}
        >
          <HiOutlineAdjustments /> Filters & Sort
        </button>

        <ShopSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          selectedSize={selectedSize}
          handleSizeChange={handleSizeChange}
          handleResetFilters={handleResetFilters}
        />

        <main className="shop-main-content">
          <ShopControls
            totalProducts={filteredAndSortedProducts.length}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

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

          <ShopPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};

export default Shop;