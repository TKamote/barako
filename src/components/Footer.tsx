"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  
  const handlePayNowClick = () => {
    const mobileNumber = "90076295";
    
    // Copy to clipboard
    navigator.clipboard.writeText(mobileNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = mobileNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  // Handle PayPal donation
  const handlePayPalDonation = async (amount: number) => {
    try {
      // Track donation attempt in Firestore
      await addDoc(collection(db, "donations"), {
        amount,
        paymentMethod: "PayPal",
        timestamp: new Date().toISOString(),
        status: "initiated",
      });
    } catch (error) {
      console.error("Error tracking donation:", error);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 transition-all duration-300 ease-in-out max-w-[90vw] sm:max-w-none">
          <svg
            className="w-5 h-5 text-green-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium text-sm sm:text-base">Mobile number copied to clipboard!</span>
        </div>
      )}

      <footer className="bg-white shadow-lg border-t border-gray-200 mt-[20px] py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Single Row: All content in one row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Donation/PayNow and PayPal - Aligned with logo */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
            <span className="text-xs sm:text-sm text-gray-600">Support us:</span>
            <button
              onClick={handlePayNowClick}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base ${
                copied
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              <span>💚</span>
              {copied ? "Copied!" : "PayNow"}
            </button>
            <span className="text-xs sm:text-sm text-gray-600">PayPal:</span>
            <a
              href="https://paypal.me/YOUR_USERNAME/5"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePayPalDonation(5)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors inline-block"
            >
              $5
            </a>
            <a
              href="https://paypal.me/YOUR_USERNAME/10"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePayPalDonation(10)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors inline-block"
            >
              $10
            </a>
            <a
              href="https://paypal.me/YOUR_USERNAME/50"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePayPalDonation(50)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors inline-block"
            >
              $50
            </a>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://www.facebook.com/kamote.nga.71"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://x.com/TKamot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-right">
            TournatTracker.com Copyright 2025 by Dave Verano
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;

