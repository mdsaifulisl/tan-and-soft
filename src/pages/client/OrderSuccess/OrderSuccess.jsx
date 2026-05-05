// import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineCheckCircle, HiOutlineMail } from "react-icons/hi";

// CSS স্টাইল
import "../../../style/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  
  // ডামি ডেটা (প্রয়োজনে চেকআউট পেজ থেকে অর্ডারের প্রকৃত ডেটা পাস করা যাবে)
  const orderDetails = location.state || {
    // eslint-disable-next-line react-hooks/purity
    orderNumber: "SUTO-" + Math.floor(100000 + Math.random() * 900000),
    customerName: "Rahat Chowdhury",
    totalAmount: 6210,
    paymentMethod: "Cash on Delivery",
    estimatedDelivery: "3 - 5 Business Days"
  };

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-card animate-fade-in">
          
          {/* সাকসেস অ্যানিমেটেড আইকন */}
          <div className="success-icon-wrapper">
            <HiOutlineCheckCircle className="main-success-icon" />
          </div>

          <span className="success-badge">Thank You for Your Order</span>
          <h1 className="success-title">অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!</h1>
          
          <p className="success-msg">
            প্রিয় <strong>{orderDetails.customerName}</strong>, আপনার অর্ডারটি আমাদের সিস্টেমে নথিভুক্ত করা হয়েছে। 
            খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
          </p>

          {/* অর্ডার ব্রিফ / সামারি বক্স */}
          <div className="order-brief-box">
            <h3 className="brief-title">Order Brief</h3>
            
            <div className="brief-rows">
              <div className="brief-row">
                <span>Order Number</span>
                <strong className="order-num-text">{orderDetails.orderNumber}</strong>
              </div>
              <div className="brief-row">
                <span>Payment Method</span>
                <span>{orderDetails.paymentMethod}</span>
              </div>
              <div className="brief-row">
                <span>Total Amount</span>
                <strong className="total-amount-text">৳{orderDetails.totalAmount.toLocaleString()}</strong>
              </div>
              <div className="brief-row">
                <span>Estimated Delivery</span>
                <span className="delivery-time">{orderDetails.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          {/* অতিরিক্ত ট্রাস্ট সিগন্যাল বার্তা */}
          <div className="success-notice-box">
            <HiOutlineMail className="notice-icon" />
            <p>অর্ডারের বিবরণ সহ একটি নিশ্চিতকরণ ইমেইল/এসএমএস আপনার ঠিকানায় পাঠানো হয়েছে।</p>
          </div>

          {/* অ্যাকশন বাটন */}
          <div className="success-actions">
            <Link to="/products" className="btn-elegant continue-shopping-btn">
              <HiOutlineShoppingBag /> Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;