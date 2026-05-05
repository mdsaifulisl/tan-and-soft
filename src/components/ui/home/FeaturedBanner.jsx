import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineTag, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";


// ডাটাবেজ থেকে পাওয়া আপনার সম্পূর্ণ ডাটা অবজেক্ট
const offerFromDB = {
  _id: "65e2b812f8c5b927a41234cd",
  title: "Eid Special Collection",
  subtitle: "Limited Time Offer",
  discountText: "Flat 20% OFF",
  discountType: "percentage",
  discountValue: 20,
  promoCode: "EID20",
  description: "Celebrate this Eid with our premium heritage Panjabis and Kurtas. Designed with pure cotton and hand-crafted embroidery to elevate your festive look.",
  bgImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop",
  targetLink: "/products?collection=eid",
  startDate: "2026-05-01T00:00:00.000Z", 
  endDate: "2026-05-15T23:59:59.000Z", 
  status: "active", 
  isActive: true,
  createdAt: "2026-05-05T10:30:00.000Z",
  updatedAt: "2026-05-05T19:21:00.000Z"
};

const FeaturedBanner = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  // ১. কাউন্টডাউন ক্যালকুলেশন লজিক
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const start = new Date(offerFromDB.startDate);
      const end = new Date(offerFromDB.endDate);

      // অফারটি লাইভ হওয়ার কন্ডিশন
      if (offerFromDB.isActive && now >= start && now <= end) {
        setIsLive(true);
        const difference = end - now;

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsLive(false);
      }
    };

    calculateTime(); // প্রথমবার রান করার জন্য
    const timer = setInterval(calculateTime, 1000); // প্রতি সেকেন্ডে আপডেট হবে

    return () => clearInterval(timer);
  }, []);

  // ২. প্রোমো কোড কপি করার লজিক
  const handleCopyCode = () => {
    if (offerFromDB.promoCode) {
      navigator.clipboard.writeText(offerFromDB.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }
  };


  if (!isLive) return null;

  return (
    <section
      className="featured-banner-section"
      style={{ backgroundImage: `url(${offerFromDB.bgImage})` }}
    >
      <div className="banner-overlay"></div>

      <div className="container banner-container">
        <div className="banner-content">
          <span className="banner-tag text-primary">{offerFromDB.subtitle}</span>

          <h2 className="heading1 banner-title">
            {offerFromDB.title} <br />
            <span className="discount-highlight">{offerFromDB.discountText}</span>
          </h2>

          <p className="banner-desc">{offerFromDB.description}</p>

          {/* প্রোমো কোড সেকশন (যদি ডাটাবেজে থাকে) */}
          {offerFromDB.promoCode && (
            <div className="promo-code-container">
              <span className="promo-label">
                <HiOutlineTag /> Use Code:
              </span>
              <div className="promo-box" onClick={handleCopyCode} title="Click to copy code">
                <span className="code-text">{offerFromDB.promoCode}</span>
                <button className="copy-btn">
                  {copied ? <HiCheck className="copied-icon" /> : <HiOutlineClipboardCopy />}
                </button>
              </div>
            </div>
          )}

          {/* কাউন্টডাউন টাইমার */}
          <div className="countdown-wrapper">
            <div className="countdown-box">
              <span className="time-num">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="time-label">Days</span>
            </div>
            <div className="countdown-divider">:</div>
            <div className="countdown-box">
              <span className="time-num">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="countdown-divider">:</div>
            <div className="countdown-box">
              <span className="time-num">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="time-label">Mins</span>
            </div>
            <div className="countdown-divider">:</div>
            <div className="countdown-box">
              <span className="time-num">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="time-label">Secs</span>
            </div>
          </div>

          <div className="banner-action">
            <Link to={offerFromDB.targetLink} className="btn-elegant no-decoration">
              Claim Offer Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;