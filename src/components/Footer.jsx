import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const linkBase =
    "text-black/70 hover:text-black transition underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30";

  return (
    <footer className="mt-12 border border-black/10 xs:mt-14 sm:mt-20 lg:mt-24 bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex flex-col gap-6 py-8 xs:py-9 sm:py-12 md:flex-row md:items-start md:justify-between">
          {/* LEFT: Brand + subtitle */}
          <div className="min-w-0 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-baseline gap-3">
              <span className="text-lg xs:text-xl font-semibold uppercase tracking-wide">
                TAJ BOXES
              </span>
              {/* tiny premium cue */}
              <span className="text-[11px] uppercase tracking-[0.25em] text-black/50">
                Wedding Packaging
              </span>
            </div>

            <p className="mt-2 text-sm sm:text-[15px] text-black/70 max-w-md mx-auto md:mx-0">
              Luxury wedding packaging &amp; bespoke invitation boxes
            </p>

            {/* subtle utility */}
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-black/60 hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              aria-label="Back to top"
            >
              Back to top <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT: Contact */}
          <div className="text-sm sm:text-[15px] text-black/70 text-center md:text-right">
            <div className="text-xs uppercase tracking-[0.22em] text-black/50">
              Contact
            </div>

            <a
              href="tel:+919468480991"
              className={`mt-2 inline-block font-medium text-black/80 hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
            >
              +91 9468480991
            </a>

            <div className="mt-1">
              <a
                href="mailto:tajboxes@gmail.com"
                className={linkBase}
              >
                tajboxes@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-black/10" />

        {/* MIDDLE GRID */}
        <div className="py-8 xs:py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-14 text-center sm:text-left">
              {/* About us */}
              <div className="sm:pr-6 lg:pr-8">
                <h4 className="text-sm font-semibold">About us</h4>
                <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-black/70 max-w-sm mx-auto sm:mx-0">
                  Taj Boxes is a luxury wedding packaging brand crafting bespoke
                  invitation and gift boxes that reflect tradition, elegance,
                  and refined artistry.
                </p>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-sm font-semibold">Support</h4>
                <ul className="mt-4 space-y-2 text-sm sm:text-[15px]">
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

              {/* Navigation */}
              <div>
                <h4 className="text-sm font-semibold">Navigation</h4>
                <ul className="mt-4 space-y-2 text-sm sm:text-[15px]">
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

              {/* Follow Us */}
              <div>
                <h4 className="text-sm font-semibold">Follow Us</h4>

                {/* Premium: compact icon row + accessible labels */}
                <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="h-10 w-10 border border-black/10 grid place-items-center hover:border-black/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                  >
                    <Facebook className="w-4 h-4 text-black/70" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="h-10 w-10 border border-black/10 grid place-items-center hover:border-black/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                  >
                    <Instagram className="w-4 h-4 text-black/70" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="h-10 w-10 border border-black/10 grid place-items-center hover:border-black/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                  >
                    <Twitter className="w-4 h-4 text-black/70" />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="h-10 w-10 border border-black/10 grid place-items-center hover:border-black/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                  >
                    <Linkedin className="w-4 h-4 text-black/70" />
                  </a>
                </div>

                {/* Optional: tiny hint text */}
                <p className="mt-3 text-sm sm:text-[15px] text-black/70">
                  Follow for new launches &amp; custom work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-black/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-mono text-black/60 text-center sm:text-left">
            © {new Date().getFullYear()} Designed &amp; Developed by{" "}
            <span className="font-bold text-black/80">Parag</span>
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className={linkBase}>
              Privacy
            </Link>
            <Link to="/terms" className={linkBase}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
