
import { HiStar } from 'react-icons/hi';

const Testimonials = () => {
  // কাস্টমার রিভিউ ডাটা (৩টি কাস্টম রিভিউ)
  const reviews = [
    {
      id: 1,
      name: "Tanvir Rahman",
      role: "Verified Buyer",
      stars: 5,
      comment: "The fabric quality of the Royal Cotton Panjabi is absolutely outstanding. It feels extremely premium and the embroidery details are very neat. Perfect for Eid!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Sajid Islam",
      role: "Regular Customer",
      stars: 5,
      comment: "I was skeptical about buying a ready-to-wear Dhuti online, but the fit is perfect and the silk blend has a gorgeous subtle shine. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Ahsan Habib",
      role: "Verified Buyer",
      stars: 4.8,
      comment: "Amazing customer service and fast delivery inside Dhaka. The Indigo Summer Casual Shirt is incredibly breathable and perfect for daily office wear.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="subtitle text-primary">Reviews</span>
          <h2 className="heading2 section-title">What Our Customers Say</h2>
          <div className="title-divider"></div>
        </div>

        {/* Testimonials Grid (3 Cards) */}
        <div className="testimonials-grid">
          {reviews.map((review) => (
            <div key={review.id} className="testimonial-card">
              {/* Decorative Quote Icon */}
              <span className="quote-mark">“</span>
              
              {/* Star Rating */}
              <div className="testimonial-stars">
                {[...Array(5)].map((_, index) => (
                  <HiStar 
                    key={index} 
                    className={`star-icon ${index < Math.floor(review.stars) ? 'active' : 'inactive'}`} 
                  />
                ))}
              </div>

              {/* Review Comment */}
              <p className="testimonial-comment">"{review.comment}"</p>

              {/* Customer Profile */}
              <div className="testimonial-user">
                <img src={review.avatar} alt={review.name} className="user-avatar" />
                <div className="user-info">
                  <h4 className="heading6 user-name">{review.name}</h4>
                  <span className="user-role">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;