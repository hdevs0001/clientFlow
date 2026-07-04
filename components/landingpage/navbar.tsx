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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131314]/80 backdrop-blur-xl border-b border-white/10 overflow-x-hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
          >
            <Image
              src="/image.png"
              width={20}
              height={20}
              alt="ClientFlow Logo"
              className="shrink-0"
            />

            <span className="text-2xl font-bold text-on-surface whitespace-nowrap">
              ClientFlow
            </span>
          </Link>

          {/* Desktop Nav */}
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
            className="md:hidden flex items-center justify-center w-10 h-10 shrink-0"
          >
            <span className="material-symbols-outlined text-3xl text-white">
              menu
            </span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 w-[85vw] max-w-[320px] bg-[#131314] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 shrink-0"
          >
            <Image
              src="/image.png"
              width={20}
              height={20}
              alt="ClientFlow Logo"
            />

            <span className="text-xl font-bold whitespace-nowrap text-white">
              ClientFlow
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-3xl text-white">
              close
            </span>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-6 p-6 text-lg">

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
                className="block rounded-lg bg-primarys py-3 text-center font-semibold text-on-primary glow-button"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg bg-primarys py-3 text-center font-semibold text-on-primary glow-button"
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