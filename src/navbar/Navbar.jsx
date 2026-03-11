// src/components/Navbar/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

import { products } from "@/products/Item";
import useCategories from "@/hooks/useCategories";

import PremiumSearch from "./PremiumSearch";
import ShopMegaMenu from "./ShopMegaMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = useCategories(products);

  // hover shop menu
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const shopWrapRef = useRef(null);
  const closeTimerRef = useRef(null);

  const openShopMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setShopMenuOpen(true);
  };

  const closeShopMenu = () => {
    closeTimerRef.current = setTimeout(() => setShopMenuOpen(false), 140);
  };

  // outside click close shop menu
  useEffect(() => {
    const onDown = (e) => {
      if (!shopWrapRef.current) return;
      if (!shopWrapRef.current.contains(e.target)) setShopMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // lock scroll + esc to close mobile menu
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // esc to close tablet search overlay
  useEffect(() => {
    if (!searchOpen) return;

    const onKeyDown = (e) => e.key === "Escape" && setSearchOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  const linkClass = ({ isActive }) =>
    `relative transition-colors ${
      isActive ? "text-[#EAE8E2]" : "text-[#EAE8E2]/80  hover:text-[#EAE8E2] "
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#EAE8E2] after:transition-all after:duration-300 hover:after:w-full ${
      isActive ? "after:w-full" : ""
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-4 border-b border-[#1E2220]/10 text-sm uppercase tracking-wider transition ${
      isActive ? "text-[#1E2220]" : "text-[#1E2220]/70 hover:text-[#1E2220]"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1E2220]/10 bg-[#1E2220]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link
            to="/"
            className="text-lg xs:text-xl md:text-2xl font-bold uppercase font-playfair text-[#EAE8E2] tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30"
          >
            Taj Boxes
          </Link>

          <ul className="hidden  md:flex absolute left-1/2 -translate-x-1/2 items-center font-semibold gap-8 text-xs lg:text-sm uppercase">
            <li>
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
            </li>

            {/* Shop hover */}
            <li
              ref={shopWrapRef}
              className="relative"
              onMouseEnter={openShopMenu}
              onMouseLeave={closeShopMenu}
            >
              <NavLink to="/shop" className={linkClass}>
                Shop
              </NavLink>

              <ShopMegaMenu
                open={shopMenuOpen}
                categories={categories}
                onClose={() => setShopMenuOpen(false)}
                viewAllHref="/categories"
              />
            </li>

            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Desktop Search */}
          <div className="hidden lg:block w-[460px]">
            <PremiumSearch
              products={products}
              categories={categories}
              onNavigate={() => setOpen(false)}
            />
          </div>

          {/* Tablet Search Icon */}
          <div className="hidden md:flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="h-11 w-11 border border-[#1E2220]/10 flex items-center justify-center hover:bg-[#1E2220]/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30"
              aria-label="Open search"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5 text-[#EAE8E2]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 border border-[#EAE8E2]/10 text-[#EAE8E2] hover:bg-[#EAE8E2/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAE8E2/30"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-[#1E2220]/20"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-x-0 top-0 bg-[#EAE8E2] border-b border-[#1E2220]/10">
            <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-[#1E2220]/60">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-11 w-11 border border-[#1E2220]/10 text-[#1E2220] hover:bg-[#1E2220]/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <div className="border-t border-[#1E2220]/10" />

            <div className="px-4 sm:px-6 py-4 border-b border-[#1E2220]/10">
              <PremiumSearch
                products={products}
                categories={categories}
                onNavigate={() => setOpen(false)}
              />
            </div>

            <ul className="flex flex-col">
              <li>
                <NavLink  to="/" end className={mobileLinkClass} onClick={() => setOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={mobileLinkClass} onClick={() => setOpen(false)}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={mobileLinkClass} onClick={() => setOpen(false)}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tablet Search Overlay */}
      {searchOpen && (
        <div className="hidden md:block lg:hidden fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-[#1E2220]/20"
            aria-label="Close search overlay"
            onClick={() => setSearchOpen(false)}
          />

          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[520px] max-w-[90%] bg-[#EAE8E2] border border-[#1E2220]/10">
            <div className="flex items-center justify-between px-4 h-14 border-b border-[#1E2220]/10">
              <span className="text-xs uppercase tracking-[0.22em] text-[#1E2220]/60">
                Search
              </span>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="h-9 w-9 border border-[#1E2220]/10 flex items-center justify-center hover:bg-[#1E2220]/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2220]/30"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <PremiumSearch
                products={products}
                categories={categories}
                onNavigate={() => setSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
