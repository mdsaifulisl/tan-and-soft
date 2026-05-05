import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineTrash, HiOutlineArrowLeft, HiOutlineShoppingBag } from "react-icons/hi";

// CSS স্টাইল
import "../../../style/Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  // ডামি কার্ট ডাটা
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "SUTO Royal Panjabi - Deep Blue",
      category: "panjabi",
      size: "L",
      price: 2450,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&q=80"
    },
    {
      id: 2,
      name: "Classic Khadi Kurta - Off White",
      category: "kurta",
      size: "XL",
      price: 1850,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=500&q=80"
    }
  ]);

  // --- কোয়ান্টিটি আপডেট হ্যান্ডলার ---
  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // --- আইটেম ডিলিট হ্যান্ডলার ---
  const handleRemoveItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // --- সাবটোটাল হিসাব ---
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // --- চেকআউট হ্যান্ডলার ---
  const handleCheckout = () => {
    navigate("/checkout"); 
  };

  if (cartItems.length === 0) {
    return (
      <div className="container empty-cart-container">
        <div className="empty-cart-card">
          <div className="empty-bag-icon">
            <HiOutlineShoppingBag />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet. Explore our premium collections to find your perfect fit.</p>
          <Link to="/products" className="btn-elegant">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container cart-layout-wrapper">
        
        {/* বাম দিকের কলাম: কার্ট আইটেম লিস্ট */}
        <div className="cart-left-section">
          <div className="cart-header">
            <h1 className="heading2">Shopping Cart</h1>
            <span className="item-count">({cartItems.length} Items)</span>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-img-container">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} className="cart-item-title">
                    {item.name}
                  </Link>
                  <p className="cart-item-meta">
                    Size: <span>{item.size}</span>
                  </p>
                  <span className="cart-item-price-mobile">৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>

                <div className="cart-quantity-selector">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>

                <div className="cart-item-actions">
                  <span className="cart-item-subtotal">৳{(item.price * item.quantity).toLocaleString()}</span>
                  <button 
                    className="delete-item-btn" 
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link to="/products" className="back-to-shop-link">
            <HiOutlineArrowLeft /> Continue Shopping
          </Link>
        </div>

        {/* ডান দিকের কলাম: অর্ডার সামারি */}
        <div className="cart-right-section">
          <div className="order-summary-card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-rows">
              <div className="summary-row total-row">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="cart-tax-notice">Taxes and shipping calculated at checkout</p>

            <button className="btn-elegant checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;