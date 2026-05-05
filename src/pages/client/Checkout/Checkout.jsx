import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineShoppingBag } from "react-icons/hi";
import { IoCheckmarkCircle, IoInformationCircleOutline } from "react-icons/io5";

// CSS স্টাইল
import "../../../style/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  // ডামি কার্ট ডাটা (যা কার্ট পেজ থেকে পাস হয়ে আসার কথা)
  const [cartItems] = useState([
    {
      id: 1,
      name: "SUTO Royal Panjabi - Deep Blue",
      size: "L",
      price: 2450,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&q=80"
    },
    {
      id: 2,
      name: "Classic Khadi Kurta - Off White",
      size: "XL",
      price: 1850,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=500&q=80"
    }
  ]);

  // --- ফর্ম স্টেট ---
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "", // ঐচ্ছিক
    district: "inside_dhaka", // ডিফল্ট: ঢাকার ভিতরে
    subDistrict: "",
    address: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // --- ইনপুট চেঞ্জ হ্যান্ডলার ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // টাইপ করার সাথে সাথে এরর ক্লিয়ার করা
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // --- ডেলিভারি চার্জ নির্ধারণ (ঢাকার ভেতরে ৬০ টাকা, বাইরে ১২০ টাকা) ---
  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return formData.district === "inside_dhaka" ? 60 : 120;
  }, [formData.district, cartItems]);

  // --- সাবটোটাল ও গ্র্যান্ড টোটাল হিসাব ---
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalAmount = subtotal + deliveryFee;

  // --- ফর্ম ভ্যালিডেশন ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "আপনার নাম লিখুন";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "মোবাইল নম্বরটি আবশ্যক";
    } else if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(formData.mobile.trim())) {
      newErrors.mobile = "সঠিক ১১ ডিজিটের মোবাইল নম্বরটি লিখুন";
    }
    if (!formData.subDistrict.trim()) newErrors.subDistrict = "থানা / উপজেলা লিখুন";
    if (!formData.address.trim()) newErrors.address = "বিস্তারিত ঠিকানা লিখুন (যেমন: বাড়ি নং, রোড নং, এলাকা)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- প্লেস অর্ডার হ্যান্ডলার ---
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // স্ক্রল করে ভ্যালিডেশন এরর এর কাছে নিয়ে যাওয়া
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // ৩ সেকেন্ডের ডামি লোডিং স্পিনার (অর্ডার প্রসেসিং ইফেক্ট)
    setTimeout(() => {
      setIsSubmitting(false);
      alert("ধন্যবাদ! আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। (Cash on Delivery)");
      navigate("/order-success");
    }, 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container empty-checkout-container">
        <div className="empty-cart-card">
          <div className="empty-bag-icon">
            <HiOutlineShoppingBag />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>অর্ডার সম্পন্ন করতে প্রথমে আপনার কার্টে কিছু প্রোডাক্ট যুক্ত করুন।</p>
          <Link to="/products" className="btn-elegant">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-layout-wrapper">
        
        {/* বাম দিকের কলাম: কাস্টমার ইনফরমেশন ফর্ম */}
        <div className="checkout-left-section">
          <Link to="/cart" className="back-to-cart-link">
            <HiOutlineArrowLeft /> Back to Cart
          </Link>

          <h2 className="section-title">Delivery & Shipping Address</h2>
          
          <form onSubmit={handlePlaceOrder} className="checkout-form-element">
            {/* ১. নাম */}
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="আপনার নাম লিখুন"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* ২. মোবাইল ও ইমেইল (পাশাপাশি দুই কলামে) */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="01xxxxxxxxx"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={errors.mobile ? "input-error" : ""}
                />
                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span className="optional">(Optional)</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* ৩. জেলা নির্বাচন (ঢাকার ভিতরে / বাইরে) */}
            <div className="form-group">
              <label>District / Area *</label>
              <div className="district-radio-group">
                <label className={`district-radio-label ${formData.district === "inside_dhaka" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="district"
                    value="inside_dhaka"
                    checked={formData.district === "inside_dhaka"}
                    onChange={handleInputChange}
                  />
                  <div className="radio-content">
                    <span className="area-title">ঢাকার ভিতরে (Inside Dhaka)</span>
                    <span className="charge-badge">৳৬০</span>
                  </div>
                </label>

                <label className={`district-radio-label ${formData.district === "outside_dhaka" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="district"
                    value="outside_dhaka"
                    checked={formData.district === "outside_dhaka"}
                    onChange={handleInputChange}
                  />
                  <div className="radio-content">
                    <span className="area-title">ঢাকার বাইরে (Outside Dhaka)</span>
                    <span className="charge-badge">৳১২০</span>
                  </div>
                </label>
              </div>
            </div>

            {/* ৪. থানা / উপজেলা */}
            <div className="form-group">
              <label htmlFor="subDistrict">Thana / Sub-district *</label>
              <input
                type="text"
                id="subDistrict"
                name="subDistrict"
                placeholder="থানা বা উপজেলার নাম লিখুন"
                value={formData.subDistrict}
                onChange={handleInputChange}
                className={errors.subDistrict ? "input-error" : ""}
              />
              {errors.subDistrict && <span className="error-message">{errors.subDistrict}</span>}
            </div>

            {/* ৫. বিস্তারিত ঠিকানা */}
            <div className="form-group">
              <label htmlFor="address">Detailed Address *</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                placeholder="বাসা নং, রোড নং, গ্রাম বা এলাকার বিস্তারিত ঠিকানা লিখুন"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? "input-error" : ""}
              ></textarea>
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </form>
        </div>

        {/* ডান দিকের কলাম: অর্ডার সামারি ও পেমেন্ট */}
        <div className="checkout-right-section">
          
          {/* অর্ডার লিস্ট সামারি */}
          <div className="checkout-summary-card">
            <h3 className="summary-card-title">Order Items</h3>
            
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div className="item-thumbnail">
                    <img src={item.image} alt={item.name} />
                    <span className="quantity-badge">{item.quantity}</span>
                  </div>
                  <div className="item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-meta">Size: {item.size}</p>
                  </div>
                  <span className="item-price">৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <hr className="summary-divider" />

            {/* বিলিং হিসাব */}
            <div className="billing-rows">
              <div className="billing-row">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="billing-row">
                <span>Delivery Charge</span>
                <span>৳{deliveryFee.toLocaleString()}</span>
              </div>
              <hr className="summary-divider-thin" />
              <div className="billing-row total-row">
                <span>Total Amount</span>
                <span>৳{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* পেমেন্ট মেথড (শুধুমাত্র ক্যাশ অন ডেলিভারি) */}
          <div className="payment-method-card">
            <h3 className="summary-card-title">Payment Method</h3>
            
            <div className="cod-selection-box">
              <div className="cod-header">
                <IoCheckmarkCircle className="cod-checked-icon" />
                <div>
                  <span className="payment-name">Cash on Delivery (ক্যাশ অন ডেলিভারি)</span>
                  <p className="payment-desc">পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।</p>
                </div>
              </div>
              <div className="cod-alert">
                <IoInformationCircleOutline />
                <span>ডেলিভারি ম্যানের সামনে পণ্য চেক করে রিসিভ করবেন।</span>
              </div>
            </div>

            {/* সাবমিট বাটন (লোডিং স্পিনার সহ) */}
            <button 
              className="btn-elegant place-order-btn" 
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="spinner-wrapper">
                  <div className="order-btn-spinner"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                "Place Order"
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;