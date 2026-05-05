import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt 
} from 'react-icons/fa';
import '../../style/Header.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // এখানে সাবস্ক্রিপশন API কল হবে
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000); // ৫ সেকেন্ড পর সাকসেস মেসেজ চলে যাবে
    }
  };

  return (
    <footer className="footer-section">
   

      {/* ২. মূল ফুটার কন্টেন্ট */}
      <div className="footer-main">
        <div className="container footer-main-grid">
          {/* ব্র্যান্ড ইনফো */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">SUTO</h2>
            <p className="brand-desc">
              Preserving our rich heritage through premium quality traditional attire. Crafted with passion, worn with pride.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter"><FaTwitter /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* কুইক লিংকস */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/products?category=panjabi">Premium Panjabi</Link></li>
              <li><Link to="/products?category=kurta">Festive Kurta</Link></li>
              <li><Link to="/products?category=shirt">Casual Shirt</Link></li>
              <li><Link to="/products?category=dhuti">Traditional Dhuti</Link></li>
            </ul>
          </div>

          {/* কাস্টমার কেয়ার */}
          <div className="footer-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links-list">
              <li><Link to="/track-order">Track Your Order</Link></li>
              <li><Link to="/shipping-policy">Shipping & Returns</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          {/* কন্টাক্ট এবং অ্যাড্রেস */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Store Information</h4>
            <ul className="contact-info-list">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>House 45, Road 12, Banani, Dhaka-1213, Bangladesh</span>
              </li>
              <li>
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+8801700000000">+880 1700-000000</a>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:support@suto.com">support@suto.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ৩. বটম কপিরাইট ও পেমেন্ট পার্টনার সেকশন */}
      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} <strong>SUTO Heritage</strong>. All Rights Reserved. Crafted with ❤️ in Bangladesh.
          </p>
          <div className="payment-gateways">
            <span className="payment-label">We Accept:</span>
            <div className="gateway-icons">
              {/* এগুলোকে আপনি চাইলে পরবর্তীতে রিয়েল ইমেজ/আইকন দিয়ে পরিবর্তন করতে পারবেন */}
              <span className="gateway-badge">bKash</span>
              <span className="gateway-badge">Nagad</span>
              <span className="gateway-badge">Visa</span>
              <span className="gateway-badge">MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;