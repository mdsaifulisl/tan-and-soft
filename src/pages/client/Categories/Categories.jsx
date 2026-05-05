
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import categories from "../../../data/categories.json";

// CSS স্টাইল
import "../../../style/Categories.css";

const Categories = () => {
  // আপনার দেওয়া ক্যাটাগরি JSON ডেটা
  const categoriesData = categories;

  return (
    <div className="categories-page">
      <div className="container">
        
        {/* হেডার সেকশন ও ব্যাক টু হোম লিংক */}
        <div className="categories-header">
          <Link to="/" className="back-home-link">
            <HiOutlineArrowLeft /> Back to Home
          </Link>
          <h1 className="categories-title">Shop by Category</h1>
          <p className="categories-subtitle">
            Explore our heritage collections crafted with timeless design and premium comfort.
          </p>
        </div>

        {/* ক্যাটাগরি কার্ড গ্রিড */}
        <div className="categories-grid-1">
          {categoriesData.map((category) => (
            <Link 
              key={category.id} 
              to={category.link} 
              className="category-card-1"
            >
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} loading="lazy" />
                <div className="category-overlay"></div>
              </div>
              
              <div className="category-details">
                <h3 className="category-name">{category.name}</h3>
                <span className="explore-btn">
                  Explore Collection <HiOutlineArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Categories;