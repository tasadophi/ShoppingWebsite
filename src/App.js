import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products/Products";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product/Product";
import { getDataApi, initCart } from "./redux/productsSlice";
import SignUpForm from "./pages/SignUpForm/SignUpForm";
import LoginForm from "./pages/LoginForm/LoginForm";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";

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
    </Layout>
  );
}

export default App;
