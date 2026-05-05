import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Sample data for the slides. Replace image URLs with your actual asset paths.
const sliderData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop", // Placeholder for white panjabi
    slogan: "Timeless Elegance for Every Occasion",
    title: "The Eid Collection 2024",
    btnText: "Shop New Arrivals",
    link: "/products?collection=eid",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop", // Placeholder for shirt
    slogan: "A Modern Take on Tradition",
    title: "Signature Digital Prints",
    btnText: "View Collection",
    link: "/products?collection=digital-print",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop", // Placeholder for white panjabi
    slogan: "Timeless Elegance for Every Occasion",
    title: "The Eid Collection 2024",
    btnText: "Shop New Arrivals",
    link: "/products?collection=eid",
  },
];

const Hero = () => {
  return (
    <section className="hero-slider-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"} // Smooth fade transition for elegant look
        spaceBetween={0}
        slicePerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-inner"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Optional overlay to make text more readable */}
              <div className="slide-overlay"></div>

              <div className="header-container slide-content-wrapper">
                <div className="slide-content">
                  <p className="slide-slogan text-muted uppercase tracking-wider">
                    {slide.slogan}
                  </p>
                  <h2 className="heading1 slide-title text-dark">
                    {slide.title}
                  </h2>
                  <div className="slide-actions">
                    <Link to={slide.link} className="btn-elegant no-decoration">
                      {slide.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;



