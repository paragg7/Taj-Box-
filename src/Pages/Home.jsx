import React from "react";
import Hero from "@/components/Hero";
import Category from "@/components/Category";
import ProductsSection from "@/components/ProductsSection";
import { products } from "@/products/Item";

const Home = () => {
  const filterByCategory = (category) =>
    products.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );

  return (
    <div className="w-full">
      <div className="space-y-8 md:space-y-12 lg:space-y-14">
        <Hero />

        <ProductsSection
          title="Best Sellers"
          products={products.filter((p) => p.isBestSeller)}
          link="/shop/best-sellers"
        />

        <Category />

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
      </div>
    </div>
  );
};

export default Home;
