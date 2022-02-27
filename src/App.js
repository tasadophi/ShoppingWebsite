import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products/Products";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product/Product";
import { getDataApi } from "./redux/productsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataApi());
  }, []);
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products">
          <Route path="/products/:group" element={<Products />} />
          <Route path="/products/:group/:productId" element={<Product />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
