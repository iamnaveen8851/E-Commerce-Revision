import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import ProductPage from "../pages/ProductPage";
import PrivateRoute from "./PrivateRoute";
const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/:product_id"
        element={
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
