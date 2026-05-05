import { Link, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Scoroll to top
import ScrollToTop from "../components/Shared/ScrollToTop";

// pages
import Home from "../pages/client/home/Home";
import Shop from "../pages/client/Shop/Shop";
import ProductDetails from "../pages/client/Shop/ProductDetails";
import Cart from "../pages/client/Cart/Cart";
import Checkout from "../pages/client/Checkout/Checkout";
import Categories from "../pages/client/Categories/Categories";
import About from "../pages/client/About/About";
import OrderSuccess from "../pages/client/OrderSuccess/OrderSuccess";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

        <Route
          path="*"
          element={
            <>
              <div className="text-center">
                <h1 className="py-5">404 Not Found</h1>
                <Link to="/" className="btn-elegant-base btn-elegant">
                  Go Home
                </Link>
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
