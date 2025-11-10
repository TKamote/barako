"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useLive, GameMode } from "@/contexts/LiveContext";
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

const ApaMatchPage = () => {
  const { setIsLive: setGlobalIsLive } = useLive();
  const { isManager } = useAuth();

  // Local state for this page
  const [isLive, setIsLive] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("9-ball");

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
  const [obsUrl, setObsUrl] = useState<string>("localhost:3000/apa-match");

  // Double-press R for reset tracking
  const lastResetPress = useRef<number>(0);
  const RESET_TIMEOUT = 500; // 500ms window for double-press

  // Determine ball numbers based on game mode
  const getBallNumbers = (mode: GameMode): number[] => {
    switch (mode) {
      case "9-ball":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
      case "10-ball":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      case "15-ball":
        return []; // 15-ball shows nothing
      default:
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  };

  const ballNumbers = getBallNumbers(gameMode);

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
        const matchDocRef = doc(db, "current_match", "apa");
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

          // Restore game mode
          if (
            matchData.gameMode &&
            ["9-ball", "10-ball", "15-ball"].includes(matchData.gameMode)
          ) {
            setGameMode(matchData.gameMode as GameMode);
          }

          // Restore isLive
          if (matchData.isLive !== undefined) {
            setIsLive(matchData.isLive);
            setGlobalIsLive(matchData.isLive);
          }
        }
      } catch (error) {
        console.error("Error loading match data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMatchData();
  }, [players, setGlobalIsLive]);

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
      const matchDocRef = doc(db, "current_match", "apa");
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
          gameMode,
          isLive,
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
      const matchDocRef = doc(db, "current_match", "apa");
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
      const matchDocRef = doc(db, "current_match", "apa");
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

  // Handle live toggle
  const handleLiveToggle = async () => {
    const newIsLive = !isLive;
    setIsLive(newIsLive);
    setGlobalIsLive(newIsLive);
    try {
      const matchDocRef = doc(db, "current_match", "apa");
      await setDoc(
        matchDocRef,
        {
          isLive: newIsLive,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving live status:", error);
    }
  };

  // Handle game mode change
  const handleGameModeChange = async (newMode: GameMode) => {
    setGameMode(newMode);
    try {
      const matchDocRef = doc(db, "current_match", "apa");
      await setDoc(
        matchDocRef,
        {
          gameMode: newMode,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving game mode:", error);
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
    gameMode,
    isLive,
  ]);

  // Handle ball click - toggles pocketed state
  const handleBallClick = (ballNumber: number) => {
    setPocketedBalls((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ballNumber)) {
        newSet.delete(ballNumber);
      } else {
        newSet.add(ballNumber);
      }
      return newSet;
    });
  };

  // Handle ball toggle via keyboard
  const handleBallToggle = useCallback(
    (ballNumber: number) => {
      // Only allow toggling if ball exists in current game mode
      if (!ballNumbers.includes(ballNumber)) {
        return;
      }
      setPocketedBalls((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(ballNumber)) {
          newSet.delete(ballNumber);
        } else {
          newSet.add(ballNumber);
        }
        return newSet;
      });
    },
    [ballNumbers]
  );

  // Reset all balls for a new game
  const handleResetBalls = useCallback(() => {
    setPocketedBalls(new Set());
  }, []);

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

      // Handle Delete key for resetting balls
      if (e.key === "Delete" || e.key === "Del") {
        e.preventDefault();
        handleResetBalls();
        return;
      }

      // Handle number keys 0-9 for ball toggling
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        const ballNumber = e.key === "0" ? 10 : parseInt(e.key);
        handleBallToggle(ballNumber);
        return;
      }

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
  }, [handleBallToggle, handleResetBalls]);

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
        {/* Live Button - Centered at Top */}
        <div className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center">
          <button
            onClick={handleLiveToggle}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 ${
              isLive
                ? "bg-red-600 hover:bg-red-700 text-white animate-pulse-live inline-flex items-center"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLive ? (
              <>
                <span className="mr-1 sm:mr-2">🔴</span>
                LIVE
              </>
            ) : (
              "GO LIVE"
            )}
          </button>
        </div>

        {/* Left Side: Mode Selector, Balls, and Reset Button */}
        <div className="fixed left-2 sm:left-4 top-16 sm:top-20 z-40 flex flex-col items-start">
          {/* Game Mode Selector - Hidden when live */}
          {!isLive && (
            <div className="flex items-center space-x-2 mb-[50px]">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Mode:</span>
              <select
                value={gameMode}
                onChange={(e) => handleGameModeChange(e.target.value as GameMode)}
                className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="9-ball">9-ball</option>
                <option value="10-ball">10-ball</option>
                <option value="15-ball">15-ball</option>
              </select>
            </div>
          )}

          {/* Billiards Balls - Vertical */}
          {ballNumbers.length > 0 && (
            <div className="bg-gray-400 rounded-full px-2 py-1 sm:px-2 sm:py-2">
              <div className="flex flex-col space-y-1 sm:space-y-2">
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
          )}

          {/* Reset Balls Button */}
          {ballNumbers.length > 0 && (
            <button
              onClick={handleResetBalls}
              className="text-gray-400 hover:text-gray-600 transition-colors opacity-60 hover:opacity-100 mt-1 sm:mt-2 p-2 sm:p-3"
              title="Reset all balls"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8"
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
          )}
        </div>

        {/* Score Display - Fixed at Bottom */}
        <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 z-40">
          <div className="flex justify-center">
            <div className="bg-linear-to-r from-purple-950 via-purple-900 to-purple-950 py-0 px-px sm:px-3 shadow-2xl w-full sm:max-w-[80%] mx-0.5 sm:mx-4 overflow-hidden">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-0.5 px-0.5">
                  {/* Player 1 Group - Left */}
                  <div className="flex items-center gap-0.5 min-w-0">
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
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                          👨
                        </div>
                      )}
                    </button>
                    <div className="text-[20px] font-bold text-white uppercase truncate min-w-0 leading-none">
                      {getPlayer1Name()}
                    </div>
                  </div>

                  {/* Center Group - Scores and Race */}
                  <div className="flex items-center gap-0 justify-center shrink-0">
                    {/* Left Arrow - Turn Indicator for Player 1 */}
                    <svg
                      className={`w-9 h-9 shrink-0 -mr-2 ${
                        currentTurn === "player1"
                          ? "text-yellow-500"
                          : "text-purple-950"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>

                    {/* Player 1 Score */}
                    <div className="text-[28px] font-bold text-yellow-500 whitespace-nowrap leading-none">
                      {player1Score}
                    </div>

                    {/* Race to X - Shortened on Mobile */}
                    <div className="text-[10px] font-bold text-white uppercase whitespace-nowrap leading-none px-[2px] mx-[10px]">
                      R{raceTo}
                    </div>

                    {/* Player 2 Score */}
                    <div className="text-[28px] font-bold text-yellow-500 whitespace-nowrap leading-none">
                      {player2Score}
                    </div>

                    {/* Right Arrow - Turn Indicator for Player 2 */}
                    <svg
                      className={`w-9 h-9 shrink-0 -ml-2 ${
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

                  {/* Player 2 Group - Right */}
                  <div className="flex items-center gap-0.5 min-w-0 justify-end">
                    <div className="text-[20px] font-bold text-white uppercase truncate min-w-0 leading-none">
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
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs">
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
                        } transition-opacity`}
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
                    <div className="flex items-center gap-2 justify-center">
                      {/* Left Arrow - Turn Indicator for Player 1 */}
                      <svg
                        className={`w-[72px] h-[72px] shrink-0 -mr-4 ${
                          currentTurn === "player1"
                            ? "text-yellow-500"
                            : "text-purple-950"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                      </svg>

                      {/* Player 1 Score */}
                      <div className="text-5xl sm:text-7xl font-bold text-yellow-500">
                        {player1Score}
                      </div>

                      {/* Race to X */}
                      <div className="text-xl sm:text-3xl font-bold text-white uppercase mx-[10px]">
                        Race to {raceTo}
                      </div>

                      {/* Player 2 Score */}
                      <div className="text-5xl sm:text-7xl font-bold text-yellow-500">
                        {player2Score}
                      </div>

                      {/* Right Arrow - Turn Indicator for Player 2 */}
                      <svg
                        className={`w-[72px] h-[72px] shrink-0 -ml-4 ${
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
                        } transition-opacity`}
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
          <Image
            src="/APA.png"
            alt="APA Logo"
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
          <Image
            src="/APA.png"
            alt="APA Logo"
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

export default ApaMatchPage;

