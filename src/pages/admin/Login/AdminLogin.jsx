import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";

// CSS স্টাইল
import "../../../style/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  // ফর্ম স্টেট
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // স্টেট হ্যান্ডলিং
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // পাসওয়ার্ড টগল হ্যান্ডলার
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // সাবমিট হ্যান্ডলার
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // প্রাথমিক ইনপুট ভ্যালিডেশন
    if (!email.trim() || !password.trim()) {
      setErrorMessage("দয়া করে ইমেইল এবং পাসওয়ার্ড দুটিই প্রদান করুন।");
      return;
    }

    setIsLoading(true);

    // ডামি অথেন্টিকেশন লজিক (আপনার ব্যাকএন্ড এপিআই-এর সাথে কানেক্ট করার জন্য প্রস্তুত)
    setTimeout(() => {
      if (email === "admin@sutoheritage.com" && password === "suto1234") {
        setIsLoading(false);
        // লোকাল স্টোরেজে ডামি টোকেন সেট করা
        localStorage.setItem("adminToken", "suto_secure_token_abc123");
        // সাকসেসফুল লগইন হলে ড্যাশবোর্ডে রিডাইরেক্ট করুন
        navigate("/admin/dashboard");
      } else {
        setIsLoading(false);
        setErrorMessage("ভুল ইমেইল অথবা পাসওয়ার্ড! পুনরায় চেষ্টা করুন।");
      }
    }, 1500); // ১.৫ সেকেন্ড প্রসেসিং এফেক্ট
  };

  return (
    <div className="admin-login-page">
      <div className="login-card-container animate-slide-up">
        
        {/* ব্র্যান্ড লোগো এবং টাইটেল */}
        <div className="login-header">
          <div className="brand-logo-glow">
            <span className="logo-text">SUTO</span>
          </div>
          <h1 className="brand-name">SUTO Heritage</h1>
          <p className="login-subtitle">Admin Control Portal</p>
        </div>

        {/* এরর মেসেজ বক্স */}
        {errorMessage && (
          <div className="login-error-alert animate-shake">
            <IoWarningOutline className="error-alert-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* লগইন ফর্ম */}
        <form onSubmit={handleLogin} className="login-form">
          
          {/* ইমেইল ফিল্ড */}
          <div className="form-group-login">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <HiOutlineMail className="input-field-icon" />
              <input
                type="email"
                id="email"
                placeholder="admin@sutoheritage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div className="form-group-login">
            <div className="password-label-row">
              <label htmlFor="password">Password</label>
              <span className="forgot-password-link">Forgot?</span>
            </div>
            <div className="input-with-icon">
              <HiOutlineLockClosed className="input-field-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                tabIndex="-1"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
          </div>

          {/* সাইন ইন বাটন */}
          <button 
            type="submit" 
            className="btn-elegant login-submit-btn" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="login-spinner-wrapper">
                <div className="login-btn-spinner"></div>
                <span>Securing Connection...</span>
              </div>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 SUTO Heritage. All Rights Reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;