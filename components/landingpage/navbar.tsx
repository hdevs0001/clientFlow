"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = !!session?.user;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#131314]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Image
              src="/image.png"
              width={17}
              height={17}
              alt="ClientFlow Logo"
            />
            <span className="text-[24px] font-bold text-on-surface tracking-tight">
              ClientFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
            }}
          >
            <Link
              href="/#features"
              className="text-on-surface-variant hover:text-white transition-colors"
            >
              Features
            </Link>

            <Link
              href="/#pricing"
              className="text-on-surface-variant hover:text-white transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="/#testimonials"
              className="text-on-surface-variant hover:text-white transition-colors"
            >
              Testimonials
            </Link>

            <Link
              href="/#faq"
              className="text-on-surface-variant hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Button */}
          <div
            className="hidden md:flex items-center"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
            }}
          >
            {loggedIn ? (
              <Link
                href="/dashboard"
                className="glow-button bg-primarys text-on-primary px-6 py-2 rounded-lg font-semibold"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-on-surface-variant hover:text-white transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-72 bg-[#131314] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/image.png"
              width={17}
              height={17}
              alt="ClientFlow Logo"
            />
            <span className="text-xl font-bold text-white">ClientFlow</span>
          </Link>

          <button onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined text-white text-3xl">
              close
            </span>
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-6 gap-6 text-lg">
          <Link
            href="/#features"
            onClick={() => setMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            Features
          </Link>

          <Link
            href="/#pricing"
            onClick={() => setMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            Pricing
          </Link>

          <Link
            href="/#testimonials"
            onClick={() => setMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            Testimonials
          </Link>

          <Link
            href="/#faq"
            onClick={() => setMenuOpen(false)}
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            FAQ
          </Link>

          <div className="border-t border-white/10 pt-6">
            {loggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-primarys text-on-primary py-3 rounded-lg font-semibold glow-button"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-primarys text-on-primary py-3 rounded-lg font-semibold glow-button"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
