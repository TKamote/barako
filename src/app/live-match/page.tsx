"use client";

import { useState } from "react";
import { useLive } from "@/contexts/LiveContext";

const LiveMatchPage = () => {
  const [player1Name] = useState("Dave");
  const [player2Name] = useState("Joel");
  const [player1Score] = useState(0);
  const [player2Score] = useState(0);
  const { isLive, setIsLive } = useLive();

  return (
    <div className="p-6 h-screen flex flex-col bg-transparent">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col">
        {/* Live Button - Top Right Corner */}
        <div className="absolute" style={{ top: "80px", right: "50px" }}>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`text-white px-4 py-2 rounded-full font-bold text-lg transition-all duration-300 ${
              isLive
                ? "bg-linear-to-r from-red-600 to-red-800 animate-pulse"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {isLive ? "LIVE" : "GO LIVE"}
          </button>
        </div>

        {/* Players Scoring Container - Bottom */}
        <div className="bg-white rounded-lg shadow-lg px-1 py-1 mt-auto w-fit mx-auto">
          <div className="flex items-center justify-between">
            {/* Player 1 Profile Photo */}
            <div className="w-14 h-14 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-6xl">
              👨
            </div>

            {/* Center Content */}
            <div className="flex items-center justify-center space-x-2 flex-1">
              {/* Player 1 Name */}
              <div className="bg-red-500 px-28 py-3">
                <div className="text-2xl font-bold text-white">
                  {player1Name}
                </div>
              </div>

              {/* Scores and VS */}
              <div
                className="flex items-center justify-center space-x-5 bg-linear-to-r from-red-600 to-blue-600"
                style={{ width: "calc(2rem + 8rem + 2rem)", height: "3.5rem" }}
              >
                <div className="text-5xl font-bold text-white">
                  {player1Score}
                </div>
                <div className="text-1.5xl font-bold text-white">VS</div>
                <div className="text-5xl font-bold text-white">
                  {player2Score}
                </div>
              </div>

              {/* Player 2 Name */}
              <div className="bg-blue-600 px-28 py-3">
                <div className="text-2xl font-bold text-white">
                  {player2Name}
                </div>
              </div>
            </div>

            {/* Player 2 Profile Photo */}
            <div className="w-14 h-14 bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-6xl">
              👩
            </div>
          </div>
        </div>

        {/* Billiards Ball Icons */}
        <div className="mt-4 flex flex-col items-center">
          <div className="flex space-x-4 bg-amber-50 rounded-full px-6 py-1">
            {/* Ball 1 - Red */}
            <div
              className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              1
            </div>

            {/* Ball 2 - Yellow */}
            <div
              className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              2
            </div>

            {/* Ball 3 - Blue */}
            <div
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              3
            </div>

            {/* Ball 4 - Purple */}
            <div
              className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              4
            </div>

            {/* Ball 5 - Orange */}
            <div
              className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              5
            </div>

            {/* Ball 6 - Green */}
            <div
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              6
            </div>

            {/* Ball 7 - Pink */}
            <div
              className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              7
            </div>

            {/* Ball 8 - Black */}
            <div
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              8
            </div>

            {/* Ball 9 - Light Yellow */}
            <div
              className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              9
            </div>

            {/* Ball 10 - Dark Blue */}
            <div
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold"
              style={{ fontSize: "22px" }}
            >
              10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatchPage;
