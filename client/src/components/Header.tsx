"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import Container from "./Container";
import { useSession, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAuthenticated = status === "authenticated";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(user, "user");
  return (
    <header className="w-full bg-white shadow-sm staic top-0 left-0 z-40">
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="TalentBridge Logo"
              width={36}
              height={36}
              className="mr-2"
            />
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
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-primary-blue">{user.name}</p>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center justify-center"
                  >
                    <Image
                      src="/images/user.svg"
                      alt="User Icon"
                      width={32}
                      height={32}
                    />
                  </button>
                </div>
                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <hr className="border-t border-gray-200 my-1" />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  to="/login"
                  variant="outline"
                  className=""
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  to="/signup"
                  variant="primary"
                  className="font-semibold px-5 shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Button>
              </>
            )}
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
          {isAuthenticated && user ? (
            <>
              <span className="font-semibold text-primary-blue mb-2">
                {user.email}
              </span>
              <Button
                variant="outline"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                to="/login"
                variant="outline"
                className=""
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Button>
              <Button
                to="/signup"
                variant="primary"
                className="font-semibold px-5 shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
