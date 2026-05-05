
import { Link } from "react-router-dom";
import { 
  HiOutlineSparkles, 
  HiOutlineShieldCheck, 
  HiOutlineTruck, 
  HiOutlineArrowRight,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker
} from "react-icons/hi";
import { RiLoopLeftLine } from "react-icons/ri";

// CSS স্টাইল
import "../../../style/About.css";

const About = () => {
  return (
    <div className="about-page">
      
      {/* ১. হিরো সেকশন */}
      <div className="about-hero">
        <div className="container">
          <span className="about-subtitle">The SUTO Legacy</span>
          <h1 className="about-hero-title">Crafting Heritage & Elegance</h1>
          <p className="about-hero-desc">
            যেখানে ঐতিহ্য এবং আধুনিক ফ্যাশন এক সুতোয় বোনা হয়। আমরা তৈরি করি শুধু পোশাক নয়, একটি আত্মপরিচয়।
          </p>
        </div>
      </div>

      {/* ২. কোম্পানির গল্প ও মিশন (Story & Mission) */}
      <section className="about-story-section container">
        <div className="story-grid">
          <div className="story-image-box">
            <img 
              src="https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=800&auto=format&fit=crop" 
              alt="Traditional Craftsmanship" 
              className="main-story-img"
            />
            <div className="story-img-badge">
              <strong>Est. 2024</strong>
              <span>SUTO Heritage</span>
            </div>
          </div>

          <div className="story-content-box">
            <span className="section-tag">Our Story</span>
            <h2 className="section-main-title">বুনন ও ঐতিহ্যমণ্ডিত কারুশিল্পের মেলবন্ধন</h2>
            <p className="story-paragraph">
              SUTO-এর পথচলা শুরু হয়েছিল একটি সাধারণ লক্ষ্য নিয়ে—বাঙালি ঐতিহ্যবাহী পোশাকের বুনন শৈলী এবং কারুশিল্পকে নতুন প্রজন্মের সামনে একটি আধুনিক ও রাজকীয় রূপে উপস্থাপন করা। আমাদের প্রতিটি সুতো, প্রতিটি ডিজাইন আমাদের সংস্কৃতির সমৃদ্ধ ইতিহাসকে বহন করে।
            </p>
            <p className="story-paragraph">
              আমরা সর্বোচ্চ গুণগত মানের সুতা এবং প্রিমিয়াম ফেব্রিক নির্বাচন থেকে শুরু করে প্রতিটি সেলাইয়ের নিখুঁততা নিশ্চিত করি। আমাদের দক্ষ কারিগরদের নিরলস পরিশ্রম ও ভালোবাসায় তৈরি হয় একেকটি মাস্টারপিস পাঞ্জাবি, কুর্তা এবং ঐতিহ্যবাহী পোশাক।
            </p>
            <div className="mission-quote">
              <blockquote>
                "আমাদের লক্ষ্য কেবল চমৎকার পোশাক তৈরি করা নয়, বরং আমাদের সংস্কৃতি ও আভিজাত্যকে পোশাকে ফুটিয়ে তোলা।"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ৩. কেন আমাদের বেছে নেবেন (Why Choose Us) */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-main-title text-white">আভিজাত্যের প্রতীক SUTO</h2>
          </div>

          <div className="features-grid">
            {/* ফিচার ১ */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <HiOutlineSparkles />
              </div>
              <h3>Premium Quality</h3>
              <p>১০০% প্রিমিয়াম সুতা এবং সেরা ফেব্রিক দিয়ে অত্যন্ত যত্ন ও আভিজাত্যের সাথে পোশাক তৈরি করা হয়।</p>
            </div>

            {/* ফিচার ২ */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <HiOutlineShieldCheck />
              </div>
              <h3>Authentic Heritage</h3>
              <p>আমাদের প্রতিটি ডিজাইন বাঙালি সংস্কৃতির গৌরবময় ঐতিহ্য ও আধুনিক রুচির নিখুঁত কম্বিনেশন।</p>
            </div>

            {/* ফিচার ৩ */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <HiOutlineTruck />
              </div>
              <h3>Fast Delivery</h3>
              <p>সারা দেশে দ্রুত এবং বিশ্বস্ত উপায়ে আপনার পছন্দের পোশাক আপনার ঠিকানায় পৌঁছে দেওয়া হয়।</p>
            </div>

            {/* ফিচার ৪ */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <RiLoopLeftLine />
              </div>
              <h3>Easy Exchanges</h3>
              <p>সাইজ বা ফিটিং নিয়ে কোনো সমস্যা হলে রয়েছে খুব সহজে পণ্য পরিবর্তনের সহজ সুবিধা।</p>
            </div>
          </div>
        </div>
      </section>

      {/* ৪. ব্র্যান্ড ভ্যালু ও বিশ্বাসযোগ্যতা (Trust Signals) */}
      <section className="brand-values-section container">
        <div className="values-header">
          <span className="section-tag">Our Values</span>
          <h2 className="section-main-title">আমাদের প্রতিশ্রুতি ও মূলনীতি</h2>
        </div>
        <div className="values-grid">
          <div className="value-item">
            <span className="value-num">01</span>
            <h4>শতভাগ কাস্টমার সন্তুষ্টি</h4>
            <p>আমাদের ক্রেতাদের হাসিমুখই আমাদের ব্যবসার মূল চালিকাশক্তি। আমরা কাস্টমার এক্সপেরিয়েন্সকে সর্বোচ্চ গুরুত্ব দেই।</p>
          </div>
          <div className="value-item">
            <span className="value-num">02</span>
            <h4>দেশী কারিগরদের সমর্থন</h4>
            <p>আমাদের সমস্ত কাজ ও উৎপাদন প্রক্রিয়ায় দেশীয় তাঁতশিল্পী ও দক্ষ দর্জি কারিগরদের কাজের সুযোগ সৃষ্টি করা হয়।</p>
          </div>
          <div className="value-item">
            <span className="value-num">03</span>
            <h4>পরিবেশ-বান্ধব উৎপাদন</h4>
            <p>আমরা আমাদের ফেব্রিক প্রসেসিং এবং প্যাকেজিংয়ে পরিবেশ-বান্ধব উপাদান ব্যবহারের যথাসাধ্য চেষ্টা করি।</p>
          </div>
        </div>
      </section>

      {/* ৫. কন্টাক্ট ইনফো ও লিংক (Contact Info Brief) */}
      <section className="about-contact-section">
        <div className="container contact-box-wrapper">
          <div className="contact-info-left">
            <span className="section-tag">Get in Touch</span>
            <h2>যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন</h2>
            <p>আপনার কোনো প্রশ্ন, অভিযোগ বা পরামর্শ থাকলে নির্দ্বিধায় যোগাযোগ করুন। আমাদের সাপোর্ট টিম সর্বদা প্রস্তুত।</p>
            
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <HiOutlinePhone className="c-icon" />
                <div>
                  <span>Phone Number</span>
                  <p>+880 1700-000000</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <HiOutlineMail className="c-icon" />
                <div>
                  <span>Email Address</span>
                  <p>support@sutoheritage.com</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <HiOutlineLocationMarker className="c-icon" />
                <div>
                  <span>Our Atelier / Office</span>
                  <p>Road 12, Banani, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-cta-right">
            <h3>নতুন কালেকশন অন্বেষণ করুন</h3>
            <p>আমাদের লেটেস্ট ডিজাইন ও এক্সক্লুসিভ কালেকশনগুলো দেখতে শপ পেইজ ভিজিট করুন।</p>
            <Link to="/products" className="btn-elegant about-cta-btn">
              Explore Shop <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;