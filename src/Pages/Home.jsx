import React from "react";
import Hero from "@/components/Hero";
import Category from "@/components/Category";
import ProductsSection from "@/components/ProductsSection";
import { products } from "@/products/Item";
import Reviews from "@/components/Reviews";

const Home = () => {
  const filterByCategory = (category) =>
    products.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase(),
    );
  return (
    <div className="w-full">
      <div className="space-y-8 md:space-y-12 lg:space-y-14">
        <Hero />
        <Category />
        {/* <ProductsSection
          title="Best Sellers"
          products={products.filter((p) => p.isBestSeller)}
          link="/shop/best-sellers"
        /> */}

        <ProductsSection
          title="MDF Boxes"
          products={filterByCategory("mdf box")}
          link="/shop/mdf-box"
        />

        <ProductsSection
          title="File Boxes"
          products={filterByCategory("file box")}
          link="/shop/file-box"
        />

        <ProductsSection
          title="Dhollu"
          products={filterByCategory("dhollu")}
          link="/shop/dhollu"
        />
        <ProductsSection
          title="hamper boxes"
          products={filterByCategory("hamper box")}
          link="/shop/hamper-box"
        />
        
        <ProductsSection
          title="platter boxes"
          products={filterByCategory("platter box")}
          link="/shop/platter-box"
        />
        <ProductsSection
          title="sweets boxes"
          products={filterByCategory("sweets box")}
          link="/shop/sweets-box"
        />

        <Reviews />
      </div>
    </div>
  );
};

export default Home;
