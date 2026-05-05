/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoStar, IoStarHalf, IoCheckmarkCircleOutline } from "react-icons/io5";

// components
import ProductCard from "../../../components/Shared/ProductCard";
import productsData from "../../../data/products.json";

// Style css
import "../../../style/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  // URL আইডি অনুযায়ী নির্দিষ্ট প্রোডাক্টটি খুঁজে বের করা
  const product = useMemo(() => {
    return productsData.find((item) => item.id === parseInt(id));
  }, [id]);

  // পেজ লোড বা প্রোডাক্ট চেঞ্জ হলে উইন্ডো স্ক্রল টপ করা
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // প্রোডাক্ট আইডি চেঞ্জ হলে বাটন ও ইমেজের স্টেট রিসেট করার সঠিক নিয়ম
  useEffect(() => {
    setActiveImageIdx(0);
    setQuantity(1);
    setSelectedSize("");
  }, [id]);

  // একই ক্যাটাগরির ৪টি রিলেটেড প্রোডাক্ট খুঁজে বের করা (কারেন্ট প্রোডাক্ট বাদে)
  // (ইউজমেমো হুকটি এখন ইফ কন্ডিশনের উপরে নিয়ে আসা হয়েছে যেন Rules of Hooks ভঙ্গ না হয়)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn-elegant">
          Back to Shop
        </Link>
      </div>
    );
  }

  // ইমেজ জুম লজিক (Hover Zoom Effect)
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${product.image[activeImageIdx]})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  // অ্যাড টু কার্ট লজিক
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }
    alert(`Success: Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  // বাই নাও লজিক
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size to proceed with purchase!");
      return;
    }
    alert(`Redirecting to checkout with ${quantity} x ${product.name} (Size: ${selectedSize})`);
  };

  return (
    <div className="product-details-page">
      {/* ব্রেডক্রাম্ব ও ব্যাক লিংক */}
      <div className="container breadcrumb-container">
        <Link to="/products" className="back-link">
          <HiOutlineArrowLeft /> Back to products
        </Link>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <HiOutlineChevronRight />
          <Link to="/products">Shop</Link> <HiOutlineChevronRight />
          <span>{product.name}</span>
        </div>
      </div>

      <div className="container product-details-wrapper">
        {/* ১. IMAGE GALLERY (লেফট কলাম) */}
        <div className="details-image-gallery">
          <div className="thumbnails-wrapper">
            {product.image.map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail-btn ${activeImageIdx === idx ? "active" : ""}`}
                onClick={() => setActiveImageIdx(idx)}
              >
                <img src={img} alt={`${product.name} thumb ${idx}`} />
              </button>
            ))}
          </div>

          <div 
            className="main-image-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={product.image[activeImageIdx]} alt={product.name} className="main-image" />
            <div className="zoom-lens" style={zoomStyle}></div>
          </div>
        </div>

        {/* ২. PRODUCT INFORMATION (রাইট কলাম) */}
        <div className="product-info-panel">
          <span className="info-category">{product.category.toUpperCase()}</span>
          <h1 className="info-title">{product.name}</h1>

          {/* রেটিং */}
          <div className="info-rating">
            <div className="stars">
              <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStarHalf />
            </div>
            <span className="rating-text">({product.rating} / 5.0 Rating)</span>
          </div>

          {/* প্রাইস */}
          <div className="info-price-wrapper">
            <span className="current-price">৳{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <>
                <span className="old-price">৳{product.oldPrice.toLocaleString()}</span>
                <span className="discount-badge">{product.discount}</span>
              </>
            )}
          </div>

          <p className="info-desc">{product.description}</p>

          <hr className="divider" />

          {/* সাইজ সিলেক্টর ও সাইজ গাইড */}
          <div className="size-selector-section">
            <div className="size-section-header">
              <label htmlFor="size-select">Select Size</label>
              <button className="size-guide-trigger" onClick={() => setIsSizeGuideOpen(true)}>
                Size Guide
              </button>
            </div>
            
            <div className="size-options-wrapper">
              {product.sizes ? (
                product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="no-sizes">Standard Size Only</p>
              )}
            </div>
          </div>

          {/* কোয়ান্টিটি, অ্যাড টু কার্ট ও বাই নাও বাটন */}
          <div className="purchase-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>

            <div className="action-buttons-group d-flex align-items-center gap-2">
              <button 
                className="btn-elegant-base btn-elegant-outline"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button 
                className="btn-elegant-base btn-elegant add-to-cart-btn-1"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* in stock */}
          <div className="stock-badge-wrapper">
            {product.inStock ? (
              <span className="stock-badge in-stock">
                <IoCheckmarkCircleOutline /> In Stock & Ready to Ship
              </span>
            ) : (
              <span className="stock-badge out-of-stock">Temporarily Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      {/* ৪. RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="container related-products-section">
          <h3 className="heading3">You May Also Like</h3>
          <div className="products-grid">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

      {/* --- সাইজ গাইড পপআপ মোডাল --- */}
      {isSizeGuideOpen && (
        <div className="modal-backdrop" onClick={() => setIsSizeGuideOpen(false)}>
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>SUTO Heritage Size Chart</h3>
              <button className="close-modal-btn" onClick={() => setIsSizeGuideOpen(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Measurements are in inches. Use this guide to find your perfect fit.</p>
              <table className="size-chart-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (in)</th>
                    <th>Length (in)</th>
                    <th>Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S</td>
                    <td>38</td>
                    <td>40</td>
                    <td>24</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>40</td>
                    <td>42</td>
                    <td>24.5</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>42</td>
                    <td>44</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>44</td>
                    <td>46</td>
                    <td>25.5</td>
                  </tr>
                  <tr>
                    <td>XXL</td>
                    <td>46</td>
                    <td>48</td>
                    <td>26</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

