// import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiStar } from 'react-icons/hi';
import '../../style/ProductCard.css';

const ProductCard = ({ product }) => {
  // ইমেজ অ্যারে থেকে প্রথম ছবি নেওয়া হচ্ছে, না থাকলে একটি প্লেসহোল্ডার দেখাবে
  const mainImage = product.image && product.image.length > 0 
    ? product.image[0] 
    : 'https://tse2.mm.bing.net/th/id/OIP.OPC0yG5gmciVcOl_Uruz-AHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3';

  return (
    <div className="product-card">
      {/* Product Image & Badges */}
      <div className="product-img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img src={mainImage} alt={product.name} className="product-img" />
        </Link>
        
        {/* Discount Badge */}
        {product.discount && (
          <span className="product-badge sale-badge">{product.discount}</span>
        )}
        
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="stock-overlay">
            <span className="stock-text">Stock Out</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="heading6 product-title">{product.name}</h3>
        </Link>

        {/* Rating & Review Star */}
        <div className="product-rating">
          <HiStar className="star-icon" />
          <span>{product.rating ? product.rating.toFixed(1) : '0.0'}</span>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="product-footer">
          <div className="product-price">
            <span className="current-price">৳{product.price}</span>
            {product.oldPrice && (
              <span className="old-price">৳{product.oldPrice}</span>
            )}
          </div>
          
          {/* Cart Button */}
          <button 
            className="add-to-cart-btn" 
            disabled={!product.inStock}
            title={product.inStock ? "Add to Cart" : "Out of Stock"}
          >
            <HiOutlineShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;