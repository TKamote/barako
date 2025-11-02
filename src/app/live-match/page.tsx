"use client";

import Image from "next/image";
import { useLive } from "@/contexts/LiveContext";

const BilliardsBall = ({
  number,
  isMobile = false,
}: {
  number: number;
  isMobile?: boolean;
}) => (
  <div
    className={`${
      isMobile ? "w-8 h-8" : "w-12 h-12"
    } flex items-center justify-center`}
  >
    <Image
      src={`/ballicons/ball-${number}.png`}
      alt={`Ball ${number}`}
      width={isMobile ? 32 : 48}
      height={isMobile ? 32 : 48}
      className="object-contain"
    />
  </div>
);

const LiveMatchPage = () => {
  const { isLive, setIsLive } = useLive();

  // Array of ball numbers 1-10
  const ballNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Header with Live Button and Balls */}
      <div className="flex justify-between items-start p-2 sm:p-4">
        {/* Mobile: Live Button and Balls on left side vertically */}
        <div className="flex flex-col sm:hidden items-start space-y-2">
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

          {/* Mobile: Billiards Balls - Vertical (All 10) */}
          <div className="bg-gray-800 rounded-full px-2 py-1">
            <div className="flex flex-col space-y-1">
              {ballNumbers.map((ballNumber) => (
                <BilliardsBall
                  key={ballNumber}
                  number={ballNumber}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
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

          {/* Billiards Balls - Vertical Desktop (All 10) */}
          <div
            className="bg-gray-800 rounded-full px-2 py-2"
            style={{ marginRight: "20px", marginTop: "50px" }}
          >
            <div className="flex flex-col space-y-2">
              {ballNumbers.map((ballNumber) => (
                <BilliardsBall key={ballNumber} number={ballNumber} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Score Display - Fixed at Bottom */}
      <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 z-40">
        <div className="flex justify-center">
          <div className="bg-linear-to-r from-purple-900 via-purple-800 to-purple-900 rounded-xl py-2 px-4 sm:py-4 sm:px-12 shadow-2xl max-w-4xl w-full mx-2 sm:mx-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400/10 via-transparent to-yellow-400/10"></div>
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
        <Image
          src="/favicon.png"
          alt="Barako Logo"
          width={130}
          height={130}
          style={{
            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* Mobile Logo - Centered */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 sm:hidden">
        <Image
          src="/favicon.png"
          alt="Barako Logo"
          width={156}
          height={156}
          style={{
            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default LiveMatchPage;
