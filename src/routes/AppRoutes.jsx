import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// pages
import Home from "../pages/client/home/Home";
import Shop from "../pages/client/Shop/Shop";
import ProductDetails from "../pages/client/Shop/ProductDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
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
    </BrowserRouter>
  );
};

export default AppRoutes;
