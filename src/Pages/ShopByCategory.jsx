import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../products/Item";
import Products from "@/components/Products";

const toSlug = (str = "") =>
  String(str)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ShopByCategory = () => {
  const { category } = useParams();

  const filtered = (() => {
    switch (category) {
      case "best-sellers":
        return products.filter((p) => p.isBestSeller === true);
      case "new-arrivals":
        return products.filter((p) => p.isNew === true);
      case "all":
        return products;
      default:
        // ✅ match URL slug with product category slug
        return products.filter((p) => toSlug(p.category) === toSlug(category));
    }
  })();

  const title =
    category === "best-sellers"
      ? "Best Sellers"
      : category === "new-arrivals"
      ? "New Arrivals"
      : category === "all"
      ? "All Products"
      : category
          ?.replace(/-/g, " ")
          ?.replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-semibold uppercase text-gray-900">
          {title}
        </h1>

        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium text-gray-900">{filtered.length}</span>{" "}
          products
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="block">
              <Products
                image1={product.image1}
                image2={product.image2}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                discount={product.discount}
                colors={product.colors}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No products found in "{title}".
        </div>
      )}
    </main>
  );
};

export default ShopByCategory;
