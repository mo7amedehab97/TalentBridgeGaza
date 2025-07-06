"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import Container from "./Container";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-40">
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <circle
                cx="10"
                cy="18"
                r="6"
                fill="currentColor"
                className="text-primary-blue"
              />
              <circle
                cx="26"
                cy="18"
                r="6"
                fill="currentColor"
                className="text-accent-green"
              />
              <circle
                cx="18"
                cy="10"
                r="4"
                fill="currentColor"
                className="text-primary-blue"
              />
            </svg>
            <span className="text-2xl font-bold select-none">
              <span className="text-dark-gray">Talent</span>
              <span className="text-primary-blue">Bridge</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-dark-gray no-underline font-medium transition-colors hover:text-primary-blue"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-dark-gray no-underline font-medium transition-colors hover:text-primary-blue"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-dark-gray no-underline font-medium transition-colors hover:text-primary-blue"
            >
              Pricing
            </Link>
            <Link
              href="/freelancers"
              className="text-dark-gray no-underline font-medium transition-colors hover:text-primary-blue"
            >
              For Freelancers
            </Link>
            <Link
              href="/employers"
              className="text-dark-gray no-underline font-medium transition-colors hover:text-primary-blue"
            >
              For Employers
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Button to="/signin" variant="outline" className="">
              Sign In
            </Button>
            <Button
              href="/get-started"
              variant="primary"
              className="font-semibold px-5 shadow-md"
            >
              Get Started
            </Button>
          </div>
          {/* Hamburger Icon for mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-12 h-12 ml-2"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block w-8 h-1 bg-dark-gray transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-primary-blue my-1.5 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-dark-gray transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </Container>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className=" bg-black bg-opacity-40 z-30 md:hidden transition-opacity duration-800 ease-in-out"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 md:hidden transform transition-transform duration-800 ease-in-out ${
          menuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-3xl text-primary-blue hover:text-primary-blue-hover focus:outline-none"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          &#10005;
        </button>
        <div className="flex flex-col p-6 gap-6 mt-16">
          <Link
            href="/"
            className="text-dark-gray no-underline font-medium text-lg transition-colors hover:text-primary-blue"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-dark-gray no-underline font-medium text-lg transition-colors hover:text-primary-blue"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="text-dark-gray no-underline font-medium text-lg transition-colors hover:text-primary-blue"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/freelancers"
            className="text-dark-gray no-underline font-medium text-lg transition-colors hover:text-primary-blue"
            onClick={() => setMenuOpen(false)}
          >
            For Freelancers
          </Link>
          <Link
            href="/employers"
            className="text-dark-gray no-underline font-medium text-lg transition-colors hover:text-primary-blue"
            onClick={() => setMenuOpen(false)}
          >
            For Employers
          </Link>
          <hr className="border-t-2 border-primary-blue" />
          <Button
            href="/signin"
            variant="outline"
            className=""
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Button>
          <Button
            href="/get-started"
            variant="primary"
            className="font-semibold px-5 shadow-md"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
