"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLive, GameMode } from "@/contexts/LiveContext";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const pathname = usePathname();
  const {
    liveMatchIsLive,
    apaMatchIsLive,
    standbyIsLive,
    gameMode,
    setGameMode,
  } = useLive();
  const { isManager } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide nav if the standby page is live, or if on a live match page when that match is live
  const shouldHideNav =
    standbyIsLive ||
    (pathname === "/live-match" && liveMatchIsLive) ||
    (pathname === "/live-match-experimental" && liveMatchIsLive) ||
    (pathname === "/generic" && liveMatchIsLive) ||
    (pathname === "/apa-match" && apaMatchIsLive);

  if (shouldHideNav) {
    return null;
  }

  const navItems = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Players",
      href: "/players",
    },
    {
      name: "Matches",
      href: "/matches",
    },
    {
      name: "Live Match",
      href: "/live-match",
    },
    {
      name: "Live Match (Exp)",
      href: "/live-match-experimental",
    },
    {
      name: "Generic",
      href: "/generic",
    },
    {
      name: "APA Match",
      href: "/apa-match",
    },
    {
      name: "Credits",
      href: "/credits",
    },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 relative z-[60]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="shrink-0 flex items-center sm:mt-2">
              <Image
                src="/favicon.png"
                alt="Barako Logo"
                width={39}
                height={39}
                className="mr-2"
              />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Barako Tour
              </h1>
            </div>
          </div>

          {/* Desktop Navigation - Grouped to the right */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Game Mode Selector - Desktop */}
          {(pathname === "/live-match" || pathname === "/live-match-experimental" || pathname === "/generic") && isManager && !liveMatchIsLive && (
            <div className="hidden sm:flex items-center ml-auto space-x-2">
              {(["9-ball", "10-ball", "15-ball"] as GameMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setGameMode(mode)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    gameMode === mode
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Game Mode Selector - Mobile */}
          {(pathname === "/live-match" || pathname === "/live-match-experimental" || pathname === "/generic") && isManager && !liveMatchIsLive && (
            <div className="px-4 py-3 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Game Mode</p>
              <div className="flex items-center space-x-2">
                {(["9-ball", "10-ball", "15-ball"] as GameMode[]).map(
                  (mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setGameMode(mode);
                        setIsMobileMenuOpen(false); // Close menu on selection
                      }}
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md text-center transition-colors ${
                        gameMode === mode
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
