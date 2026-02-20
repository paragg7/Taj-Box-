import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { products } from "../products/Item";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Package, Truck } from "lucide-react";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
const parseMoney = (value) =>
  Number(
    String(value ?? "")
      .replace(/,/g, "")
      .trim(),
  ) || 0;

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

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

    const packPrice = p?.[selectedPack];
    if (packPrice !== undefined && packPrice !== null) {
      return parseMoney(packPrice);
    }

    const basePrice = p?.[25];
    if (basePrice !== undefined && basePrice !== null) {
      return parseMoney(basePrice);
    }

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

  // --------------------------
  // Gallery UX (premium)
  // --------------------------
  const activeIndex = useMemo(() => {
    const idx = images.findIndex((x) => x === activeImage);
    return idx >= 0 ? idx : 0;
  }, [images, activeImage]);

  const goPrev = useCallback(() => {
    if (!images.length) return;
    const next = (activeIndex - 1 + images.length) % images.length;
    setActiveImage(images[next]);
  }, [activeIndex, images]);

  const goNext = useCallback(() => {
    if (!images.length) return;
    const next = (activeIndex + 1) % images.length;
    setActiveImage(images[next]);
  }, [activeIndex, images]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  // Hover zoom without libraries (premium feel)
  const stageRef = useRef(null);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });

  const onMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setZoom((z) => ({ ...z, x: clamp(x, 0, 100), y: clamp(y, 0, 100) }));
  };

  const onEnter = () => setZoom((z) => ({ ...z, on: true }));
  const onLeave = () => setZoom((z) => ({ ...z, on: false }));

  // Small helper to show correct currency formatting
  const formatINR = (v) => `Rs.${Number(v || 0).toLocaleString("en-IN")}.00`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Premium, simple layout: clear columns + strong borders (no shadows, no rounded) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 lg:gap-16 items-start">
        {/* LEFT – IMAGES */}
        <section className="self-start lg:sticky lg:top-24">
          {/* Title line for UX */}
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Product Images
            </p>
            {images.length > 1 && (
              <p className="text-xs text-gray-500">
                {activeIndex + 1} / {images.length}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-[96px_1fr] gap-4">
            {/* Thumbs (desktop left) */}
            <div className="hidden lg:flex flex-col gap-2">
              {images.map((img, i) => {
                const active = activeImage === img;
                return (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={[
                      "w-24 h-24 overflow-hidden border transition",
                      active
                        ? "border-black"
                        : "border-black/15 hover:border-black/40",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                    ].join(" ")}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={active}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main stage */}
            <div className="border border-black/10 bg-gray-50">
              <div
                ref={stageRef}
                onMouseMove={onMove}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className="relative h-[360px] xs:h-[420px] sm:h-[520px] lg:h-[640px] w-full overflow-hidden select-none"
                aria-label="Product image zoom stage"
              >
                <img
                  src={activeImage || images[0]}
                  alt={product.name}
                  className={[
                    "w-full h-full object-cover transition-transform duration-200",
                    zoom.on ? "scale-[1.45]" : "scale-100",
                  ].join(" ")}
                  style={{
                    transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  }}
                  draggable={false}
                  decoding="async"
                />

                {/* Minimal controls (premium, no rounded, no shadow) */}
                {images.length > 1 && (
                  <>
                    
    

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/10">
                      <div
                        className="h-full bg-black transition-all duration-300"
                        style={{
                          width: `${((activeIndex + 1) / images.length) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Hint */}
                    <div className="absolute top-3 left-3 border border-black/20 bg-white px-3 py-1 text-xs text-gray-700">
                      Hover to zoom
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbs (mobile bottom strip) */}
            {images.length > 1 && (
              <div className="lg:hidden -mx-4 px-4 overflow-x-auto">
                <div className="flex gap-2 py-3">
                  {images.map((img, i) => {
                    const active = activeImage === img;
                    return (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={[
                          "shrink-0 w-20 h-20 overflow-hidden border transition",
                          active
                            ? "border-black"
                            : "border-black/15 hover:border-black/40",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                        ].join(" ")}
                        aria-label={`View image ${i + 1}`}
                        aria-pressed={active}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-gray-500 pb-2">
                  Swipe thumbnails • Use ← → keys on desktop
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT – PRODUCT INFO */}
        <section className="flex flex-col gap-6">
          {/* Header block */}
          <header className="">
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
              {product.category}
            </p>

            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </header>

          {/* Pricing / Pack box (kept structure, upgraded container) */}
          <div className="border border-black/10 bg-white">
            <div className="px-5 py-5 border-b border-black/10">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Price
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                From ₹{product.price}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Select a pack to see accurate pricing instantly.
              </p>
            </div>

            <div className="px-5 py-5 border-b border-black/10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">
                  Select Pack
                </p>

                <p className="text-sm text-gray-600">
                  Unit:{" "}
                  <span className="font-medium text-gray-900">
                    {formatINR(unitPrice)}
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
                        "h-12 text-sm font-semibold transition border",
                        active
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-900 border-black/10 hover:border-black/25 hover:bg-gray-50",
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

            {/* CTA area */}
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
                  {formatINR(totalPrice)}
                </p>
              </div>

              <div className="mt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full bg-black text-white py-3.5 sm:py-4 font-semibold hover:bg-black/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
                    Order On Whatsapp
                  </button>
                </a>

                {/* ✅ YOUR EXACT BLOCK (unchanged) */}

                <div
                  id="bulk-order"
                  className="mt-5  border border-black/10  p-4 sm:p-5 "
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        Bulk Order
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Need custom quantity or pricing? Contact us and we’ll
                        respond fast.
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      href={bulkOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      aria-label="Contact on WhatsApp for bulk order"
                    >
                      <button className="w-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:border-black/35 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
                        <span className="flex items-center justify-center gap-2">
                          <MessageCircle className="h-4 w-4 text-black/70 group-hover:text-black" />
                          WhatsApp
                        </span>
                      </button>
                    </a>

                    <a
                      href={callUrl}
                      className="group"
                      aria-label="Call now for bulk order"
                    >
                      <button className="w-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:border-black/35 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
                        <span className="flex items-center justify-center gap-2">
                          <Phone className="h-4 w-4 text-black/70 group-hover:text-black" />
                          Call Now
                        </span>
                      </button>
                    </a>
                  </div>

                  {/* Trust microcopy */}
                  <p className="mt-3 text-xs text-gray-500">
                    Available 10am–7pm • Typical reply within 15–30 mins
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Accordions (clean, premium, no rounding) */}
          <div className="border border-black/10 bg-white">
            <button
              onClick={() => setIsDescriptionOpen((v) => !v)}
              className="w-full px-5 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              aria-expanded={isDescriptionOpen}
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

          <div className="border border-black/10 bg-white">
            <button
              onClick={() => setIsShippingOpen((v) => !v)}
              className="w-full px-5 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              aria-expanded={isShippingOpen}
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
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
