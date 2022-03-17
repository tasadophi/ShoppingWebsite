import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products/Products";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Product from "./pages/Product/Product";
import { getDataApi, initCart } from "./redux/productsSlice";
import SignUpForm from "./pages/SignUpForm/SignUpForm";
import LoginForm from "./pages/LoginForm/LoginForm";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataApi());
    dispatch(initCart());
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const styles = {
    color: "#fff",
    fontSize: "1.7rem",
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products">
          <Route path="/products/:group" element={<Products />} />
          <Route path="/products/:group/:category" element={<Products />} />
          <Route
            path="/products/:group/:category/:productId"
            element={<Product />}
          />
        </Route>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ToastContainer rtl={true} theme="colored" style={styles} />
    </Layout>
  );
}

export default App;
