"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLive } from "@/contexts/LiveContext";
import { useAuth } from "@/contexts/AuthContext";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PlayerSelectionModal from "@/components/PlayerSelectionModal";

interface Player {
  id: string;
  name: string;
  photoURL?: string;
  points: number;
}

const BilliardsBall = ({
  number,
  isMobile = false,
  isPocketed = false,
  onClick,
}: {
  number: number;
  isMobile?: boolean;
  isPocketed?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={!isPocketed ? onClick : undefined}
    className={`${
      isMobile ? "w-8 h-8" : "w-12 h-12"
    } flex items-center justify-center transition-all ${
      isPocketed ? "opacity-0 cursor-default" : "cursor-pointer hover:scale-110"
    }`}
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
  const { isManager } = useAuth();

  // Player state
  const [players, setPlayers] = useState<Player[]>([]);
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [showPlayer1Modal, setShowPlayer1Modal] = useState(false);
  const [showPlayer2Modal, setShowPlayer2Modal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Score state
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [raceTo, setRaceTo] = useState(9);
  const [currentTurn, setCurrentTurn] = useState<"player1" | "player2" | null>(
    null
  );

  // Ball state
  const [pocketedBalls, setPocketedBalls] = useState<Set<number>>(new Set());

  // URL state for OBS integration (client-side only to avoid hydration mismatch)
  const [obsUrl, setObsUrl] = useState<string>("localhost:3000/live-match");

  // Double-press R for reset tracking
  const lastResetPress = useRef<number>(0);
  const RESET_TIMEOUT = 500; // 500ms window for double-press

  // Array of ball numbers 1-10
  const ballNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Get player photo URL (returns null if no photo)
  const getPlayer1Photo = () => {
    return player1?.photoURL || null;
  };

  const getPlayer2Photo = () => {
    return player2?.photoURL || null;
  };

  // Get player name or default
  const getPlayer1Name = () => {
    if (player1?.name) return player1.name;
    return "Dave";
  };

  const getPlayer2Name = () => {
    if (player2?.name) return player2.name;
    return "Joel";
  };

  // Fetch players from Firestore
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersCollection = collection(db, "players");
        const playersSnapshot = await getDocs(playersCollection);
        const playersList = playersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            photoURL: data.photoURL || "",
            points: data.points || 0,
          } as Player;
        });

        // Sort by points descending
        const sortedPlayers = playersList.sort((a, b) => b.points - a.points);
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  // Load persisted match data from Firestore
  useEffect(() => {
    const loadMatchData = async () => {
      try {
        const matchDocRef = doc(db, "current_match", "live");
        const matchDoc = await getDoc(matchDocRef);

        if (matchDoc.exists()) {
          const matchData = matchDoc.data();

          // Restore player 1
          if (matchData.player1Id) {
            if (players.length > 0) {
              const p1 = players.find((p) => p.id === matchData.player1Id);
              if (p1) {
                setPlayer1(p1);
              } else if (matchData.player1Name) {
                setPlayer1({
                  id: matchData.player1Id,
                  name: matchData.player1Name,
                  photoURL: matchData.player1PhotoURL || "",
                  points: 0,
                });
              }
            } else if (matchData.player1Name) {
              setPlayer1({
                id: matchData.player1Id,
                name: matchData.player1Name,
                photoURL: matchData.player1PhotoURL || "",
                points: 0,
              });
            }
          }

          // Restore player 2
          if (matchData.player2Id) {
            if (players.length > 0) {
              const p2 = players.find((p) => p.id === matchData.player2Id);
              if (p2) {
                setPlayer2(p2);
              } else if (matchData.player2Name) {
                setPlayer2({
                  id: matchData.player2Id,
                  name: matchData.player2Name,
                  photoURL: matchData.player2PhotoURL || "",
                  points: 0,
                });
              }
            } else if (matchData.player2Name) {
              setPlayer2({
                id: matchData.player2Id,
                name: matchData.player2Name,
                photoURL: matchData.player2PhotoURL || "",
                points: 0,
              });
            }
          }

          // Restore scores
          if (matchData.player1Score !== undefined) {
            setPlayer1Score(matchData.player1Score);
          }
          if (matchData.player2Score !== undefined) {
            setPlayer2Score(matchData.player2Score);
          }

          // Restore raceTo
          if (matchData.raceTo !== undefined) {
            setRaceTo(matchData.raceTo);
          }

          // Restore pocketed balls
          if (
            matchData.pocketedBalls &&
            Array.isArray(matchData.pocketedBalls)
          ) {
            setPocketedBalls(new Set(matchData.pocketedBalls));
          }

          // Restore turn
          if (matchData.currentTurn) {
            setCurrentTurn(matchData.currentTurn);
          }
        }
      } catch (error) {
        console.error("Error loading match data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMatchData();
  }, [players]);

  // Update player objects when players array loads
  useEffect(() => {
    if (players.length > 0 && (player1?.id || player2?.id)) {
      if (player1?.id) {
        const freshP1 = players.find((p) => p.id === player1.id);
        if (freshP1) {
          if (!player1.photoURL || freshP1.photoURL !== player1.photoURL) {
            setPlayer1(freshP1);
          }
        }
      }

      if (player2?.id) {
        const freshP2 = players.find((p) => p.id === player2.id);
        if (freshP2) {
          if (!player2.photoURL || freshP2.photoURL !== player2.photoURL) {
            setPlayer2(freshP2);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  // Save match data to Firestore
  const saveMatchData = async () => {
    // Only save if authenticated (manager mode)
    if (!isManager) {
      return;
    }
    try {
      const matchDocRef = doc(db, "current_match", "live");
      await setDoc(
        matchDocRef,
        {
          player1Id: player1?.id || null,
          player2Id: player2?.id || null,
          player1Name: player1?.name || "Dave",
          player2Name: player2?.name || "Joel",
          player1PhotoURL: player1?.photoURL || "",
          player2PhotoURL: player2?.photoURL || "",
          player1Score,
          player2Score,
          raceTo,
          currentTurn,
          pocketedBalls: Array.from(pocketedBalls),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving match data:", error);
      // Silently fail if not authenticated
    }
  };

  // Handle player selection
  const handlePlayer1Select = async (selectedPlayer: Player) => {
    setPlayer1(selectedPlayer);
    try {
      const matchDocRef = doc(db, "current_match", "live");
      await setDoc(
        matchDocRef,
        {
          player1Id: selectedPlayer.id,
          player1Name: selectedPlayer.name,
          player1PhotoURL: selectedPlayer.photoURL || "",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving player 1:", error);
    }
  };

  const handlePlayer2Select = async (selectedPlayer: Player) => {
    setPlayer2(selectedPlayer);
    try {
      const matchDocRef = doc(db, "current_match", "live");
      await setDoc(
        matchDocRef,
        {
          player2Id: selectedPlayer.id,
          player2Name: selectedPlayer.name,
          player2PhotoURL: selectedPlayer.photoURL || "",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving player 2:", error);
    }
  };

  // Save scores when they change
  useEffect(() => {
    if (!loading) {
      saveMatchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    player1Score,
    player2Score,
    raceTo,
    currentTurn,
    loading,
    player1,
    player2,
    pocketedBalls,
  ]);

  // Handle ball click - removes/pockets the ball
  const handleBallClick = (ballNumber: number) => {
    setPocketedBalls((prev) => {
      const newSet = new Set(prev);
      newSet.add(ballNumber);
      return newSet;
    });
  };

  // Reset all balls for a new game
  const handleResetBalls = () => {
    setPocketedBalls(new Set());
  };

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Handle Tab key separately (before lowercasing)
      if (e.key === "Tab") {
        e.preventDefault();
        setCurrentTurn((prev) => {
          if (prev === "player1") return "player2";
          return "player1"; // Handles both "player2" and null
        });
        return;
      }

      const key = e.key.toLowerCase();

      // Handle + and - keys for raceTo (before switch)
      if (e.key === "+" || (e.shiftKey && e.key === "=")) {
        e.preventDefault();
        setRaceTo((prev) => prev + 1);
        return;
      }
      if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        setRaceTo((prev) => Math.max(1, prev - 1));
        return;
      }

      switch (key) {
        case "q":
          // Increment Player 1 score
          setPlayer1Score((prev) => prev + 1);
          break;

        case "a":
          // Decrement Player 1 score (prevent negative)
          setPlayer1Score((prev) => Math.max(0, prev - 1));
          break;

        case "e":
          // Increment Player 2 score
          setPlayer2Score((prev) => prev + 1);
          break;

        case "d":
          // Decrement Player 2 score (prevent negative)
          setPlayer2Score((prev) => Math.max(0, prev - 1));
          break;

        case "z":
          // Z → Reset indicator to no turn
          e.preventDefault();
          setCurrentTurn(null);
          break;

        case "r":
          // Double-press R to reset scores
          e.preventDefault();
          const now = Date.now();
          if (now - lastResetPress.current < RESET_TIMEOUT) {
            // Double-press detected - reset scores
            setPlayer1Score(0);
            setPlayer2Score(0);
            setCurrentTurn(null); // Reset turn indicator
            lastResetPress.current = 0; // Reset counter
          } else {
            // First press - record timestamp
            lastResetPress.current = now;
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Set OBS URL client-side only to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      setObsUrl(window.location.href);
    }
  }, []);

  // Determine if player selection should be enabled
  const canSelectPlayers = isManager && !isLive;

  return (
    <div className="w-full h-screen bg-transparent relative flex items-center justify-center overflow-hidden">
      {/* 16:9 Aspect Ratio Container */}
      <div className="w-full max-w-[1920px] aspect-video bg-transparent relative">
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
            <div className="bg-gray-400 rounded-full px-2 py-1">
              <div className="flex flex-col space-y-1">
                {ballNumbers.map((ballNumber) => (
                  <BilliardsBall
                    key={ballNumber}
                    number={ballNumber}
                    isMobile={true}
                    isPocketed={pocketedBalls.has(ballNumber)}
                    onClick={() => handleBallClick(ballNumber)}
                  />
                ))}
              </div>
            </div>
            {/* Reset Balls Button - Mobile */}
            <button
              onClick={handleResetBalls}
              className="text-gray-400 hover:text-gray-600 transition-colors opacity-60 hover:opacity-100 text-xs mt-1"
              title="Reset all balls"
            >
              Reset Balls
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

            {/* Billiards Balls - Vertical Desktop (All 10) */}
            <div
              className="bg-gray-400 rounded-full px-2 py-2"
              style={{ marginRight: "20px", marginTop: "50px" }}
            >
              <div className="flex flex-col space-y-2">
                {ballNumbers.map((ballNumber) => (
                  <BilliardsBall
                    key={ballNumber}
                    number={ballNumber}
                    isPocketed={pocketedBalls.has(ballNumber)}
                    onClick={() => handleBallClick(ballNumber)}
                  />
                ))}
              </div>
            </div>
            {/* Reset Balls Button - Desktop */}
            <button
              onClick={handleResetBalls}
              className="text-gray-400 hover:text-gray-600 transition-colors opacity-60 hover:opacity-100 text-sm mt-2"
              style={{ marginRight: "20px" }}
              title="Reset all balls"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Score Display - Fixed at Bottom */}
        <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 z-40">
          <div className="flex justify-center">
            <div className="bg-linear-to-r from-purple-950 via-purple-900 to-purple-950 rounded-xl py-1 px-6 sm:py-2 sm:px-12 shadow-2xl max-w-[85%] sm:max-w-[80%] w-full mx-1 sm:mx-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400/10 via-transparent to-yellow-400/10"></div>
              <div className="relative z-10">
                {/* Mobile Layout */}
                <div className="sm:hidden">
                  <div className="flex items-center gap-4">
                    {/* Player 1 Group - Left Side */}
                    <button
                      onClick={() =>
                        canSelectPlayers && setShowPlayer1Modal(true)
                      }
                      disabled={!canSelectPlayers}
                      className={`flex items-center space-x-6 flex-1 justify-start min-w-0 ${
                        canSelectPlayers
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-default"
                      } transition-opacity`}
                    >
                      <div className="text-4xl">
                        {getPlayer1Photo() ? (
                          <Image
                            src={getPlayer1Photo()!}
                            alt={getPlayer1Name()}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          "👨"
                        )}
                      </div>
                      <div className="text-3xl font-bold text-white truncate max-w-[80px]">
                        {getPlayer1Name()}
                      </div>
                    </button>

                    {/* Vertical Separator - Left */}
                    <div className="h-16 w-px bg-white/30 shrink-0"></div>

                    {/* Score & RaceTo Center Group */}
                    <div className="flex flex-col items-center shrink-0 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl font-bold text-yellow-500">
                          {player1Score}
                        </div>
                        <div className="text-5xl font-bold text-yellow-500">
                          -
                        </div>
                        <div className="text-5xl font-bold text-yellow-500">
                          {player2Score}
                        </div>
                      </div>
                      <div className="text-xl font-semibold text-white mt-1">
                        Race to {raceTo}
                      </div>
                    </div>

                    {/* Vertical Separator - Right */}
                    <div className="h-16 w-px bg-white/30 shrink-0"></div>

                    {/* Player 2 Group - Right Side */}
                    <button
                      onClick={() =>
                        canSelectPlayers && setShowPlayer2Modal(true)
                      }
                      disabled={!canSelectPlayers}
                      className={`flex items-center justify-end space-x-6 flex-1 min-w-0 ${
                        canSelectPlayers
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-default"
                      } transition-opacity`}
                    >
                      <div className="text-3xl font-bold text-white truncate max-w-[80px]">
                        {getPlayer2Name()}
                      </div>
                      <div className="text-4xl">
                        {getPlayer2Photo() ? (
                          <Image
                            src={getPlayer2Photo()!}
                            alt={getPlayer2Name()}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          "👩"
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="flex items-center gap-8">
                    {/* Player 1 Group - Left Side */}
                    <button
                      onClick={() =>
                        canSelectPlayers && setShowPlayer1Modal(true)
                      }
                      disabled={!canSelectPlayers}
                      className={`flex items-center justify-start space-x-8 flex-1 min-w-0 ${
                        canSelectPlayers
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-default"
                      } transition-opacity ${
                        currentTurn === "player1"
                          ? "ring-4 ring-yellow-400/50 rounded-lg p-2"
                          : ""
                      }`}
                    >
                      <div className="text-9xl">
                        {getPlayer1Photo() ? (
                          <Image
                            src={getPlayer1Photo()!}
                            alt={getPlayer1Name()}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          "👨"
                        )}
                      </div>
                      <div className="text-5xl font-bold text-white truncate max-w-[200px] text-left">
                        {getPlayer1Name()}
                      </div>
                    </button>

                    {/* Vertical Separator - Left */}
                    <div className="h-20 w-px bg-white/30 shrink-0"></div>

                    {/* Score & RaceTo Center Group */}
                    <div className="flex flex-col items-center shrink-0 px-8">
                      <div className="flex items-center space-x-8">
                        <div className="text-7xl font-bold text-yellow-500">
                          {player1Score}
                        </div>
                        <div className="text-7xl font-bold text-yellow-500">
                          -
                        </div>
                        <div className="text-7xl font-bold text-yellow-500">
                          {player2Score}
                        </div>
                      </div>
                      <div className="text-2xl font-semibold text-white mt-2">
                        Race to {raceTo}
                      </div>
                    </div>

                    {/* Vertical Separator - Right */}
                    <div className="h-20 w-px bg-white/30 shrink-0"></div>

                    {/* Player 2 Group - Right Side */}
                    <button
                      onClick={() =>
                        canSelectPlayers && setShowPlayer2Modal(true)
                      }
                      disabled={!canSelectPlayers}
                      className={`flex items-center justify-end space-x-8 flex-1 min-w-0 ${
                        canSelectPlayers
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-default"
                      } transition-opacity ${
                        currentTurn === "player2"
                          ? "ring-4 ring-yellow-400/50 rounded-lg p-2"
                          : ""
                      }`}
                    >
                      <div className="text-5xl font-bold text-white truncate max-w-[200px] text-left">
                        {getPlayer2Name()}
                      </div>
                      <div className="text-9xl">
                        {getPlayer2Photo() ? (
                          <Image
                            src={getPlayer2Photo()!}
                            alt={getPlayer2Name()}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          "👩"
                        )}
                      </div>
                    </button>
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
              <code className="bg-gray-700 px-1 rounded">{obsUrl}</code> | Size:
              1920x1080 | FPS: 60
            </div>
            <div className="sm:hidden text-xs">
              <strong>OBS:</strong> Browser Source | 1920x1080 | 60fps
            </div>
          </div>
        </div>

        {/* Barako Logo - Top Right */}
        <div
          className="fixed z-50 hidden sm:block"
          style={{
            top: "5px",
            right: "50px",
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

        {/* Mobile Logo - Top Right */}
        <div className="fixed top-2 right-2 z-50 sm:hidden">
          <Image
            src="/favicon.png"
            alt="Barako Logo"
            width={78}
            height={78}
            className="w-[78px] h-[78px]"
            style={{
              filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Player Selection Modals */}
        <PlayerSelectionModal
          isOpen={showPlayer1Modal}
          onClose={() => setShowPlayer1Modal(false)}
          players={players}
          selectedPlayerId={player1?.id || null}
          onSelect={handlePlayer1Select}
          title="Select Player 1"
        />

        <PlayerSelectionModal
          isOpen={showPlayer2Modal}
          onClose={() => setShowPlayer2Modal(false)}
          players={players}
          selectedPlayerId={player2?.id || null}
          onSelect={handlePlayer2Select}
          title="Select Player 2"
        />
      </div>
      {/* End 16:9 Aspect Ratio Container */}
    </div>
  );
};

export default LiveMatchPage;
