import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HiOutlineViewGrid, 
  HiOutlineShoppingBag, 
  HiOutlineClipboardList, 
  HiOutlineUsers, 
  HiOutlineLogout 
} from "react-icons/hi";

const Sidebar = ({ isSidebarOpen, handleLogout }) => {
  const location = useLocation();

  // সাইডবার মেনু আইটেমসমূহ
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <HiOutlineViewGrid />
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <HiOutlineShoppingBag />
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <HiOutlineClipboardList />
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <HiOutlineUsers />
    }
  ];

  return (
    <aside className="admin-sidebar">
      {/* লোগো ও ব্র্যান্ডিং */}
      <div className="sidebar-logo-section">
        <div className="admin-logo-badge">S</div>
        <span className="admin-brand-name">SUTO Admin</span>
      </div>

      {/* নেভিগেশন মেনু */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive ? "active-link" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* সাইডবার ফুটার (লগআউট বাটন) */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout-btn">
          <HiOutlineLogout />
          <span className="nav-text">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;