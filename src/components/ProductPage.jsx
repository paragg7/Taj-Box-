import React, { useMemo, useState, useEffect } from "react";
import { products } from "../products/Item";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Package, Truck } from "lucide-react";

const parseMoney = (value) =>
  Number(
    String(value ?? "")
      .replace(/,/g, "")
      .trim(),
  ) || 0;

const ProductPage = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));
  if (!product) return null;

  // ✅ supports 2, 3, or 4 images (or more if you add later)
  const images = useMemo(() => {
    return [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
    ].filter(Boolean);
  }, [product.image1, product.image2, product.image3, product.image4]);

  const [activeImage, setActiveImage] = useState(images[0]);

  // ✅ keep active image valid when switching products / image counts change
  useEffect(() => {
    setActiveImage((prev) => (images.includes(prev) ? prev : images[0]));
  }, [images]);

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  const PACKS = [25, 50, 100];
  const [selectedPack, setSelectedPack] = useState(25);

  // ✅ FIXED: reads pricing per pack (25/50/100) from Item.jsx
  const unitPrice = useMemo(() => {
    const p = product.pricing;

    // direct match
    const packPrice = p?.[selectedPack];
    if (packPrice !== undefined && packPrice !== null) {
      return parseMoney(packPrice);
    }

    // fallback to 25 pack as base
    const basePrice = p?.[25];
    if (basePrice !== undefined && basePrice !== null) {
      return parseMoney(basePrice);
    }

    // last fallback (old field)
    return parseMoney(product.price);
  }, [product, selectedPack]);

  const totalPrice = useMemo(
    () => selectedPack * unitPrice,
    [selectedPack, unitPrice],
  );

  const phoneNumber = "919468480991";

  const whatsappUrl = useMemo(() => {
    const message = `Hello, I want to order:

Product: ${product.name}
Category: ${product.category}
Pack: ${selectedPack} boxes
Unit Price: Rs.${unitPrice.toLocaleString("en-IN")}.00
Total Price: Rs.${totalPrice.toLocaleString("en-IN")}.00

Product Page: ${window.location.href}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }, [product.name, product.category, selectedPack, unitPrice, totalPrice]);

  const bulkOrderUrl = useMemo(() => {
    const bulkMessage = `Hello, I want to place a bulk order.

Product: ${product.name}
Category: ${product.category}
Product Page: ${window.location.href}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(bulkMessage)}`;
  }, [product.name, product.category]);

  const callUrl = `tel:+${phoneNumber}`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 sm:gap-10 lg:gap-14 items-start">
        {/* LEFT – IMAGES */}
        <div className="self-start lg:sticky lg:top-24">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 sm:gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0">
              {images.map((img, i) => {
                const active = activeImage === img;
                return (
                  <button
                    key={img} // ✅ better than index
                    onClick={() => setActiveImage(img)}
                    className={[
                      "shrink-0 w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
                      "rounded-sm overflow-hidden transition",
                      "border-2",
                      active
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                    ].join(" ")}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={active}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Image */}
            <div className="order-1 lg:order-2 bg-gray-100 rounded-sm overflow-hidden w-full">
              <div className="h-[360px] xs:h-[420px]  sm:h-[520px] lg:h-[600px] w-full">
                <img
                  src={activeImage || images[0]} // ✅ safety
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT – PRODUCT INFO */}
        <div className="flex flex-col gap-5 lg:gap-6 pr-0 lg:pr-2">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
            {product.category}
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* ✅ KEEP THIS SECTION EXACTLY (no changes) */}
          <section className="rounded-sm border border-black/10 bg-white">
            {/* PRICE */}
            <div className="px-5 py-5 border-b border-black/10">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Price
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                From ₹{product.price}
              </p>
            </div>

            {/* PACK SELECTION */}
            <div className="px-5 py-5 border-b border-black/10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">
                  Select Pack
                </p>

                <p className="text-sm text-gray-600">
                  Unit:{" "}
                  <span className="font-medium text-gray-900">
                    Rs.{unitPrice.toLocaleString("en-IN")}.00
                  </span>
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {PACKS.map((p) => {
                  const active = selectedPack === p;

                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPack(p)}
                      className={[
                        "h-12 rounded-sm text-sm font-semibold transition",
                        "border",
                        active
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-900 border-black/10 hover:border-black/20 hover:bg-gray-50",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                      ].join(" ")}
                      aria-pressed={active}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TOTAL (RESULT SECTION) */}
            <div className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Total
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedPack} boxes
                  </p>
                </div>

                <p className="text-2xl font-bold text-gray-900">
                  Rs.{totalPrice.toLocaleString("en-IN")}.00
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-black/10">
                <p className="text-sm text-gray-600">
                  For bulk order contact{" "}
                  <a
                    href={bulkOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    WhatsApp
                  </a>{" "}
                  or{" "}
                  <a
                    href={callUrl}
                    className="text-gray-900 font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    Call
                  </a>
                </p>
              </div>
            </div>
          </section>

          <div className="flex gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className="w-full bg-black text-white py-3.5 sm:py-4 rounded-sm font-semibold hover:bg-black/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
                Order On Whatsapp
              </button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-sm border border-black/10 bg-white px-4 py-3 flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-700" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Premium Packaging
                </p>
                <p className="text-xs text-gray-600">Safe & secure packing</p>
              </div>
            </div>

            <div className="rounded-sm border border-black/10 bg-white px-4 py-3 flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-700" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  3–4 Working Days
                </p>
                <p className="text-xs text-gray-600">Fast dispatch</p>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-black/10 bg-white">
            <button
              onClick={() => setIsDescriptionOpen((v) => !v)}
              className="w-full px-5 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
            >
              <h3 className="font-semibold text-gray-900">
                Description &amp; Fit
              </h3>
              {isDescriptionOpen ? <ChevronUp /> : <ChevronDown />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out border-t border-black/10 ${
                isDescriptionOpen
                  ? "max-h-[900px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 py-5 space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>{product.description || "Description coming soon."}</p>

                {Array.isArray(product.features) &&
                  product.features.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2">
                      {product.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-black/10 bg-white">
            <button
              onClick={() => setIsShippingOpen((v) => !v)}
              className="w-full px-5 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
            >
              <h3 className="font-semibold text-gray-900">Shipping</h3>
              {isShippingOpen ? <ChevronUp /> : <ChevronDown />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out border-t border-black/10 ${
                isShippingOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 py-5 grid grid-cols-1 xs:grid-cols-2 gap-4 text-sm">
                <div className="flex gap-3 items-center">
                  <Package className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-800">Premium Packaging</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Truck className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-800">3–4 Working Days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-2 sm:h-4" />
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
