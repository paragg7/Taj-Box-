import React from "react";
import { Link } from "react-router-dom";
import { Instagram, ArrowUpRight } from "lucide-react";
import ViewCounter from "./ViewCounter";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sectionTitle =
    "text-[10px] uppercase tracking-[0.24em] text-[#1E2220]/45 font-medium";

  const linkBase =
    "text-sm sm:text-[15px] text-[#1E2220]/68 transition hover:text-[#1E2220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30";

  return (
    <footer className=" border-t border-[#1E2220]/10  text-[#1E2220]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:py-12 md:grid-cols-[1.2fr_0.8fr] md:items-start lg:gap-16 lg:py-16">

          {/* LEFT */}
          <div className="max-w-2xl text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#1E2220]/45">
              Taj Boxes
            </p>

            <h2 className="mt-4 text-[28px] font-semibold leading-[1.08] sm:text-[34px] lg:text-[42px]">
              Luxury wedding packaging &amp; bespoke invitation boxes
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#1E2220]/65 sm:text-[15px]">
              Crafted to reflect elegance, celebration, and refined detailing
              in every box.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#1E2220]/55 transition hover:text-[#1E2220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30"
            >
              Back to top
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* RIGHT */}
          <div className="text-center md:text-right">
            <p className={sectionTitle}>Contact</p>

            <div className="mt-4 space-y-2">
              <a
                href="tel:+919468480991"
                className="block text-lg font-medium text-[#1E2220]/85 transition hover:text-[#1E2220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30 sm:text-[20px]"
              >
                +91 9468480991
              </a>

              <a
                href="mailto:tajboxes@gmail.com"
                className="inline-block text-sm text-[#1E2220]/68 transition hover:text-[#1E2220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30 sm:text-[15px]"
              >
                tajboxes@gmail.com
              </a>
            </div>

            <div className="mt-6 flex justify-center md:justify-end">
              <a
                href="https://www.instagram.com/tajboxes"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center border border-[#1E2220]/10 transition hover:border-[#1E2220]/25 hover:bg-[#1E2220]/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30"
              >
                <Instagram className="h-4 w-4 text-[#1E2220]/70" />
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[#1E2220]/10" />

        {/* MIDDLE */}
        <div className="grid grid-cols-1 gap-10 py-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-16 lg:py-14">

          {/* ABOUT */}
          <div className="max-w-md">
            <h4 className={sectionTitle}>About us</h4>
            <p className="mt-4 text-sm leading-7 text-[#1E2220]/65 sm:text-[15px]">
              Taj Boxes is a luxury wedding packaging brand crafting bespoke
              invitation and gift boxes that reflect tradition, elegance, and
              refined artistry.
            </p>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className={sectionTitle}>Support</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/shipping" className={linkBase}>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={linkBase}>
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/customization" className={linkBase}>
                  Customization Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className={linkBase}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className={sectionTitle}>Navigation</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className={linkBase}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className={linkBase}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className={linkBase}>
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-[#1E2220]/10" />

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-center text-[12px] text-[#1E2220]/55 sm:text-left">
            © {new Date().getFullYear()} Taj Boxes. Designed &amp; Developed by{" "}
            <button
              onClick={() =>
                window.open("https://www.instagram.com/_paragg/", "_blank")
              }
              className="text-[#1E2220]/75 underline underline-offset-4 transition hover:text-[#1E2220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30"
            >
              Parag
            </button>
          </p>

          <div className="flex justify-center sm:justify-end">
            <ViewCounter pageKey="home" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;