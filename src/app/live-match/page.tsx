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
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement)?.isContentEditable
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
          e.preventDefault();
          setPlayer1Score((prev) => prev + 1);
          break;

        case "a":
          // Decrement Player 1 score (prevent negative)
          e.preventDefault();
          setPlayer1Score((prev) => Math.max(0, prev - 1));
          break;

        case "e":
          // Increment Player 2 score
          e.preventDefault();
          setPlayer2Score((prev) => prev + 1);
          break;

        case "d":
          // Decrement Player 2 score (prevent negative)
          e.preventDefault();
          setPlayer2Score((prev) => Math.max(0, prev - 1));
          break;

        case "z":
          // Z → Left arrow (player1's turn)
          e.preventDefault();
          setCurrentTurn("player1");
          break;

        case "c":
          // C → Right arrow (player2's turn)
          e.preventDefault();
          setCurrentTurn("player2");
          break;

        case "x":
          // X → No arrow (no turn)
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
            <div className="bg-linear-to-r from-purple-950 via-purple-900 to-purple-950 py-0.5 px-px sm:px-6 shadow-2xl w-full sm:max-w-[80%] mx-0.5 sm:mx-4 overflow-hidden sm:rounded-xl">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1 px-1">
                  {/* Player 1 Group - Left */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() =>
                        canSelectPlayers && setShowPlayer1Modal(true)
                      }
                      disabled={!canSelectPlayers}
                      className={`shrink-0 ${
                        canSelectPlayers
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-default"
                      } transition-opacity`}
                    >
                      {getPlayer1Photo() ? (
                        <Image
                          src={getPlayer1Photo()!}
                          alt={getPlayer1Name()}
                          width={28}
                          height={28}
                          className="w-7 h-7 rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                          👨
                        </div>
                      )}
                    </button>
                    <div className="text-xs font-bold text-white uppercase truncate max-w-[50px] leading-none">
                      {getPlayer1Name()}
                    </div>
                  </div>

                  {/* Center Group - Scores and Race */}
                  <div className="flex items-center gap-1 justify-center min-w-0">
                    {/* Left Arrow - Turn Indicator */}
                    <div className="shrink-0">
                      <svg
                        className={`w-3 h-3 ${
                          currentTurn === "player1"
                            ? "text-yellow-500"
                            : "text-purple-950"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                      </svg>
                    </div>

                    {/* Player 1 Score */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      {isManager && (
                        <button
                          onClick={() =>
                            setPlayer1Score((prev) => Math.max(0, prev - 1))
                          }
                          className="text-yellow-500 hover:text-yellow-400 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                          title="Decrement (A key)"
                        >
                          −
                        </button>
                      )}
                      <div className="text-xl font-bold text-yellow-500 leading-none">
                        {player1Score}
                      </div>
                      {isManager && (
                        <button
                          onClick={() => setPlayer1Score((prev) => prev + 1)}
                          className="text-yellow-500 hover:text-yellow-400 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                          title="Increment (Q key)"
                        >
                          +
                        </button>
                      )}
                    </div>

                    {/* Race to X - Shortened on Mobile */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      {isManager && (
                        <button
                          onClick={() =>
                            setRaceTo((prev) => Math.max(1, prev - 1))
                          }
                          className="text-white hover:text-yellow-400 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                          title="Decrement (- key)"
                        >
                          −
                        </button>
                      )}
                      <div className="text-xs font-bold text-white uppercase leading-none">
                        R{raceTo}
                      </div>
                      {isManager && (
                        <button
                          onClick={() => setRaceTo((prev) => prev + 1)}
                          className="text-white hover:text-yellow-400 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                          title="Increment (+ key)"
                        >
                          +
                        </button>
                      )}
                    </div>

                    {/* Player 2 Score */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      {isManager && (
                        <button
                          onClick={() =>
                            setPlayer2Score((prev) => Math.max(0, prev - 1))
                          }
                          className="text-yellow-500 hover:text-yellow-400 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                          title="Decrement (D key)"
                        >
                          −
                        </button>
                      )}
                      <div className="text-xl font-bold text-yellow-500 leading-none">
                        {player2Score}
                      </div>
                      {isManager && (
                        <button
                          onClick={() => setPlayer2Score((prev) => prev + 1)}
                          className="text-yellow-500 hover:text-yellow-400 text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                          title="Increment (E key)"
                        >
                          +
                        </button>
                      )}
                    </div>

                    {/* Right Arrow - Turn Indicator */}
                    <div className="shrink-0">
                      <svg
                        className={`w-3 h-3 ${
                          currentTurn === "player2"
                            ? "text-yellow-500"
                            : "text-purple-950"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </div>
                  </div>

                  {/* Player 2 Group - Right */}
                  <div className="flex items-center gap-1 shrink-0 justify-end">
                    <div className="text-xs font-bold text-white uppercase truncate max-w-[50px] leading-none">
                      {getPlayer2Name()}
                    </div>
                    <button
                      onClick={() =>
                        canSelectPlayers && setShowPlayer2Modal(true)
                      }
                      disabled={!canSelectPlayers}
                      className={`shrink-0 ${
                        canSelectPlayers
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-default"
                      } transition-opacity`}
                    >
                      {getPlayer2Photo() ? (
                        <Image
                          src={getPlayer2Photo()!}
                          alt={getPlayer2Name()}
                          width={28}
                          height={28}
                          className="w-7 h-7 rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                          👩
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:block relative">
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400/10 via-transparent to-yellow-400/10"></div>
                <div className="relative z-10">
                  <div className="grid grid-cols-3 items-center gap-4">
                    {/* Player 1 Group - Extreme Left */}
                    <div className="flex items-center gap-4 justify-start">
                      <button
                        onClick={() =>
                          canSelectPlayers && setShowPlayer1Modal(true)
                        }
                        disabled={!canSelectPlayers}
                        className={`shrink-0 ${
                          canSelectPlayers
                            ? "cursor-pointer hover:opacity-80"
                            : "cursor-default"
                        } transition-opacity ${
                          currentTurn === "player1"
                            ? "ring-4 ring-yellow-400/50 rounded-lg p-2"
                            : ""
                        }`}
                      >
                        {getPlayer1Photo() ? (
                          <Image
                            src={getPlayer1Photo()!}
                            alt={getPlayer1Name()}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-4xl">
                            👨
                          </div>
                        )}
                      </button>
                      <div className="text-3xl sm:text-5xl font-bold text-white shrink-0 uppercase">
                        {getPlayer1Name()}
                      </div>
                    </div>

                    {/* Center Group - Scores and Race */}
                    <div className="flex items-center gap-4 justify-center">
                      {/* Left Arrow - Turn Indicator */}
                      <div className="shrink-0">
                        <svg
                          className={`w-6 h-6 ${
                            currentTurn === "player1"
                              ? "text-yellow-500"
                              : "text-purple-950"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                      </div>

                      {/* Player 1 Score */}
                      <div className="flex items-center gap-1 shrink-0">
                        {isManager && (
                          <button
                            onClick={() =>
                              setPlayer1Score((prev) => Math.max(0, prev - 1))
                            }
                            className="text-yellow-500 hover:text-yellow-400 text-sm opacity-60 hover:opacity-100 transition-opacity"
                            title="Decrement (A key)"
                          >
                            −
                          </button>
                        )}
                        <div className="text-5xl sm:text-7xl font-bold text-yellow-500">
                          {player1Score}
                        </div>
                        {isManager && (
                          <button
                            onClick={() => setPlayer1Score((prev) => prev + 1)}
                            className="text-yellow-500 hover:text-yellow-400 text-sm opacity-60 hover:opacity-100 transition-opacity"
                            title="Increment (Q key)"
                          >
                            +
                          </button>
                        )}
                      </div>

                      {/* Race to X */}
                      <div className="flex items-center gap-1 shrink-0">
                        {isManager && (
                          <button
                            onClick={() =>
                              setRaceTo((prev) => Math.max(1, prev - 1))
                            }
                            className="text-white hover:text-yellow-400 text-sm opacity-60 hover:opacity-100 transition-opacity"
                            title="Decrement (- key)"
                          >
                            −
                          </button>
                        )}
                        <div className="text-xl sm:text-3xl font-bold text-white uppercase">
                          Race to {raceTo}
                        </div>
                        {isManager && (
                          <button
                            onClick={() => setRaceTo((prev) => prev + 1)}
                            className="text-white hover:text-yellow-400 text-sm opacity-60 hover:opacity-100 transition-opacity"
                            title="Increment (+ key)"
                          >
                            +
                          </button>
                        )}
                      </div>

                      {/* Player 2 Score */}
                      <div className="flex items-center gap-1 shrink-0">
                        {isManager && (
                          <button
                            onClick={() =>
                              setPlayer2Score((prev) => Math.max(0, prev - 1))
                            }
                            className="text-yellow-500 hover:text-yellow-400 text-sm opacity-60 hover:opacity-100 transition-opacity"
                            title="Decrement (D key)"
                          >
                            −
                          </button>
                        )}
                        <div className="text-5xl sm:text-7xl font-bold text-yellow-500">
                          {player2Score}
                        </div>
                        {isManager && (
                          <button
                            onClick={() => setPlayer2Score((prev) => prev + 1)}
                            className="text-yellow-500 hover:text-yellow-400 text-sm opacity-60 hover:opacity-100 transition-opacity"
                            title="Increment (E key)"
                          >
                            +
                          </button>
                        )}
                      </div>

                      {/* Right Arrow - Turn Indicator */}
                      <div className="shrink-0">
                        <svg
                          className={`w-6 h-6 ${
                            currentTurn === "player2"
                              ? "text-yellow-500"
                              : "text-purple-950"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                      </div>
                    </div>

                    {/* Player 2 Group - Extreme Right */}
                    <div className="flex items-center gap-4 justify-end">
                      <div className="text-3xl sm:text-5xl font-bold text-white shrink-0 uppercase">
                        {getPlayer2Name()}
                      </div>
                      <button
                        onClick={() =>
                          canSelectPlayers && setShowPlayer2Modal(true)
                        }
                        disabled={!canSelectPlayers}
                        className={`shrink-0 ${
                          canSelectPlayers
                            ? "cursor-pointer hover:opacity-80"
                            : "cursor-default"
                        } transition-opacity ${
                          currentTurn === "player2"
                            ? "ring-4 ring-yellow-400/50 rounded-lg p-2"
                            : ""
                        }`}
                      >
                        {getPlayer2Photo() ? (
                          <Image
                            src={getPlayer2Photo()!}
                            alt={getPlayer2Name()}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-4xl">
                            👩
                          </div>
                        )}
                      </button>
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
            top: "50px",
            right: "50px",
          }}
        >
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
          <Image
            src="/Sponsor.jpeg"
            alt="Sponsor"
            width={156}
            height={156}
            className="mt-5"
            style={{
              filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Mobile Logo - Top Right */}
        <div className="fixed top-32 right-2 z-30 sm:hidden">
          <Image
            src="/favicon.png"
            alt="Barako Logo"
            width={94}
            height={94}
            className="w-[94px] h-[94px]"
            style={{
              filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          />
          <Image
            src="/Sponsor.jpeg"
            alt="Sponsor"
            width={94}
            height={94}
            className="w-[94px] h-[94px] mt-5"
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
