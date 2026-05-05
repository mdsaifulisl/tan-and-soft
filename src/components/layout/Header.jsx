import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // সোশ্যাল আইকন
import '../../style/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* --- Top Header / Announcement Bar --- */}
      <div className="top-header">
        <div className="header-container top-header-flex">
          <div className="top-left">
             <p className="text-white">Free shipping on orders over ৳৫০০০</p>
          </div>
          <div className="top-right">
             <a href="tel:+880123456789" className="top-link">Call: +880 1234 56789</a>
             <div className="top-socials">
                <a href="#"><FaFacebookF size={12} /></a>
                <a href="#"><FaInstagram size={12} /></a>
                <a href="#"><FaWhatsapp size={13} /></a>
             </div>
          </div>
        </div>
      </div>

      {/* --- Main Header --- */}
      <header className={`main-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </button>

          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <h1 className="heading3">Elegant<span>Panjabi</span></h1>
            </Link>
          </div>

          <nav className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/products" onClick={closeMenu}>Shop</NavLink>
            <NavLink to="/categories" onClick={closeMenu}>Categories</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
          </nav>

          <div className="header-actions">
            <NavLink to="/cart" className="cart-link" onClick={closeMenu}>
              <div className="cart-icon-wrapper">
                <HiOutlineShoppingBag size={26} />
                <span className="cart-badge">0</span>
              </div>
            </NavLink>
          </div>
        </div>
        
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </header>
    </>
  );
};

export default Header;