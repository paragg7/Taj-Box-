import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./components/Footer";
import Preloader from "./util/Preloader";
import Oneko from "./lib/Oneko";
import Home from "./Pages/Home";
import ShopAll from "./Pages/ShopAll";
import Contact from "./Pages/Contact";
import ProductPage from "./components/ProductPage";
import Term from "./Pages/Terms";
import Shipping from "./Pages/Shipping";
import ScrollToTop from "./components/ScrollToTop";
import ShopByCategory from "./Pages/ShopByCategory";
import AllCategoriesPage from "./Pages/AllCategoriesPage";




const App = () => {
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);



  
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      <Navbar/>
      
      

      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {isDesktop && <Oneko />}
      

      <div className={loading ? "pointer-events-none" : ""}>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopAll />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop/:category" element={<ShopByCategory />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/terms" element={<Term />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/categories" element={<AllCategoriesPage />} /> 
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
