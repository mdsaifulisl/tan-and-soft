

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'solid', // solid, outline, or ghost
  className = '', 
  loading = false, 
  fullWidth = false,
  ...props 
}) => {
  
  // বেস স্টাইল এবং আপনার দেওয়া কালার ভ্যারিয়েন্ট অনুযায়ী লজিক
  const baseStyle = "btn-elegant-base d-inline-flex align-items-center justify-content-center transition-all";
  
  const variants = {
    solid: "btn-elegant",
    outline: "btn-elegant-outline",
    ghost: "bg-transparent text-primary border-0"
  };

  const widthStyle = fullWidth ? "w-100" : "";
  const loadingStyle = loading ? "opacity-75 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${widthStyle} ${loadingStyle} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          প্রসেসিং...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;