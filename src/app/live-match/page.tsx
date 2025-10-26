"use client";

import { useState } from "react";
import { useLive } from "@/contexts/LiveContext";

const BilliardsBall = ({
  number,
  color,
  isMobile = false,
}: {
  number: number;
  color: string;
  isMobile?: boolean;
}) => (
  <div
    className={`${
      isMobile ? "w-8 h-8 text-sm" : "w-12 h-12 text-xl"
    } rounded-full flex items-center justify-center text-white font-bold border border-white`}
    style={{ backgroundColor: color, borderWidth: "0.5px" }}
  >
    {number}
  </div>
);

const LiveMatchPage = () => {
  const [player1Name] = useState("Dave");
  const [player2Name] = useState("Joel");
  const [player1Score] = useState(7);
  const [player2Score] = useState(5);
  const { isLive, setIsLive } = useLive();

  const ballColors = [
    "#ef4444", // Red
    "#eab308", // Yellow
    "#3b82f6", // Blue
    "#a855f7", // Purple
    "#f97316", // Orange
    "#22c55e", // Green
    "#ec4899", // Pink
    "#1f2937", // Black
    "#facc15", // Light Yellow
    "#1d4ed8", // Dark Blue
  ];

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Header with Live Button and Balls */}
      <div className="flex justify-between items-start p-2 sm:p-4">
        {/* Mobile: Live Button on left, Balls on right */}
        <div className="flex flex-col sm:hidden space-y-2">
          {/* Live Toggle Button - Mobile */}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
              isLive
                ? "bg-red-600 hover:bg-red-700 text-white animate-pulse-live inline-flex items-center"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLive ? (
              <>
                <span className="mr-1">🔴</span>
                LIVE
              </>
            ) : (
              "GO LIVE"
            )}
          </button>
        </div>

        {/* Desktop: Right side - Live Button and Balls */}
        <div className="hidden sm:flex sm:flex-col sm:items-end sm:space-y-4">
          {/* Live Toggle Button - Desktop */}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              isLive
                ? "bg-red-600 hover:bg-red-700 text-white animate-pulse-live inline-flex items-center"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLive ? (
              <>
                <span className="mr-2">🔴</span>
                LIVE
              </>
            ) : (
              "GO LIVE"
            )}
          </button>

          {/* Billiards Balls - Vertical Desktop */}
          <div
            className="bg-gray-800 rounded-full px-2 py-2"
            style={{ marginRight: "20px", marginTop: "50px" }}
          >
            <div className="flex flex-col space-y-2">
              {ballColors.map((color, index) => (
                <BilliardsBall
                  key={index + 1}
                  number={index + 1}
                  color={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Billiards Balls - Horizontal */}
        <div className="sm:hidden">
          <div className="bg-gray-800 rounded-full px-2 py-1">
            <div className="flex space-x-1">
              {ballColors.slice(0, 5).map((color, index) => (
                <BilliardsBall
                  key={index + 1}
                  number={index + 1}
                  color={color}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Score Display - Fixed at Bottom */}
      <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 z-40">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 rounded-xl py-2 px-4 sm:py-4 sm:px-12 shadow-2xl max-w-4xl w-full mx-2 sm:mx-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10"></div>
            <div className="relative z-10">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl">👨</div>
                    <div className="text-xl font-bold text-white">Dave</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-white">7</div>
                      <div className="text-2xl font-bold text-white">-</div>
                      <div className="text-2xl font-bold text-white">5</div>
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      Race to 9
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold text-white">Joel</div>
                    <div className="text-3xl">👩</div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:block">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="text-6xl">👨</div>
                    <div className="text-4xl font-bold text-white">Dave</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-8">
                      <div className="text-4xl font-bold text-white">7</div>
                      <div className="text-4xl font-bold text-white">-</div>
                      <div className="text-4xl font-bold text-white">5</div>
                    </div>
                    <div className="text-lg font-semibold text-white mt-1">
                      Race to 9
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-white">Joel</div>
                    <div className="text-6xl">👩</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OBS Integration Instructions - Bottom */}
      <div className="fixed bottom-1 left-2 right-2 sm:left-4 sm:right-4 z-30">
        <div className="bg-black/80 text-white text-xs p-1 sm:p-2 rounded text-center">
          <div className="hidden sm:block">
            <strong>OBS Integration:</strong> Use Browser Source with URL:{" "}
            <code className="bg-gray-700 px-1 rounded">
              {typeof window !== "undefined"
                ? window.location.href
                : "localhost:3000/live-match"}
            </code>{" "}
            | Size: 1920x1080 | FPS: 60
          </div>
          <div className="sm:hidden text-xs">
            <strong>OBS:</strong> Browser Source | 1920x1080 | 60fps
          </div>
        </div>
      </div>

      {/* Barako Logo - Bottom Left */}
      <div
        className="fixed z-50 hidden sm:block"
        style={{
          bottom: "5px",
          left: "50px",
        }}
      >
        <img
          src="/favicon.png"
          alt="Barako Logo"
          width={100}
          height={100}
          style={{
            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>

      {/* Mobile Logo - Top Left */}
      <div className="fixed top-2 left-2 z-50 sm:hidden">
        <img
          src="/favicon.png"
          alt="Barako Logo"
          width={40}
          height={40}
          style={{
            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>
    </div>
  );
};

export default LiveMatchPage;
