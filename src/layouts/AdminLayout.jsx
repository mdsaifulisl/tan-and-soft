import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  HiOutlineMenuAlt2,
  HiOutlineBell,
  HiOutlineChevronDown
} from "react-icons/hi";

// নতুন আলাদা করা সাইডবার কম্পোনেন্ট ইম্পোর্ট করুন
import Sidebar from "../components/layout/Sidebar";

// CSS স্টাইল
import "../style/AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // সাইডবার টগল করার ফাংশন
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // লগআউট ফাংশন
  const handleLogout = () => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে লগআউট করতে চান?")) {
      localStorage.removeItem("adminToken"); // টোকেন ক্লিয়ার করুন
      navigate("/admin/login"); // লগইন পেজে রিডাইরেক্ট করুন
    }
  };

  // টপবারে ডায়নামিক পেজ টাইটেল দেখানোর জন্য
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("products")) return "Products";
    if (path.includes("orders")) return "Orders";
    if (path.includes("customers")) return "Customers";
    return "Control Panel";
  };

  return (
    <div className={`admin-layout ${isSidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"}`}>
      
      {/* ১. ওভারলে (মোবাইলে সাইডবার খোলা থাকলে ব্যাকগ্রাউন্ড আবছা করার জন্য) */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* ২. আলাদা করা সাইডবার কম্পোনেন্ট কল করা হলো */}
      <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />

      {/* ৩. মূল বিষয়বস্তুর অংশ (Header + Page Content) */}
      <div className="admin-main-wrapper">
        
        {/* টপবার (Topbar Header) */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
              <HiOutlineMenuAlt2 />
            </button>
            <h2 className="topbar-page-title">{getPageTitle()}</h2>
          </div>

          <div className="topbar-right">
            {/* নোটিফিকেশন বেল */}
            <button className="topbar-action-btn">
              <HiOutlineBell />
              <span className="notification-badge"></span>
            </button>

            {/* প্রোফাইল ড্রপডাউন */}
            <div className="admin-profile-dropdown">
              <div 
                className="profile-trigger" 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="profile-avatar">A</div>
                <div className="profile-info-text">
                  <span className="admin-name">Super Admin</span>
                  <span className="admin-role">Owner</span>
                </div>
                <HiOutlineChevronDown className={`chevron-icon ${isProfileOpen ? "rotated" : ""}`} />
              </div>

              {isProfileOpen && (
                <>
                  <div className="dropdown-click-overlay" onClick={() => setIsProfileOpen(false)}></div>
                  <ul className="profile-dropdown-menu">
                    <li><Link to="/admin/profile" onClick={() => setIsProfileOpen(false)}>My Profile</Link></li>
                    <li><Link to="/admin/settings" onClick={() => setIsProfileOpen(false)}>Settings</Link></li>
                    <hr className="dropdown-divider" />
                    <li><button onClick={handleLogout}>Sign Out</button></li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ডাইনামিক কন্টেন্ট রেন্ডার করার জায়গা */}
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;