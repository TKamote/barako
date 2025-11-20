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

const RingGamePage = () => {
  const { gameMode, setGameMode, ringGameIsLive, setRingGameIsLive } = useLive();
  const { isManager } = useAuth();

  const [players, setPlayers] = useState<Player[]>([]);
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [player3, setPlayer3] = useState<Player | null>(null);
  const [showPlayer1Modal, setShowPlayer1Modal] = useState(false);
  const [showPlayer2Modal, setShowPlayer2Modal] = useState(false);
  const [showPlayer3Modal, setShowPlayer3Modal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player3Score, setPlayer3Score] = useState(0);
  const [raceTo, setRaceTo] = useState(9);
  
  const [pocketedBalls, setPocketedBalls] = useState<Set<number>>(new Set());
  const [winner, setWinner] = useState<{ player: Player, finalScores: number[] } | null>(null);

  const lastResetPress = useRef<number>(0);
  const RESET_TIMEOUT = 500;

  // A dedicated useEffect to check for a winner whenever scores, players, or raceTo change.
  useEffect(() => {
    // Prevent checking if a winner is already declared
    if (winner) return;

    const finalScores = [player1Score, player2Score, player3Score];

    // Check for a winner even if no formal player is selected
    if (raceTo > 0 && player1Score >= raceTo) {
      const winnerPlayer = player1 || { id: 'default1', name: 'Player 1', points: 0 };
      setWinner({ player: winnerPlayer, finalScores });
    } else if (raceTo > 0 && player2Score >= raceTo) {
      const winnerPlayer = player2 || { id: 'default2', name: 'Player 2', points: 0 };
      setWinner({ player: winnerPlayer, finalScores });
    } else if (raceTo > 0 && player3Score >= raceTo) {
      const winnerPlayer = player3 || { id: 'default3', name: 'Player 3', points: 0 };
      setWinner({ player: winnerPlayer, finalScores });
    }
  }, [player1Score, player2Score, player3Score, raceTo, player1, player2, player3, winner]);


  const handleWinnerModalClose = () => {
    setWinner(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer3Score(0);
  };
  
  const getBallNumbers = (mode: GameMode): number[] => {
    switch (mode) {
      case "9-ball":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
      case "10-ball":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      case "15-ball":
        return [];
      default:
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  };

  const ballNumbers = getBallNumbers(gameMode);

  const handleLiveToggle = async () => {
    const newIsLive = !ringGameIsLive;
    setRingGameIsLive(newIsLive);
    if (isManager) {
      try {
        await setDoc(doc(db, "current_match", "ring"), { isLive: newIsLive }, { merge: true });
      } catch (error) {
        console.error("Error saving live status:", error);
      }
    }
  };

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

  const handleResetBalls = useCallback(() => {
    setPocketedBalls(new Set());
  }, []);

  const handleBallToggle = useCallback(
    (ballNumber: number) => {
      if (!ballNumbers.includes(ballNumber)) return;
      setPocketedBalls((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(ballNumber)) newSet.delete(ballNumber);
        else newSet.add(ballNumber);
        return newSet;
      });
    },
    [ballNumbers]
  );

  const getPlayerPhoto = (player: Player | null) => player?.photoURL || null;
  const getPlayerName = (player: Player | null, defaultName: string) => player?.name || defaultName;

  const getPlayerPlaceholder = (player: Player | null, defaultPlaceholder: string) => {
    if (player?.id) {
      const hash = player.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const placeholderNum = (hash % 6) + 1;
      return `/avatar-placeholder-${placeholderNum}.svg`;
    }
    return defaultPlaceholder;
  };
  
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersCollection = collection(db, "players");
        const playersSnapshot = await getDocs(playersCollection);
        const playersList = playersSnapshot.docs.map((doc) => ({
          id: doc.id, ...doc.data()
        } as Player));
        setPlayers(playersList.sort((a, b) => (b.points || 0) - (a.points || 0)));
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
        const matchDoc = await getDoc(doc(db, "current_match", "ring"));
        if (matchDoc.exists()) {
          const data = matchDoc.data();
          const p1 = players.find(p => p.id === data.player1Id);
          if (p1) setPlayer1(p1);
          const p2 = players.find(p => p.id === data.player2Id);
          if (p2) setPlayer2(p2);
          const p3 = players.find(p => p.id === data.player3Id);
          if (p3) setPlayer3(p3);
          
          setPlayer1Score(data.player1Score || 0);
          setPlayer2Score(data.player2Score || 0);
          setPlayer3Score(data.player3Score || 0);
          setRaceTo(data.raceTo || 9);
          setPocketedBalls(new Set(data.pocketedBalls || []));
          if (data.isLive !== undefined) setRingGameIsLive(data.isLive);
          if (data.gameMode) setGameMode(data.gameMode);
        }
      } catch (error) {
        console.error("Error loading match data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (players.length > 0) {
      loadMatchData();
    }
  }, [players, setGameMode, setRingGameIsLive]);

  // Save match data to Firestore whenever it changes
  useEffect(() => {
    const saveMatchData = async () => {
      if (loading || !isManager) return;
      try {
        const matchData = {
          player1Id: player1?.id || null,
          player2Id: player2?.id || null,
          player3Id: player3?.id || null,
          player1Score,
          player2Score,
          player3Score,
          raceTo,
          pocketedBalls: Array.from(pocketedBalls),
          gameMode,
          isLive: ringGameIsLive,
          updatedAt: new Date().toISOString(),
        };
        await setDoc(doc(db, "current_match", "ring"), matchData, { merge: true });
      } catch (error) {
        console.error("Error saving match data:", error);
      }
    };
    saveMatchData();
  }, [player1, player2, player3, player1Score, player2Score, player3Score, raceTo, pocketedBalls, gameMode, ringGameIsLive, loading, isManager]);


  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) return;

      // Handle Delete key for resetting balls FIRST
      if (e.key === "Delete" || e.key === "Del" || e.code === "Delete" || e.key === "Backspace") {
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
      
      const key = e.key.toLowerCase();

      if (e.key === "+" || (e.shiftKey && e.key === "=")) {
        e.preventDefault(); setRaceTo((prev) => prev + 1); return;
      }
      if (e.key === "-" || e.key === "_") {
        e.preventDefault(); setRaceTo((prev) => Math.max(1, prev - 1)); return;
      }

      switch (key) {
        case "q": e.preventDefault(); setPlayer1Score((prev) => prev + 1); break;
        case "a": e.preventDefault(); setPlayer1Score((prev) => Math.max(0, prev - 1)); break;
        case "w": e.preventDefault(); setPlayer2Score((prev) => prev + 1); break;
        case "s": e.preventDefault(); setPlayer2Score((prev) => Math.max(0, prev - 1)); break;
        case "e": e.preventDefault(); setPlayer3Score((prev) => prev + 1); break;
        case "d": e.preventDefault(); setPlayer3Score((prev) => Math.max(0, prev - 1)); break;
        case "r":
          e.preventDefault();
          const now = Date.now();
          if (now - lastResetPress.current < RESET_TIMEOUT) {
            setPlayer1Score(0); setPlayer2Score(0); setPlayer3Score(0);
            lastResetPress.current = 0;
          } else {
            lastResetPress.current = now;
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleBallToggle, handleResetBalls]);

  const canSelectPlayers = isManager && !ringGameIsLive;

  const handlePlayerSelect = async (player: Player, playerNumber: 1 | 2 | 3) => {
    if(playerNumber === 1) setPlayer1(player);
    if(playerNumber === 2) setPlayer2(player);
    if(playerNumber === 3) setPlayer3(player);
  };


  return (
    <div className="w-full h-screen bg-transparent relative flex flex-col items-center justify-center overflow-hidden p-4">
      {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100]">
          <div className="bg-white p-8 rounded-lg text-center text-gray-800 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Winner!</h2>
            <div className="mb-4">
              <Image
                src={winner.player.photoURL || getPlayerPlaceholder(winner.player, '/avatar-placeholder-yellow.svg')}
                alt={winner.player.name}
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-yellow-500 shadow-lg"
              />
            </div>
            <p className="text-2xl mb-6 font-semibold">{winner.player.name} wins the game!</p>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Final Scores:</h3>
              <p className="text-lg">{getPlayerName(player1, 'Player 1')}: {winner.finalScores[0]}</p>
              <p className="text-lg">{getPlayerName(player2, 'Player 2')}: {winner.finalScores[1]}</p>
              <p className="text-lg">{getPlayerName(player3, 'Player 3')}: {winner.finalScores[2]}</p>
            </div>
            <button
              onClick={handleWinnerModalClose}
              className="bg-gray-800 text-white px-6 py-2 rounded text-lg transition-colors hover:bg-gray-700"
            >
              New Game
            </button>
          </div>
        </div>
      )}

      <div className="fixed top-[68px] sm:top-[76px] left-0 right-0 z-50 flex justify-center">
        <button
          onClick={handleLiveToggle}
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 ${
            ringGameIsLive
              ? "bg-red-600 hover:bg-red-700 text-white animate-pulse-live inline-flex items-center"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {ringGameIsLive ? (
            <>
              <span className="mr-1 sm:mr-2">🔴</span>
              LIVE
            </>
          ) : (
            "GO LIVE"
          )}
        </button>
      </div>

      <div className="fixed left-2 sm:left-4 top-16 sm:top-20 z-40 flex flex-col items-start">
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
          {ballNumbers.length > 0 && (
            <button onClick={handleResetBalls} className="text-gray-400 hover:text-gray-600 transition-colors opacity-60 hover:opacity-100 mt-1 sm:mt-2 p-2 sm:p-3" title="Reset all balls">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
      </div>
      
      <div className="fixed bottom-4 left-0 right-0 w-full px-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-2">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-white">
              Ring Game{' '}
              <span className="bg-gray-300 bg-opacity-40 rounded-md px-3 py-1 text-2xl text-gray-800 font-semibold">
                Race to{' '}
                <span className="bg-yellow-500 text-black font-extrabold rounded-md px-2 py-0.5">
                  {raceTo}
                </span>
              </span>
            </h1>
          </div>
          
          <div className="w-full bg-gray-800 bg-opacity-50 px-4 py-[2px] rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center gap-3">
                   <button onClick={() => canSelectPlayers && setShowPlayer1Modal(true)} disabled={!canSelectPlayers}>
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image src={getPlayerPhoto(player1) || getPlayerPlaceholder(player1, "/avatar-placeholder-1.svg")} alt={getPlayerName(player1, "Player 1")} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                   </button>
                  <div className="flex items-baseline gap-3">
                    <p className="font-bold text-[28px] text-white">{getPlayerName(player1, "Player 1")}</p>
                    <p className="text-4xl bg-yellow-500 text-black font-extrabold rounded-md px-3 py-1">{player1Score}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-center">
                   <button onClick={() => canSelectPlayers && setShowPlayer2Modal(true)} disabled={!canSelectPlayers}>
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image src={getPlayerPhoto(player2) || getPlayerPlaceholder(player2, "/avatar-placeholder-2.svg")} alt={getPlayerName(player2, "Player 2")} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                   </button>
                  <div className="flex items-baseline gap-3">
                    <p className="font-bold text-[28px] text-white">{getPlayerName(player2, "Player 2")}</p>
                    <p className="text-4xl bg-yellow-500 text-black font-extrabold rounded-md px-3 py-1">{player2Score}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end">
                   <button onClick={() => canSelectPlayers && setShowPlayer3Modal(true)} disabled={!canSelectPlayers}>
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image src={getPlayerPhoto(player3) || getPlayerPlaceholder(player3, "/avatar-placeholder-3.svg")} alt={getPlayerName(player3, "Player 3")} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                   </button>
                  <div className="flex items-baseline gap-3">
                    <p className="font-bold text-[28px] text-white">{getPlayerName(player3, "Player 3")}</p>
                    <p className="text-4xl bg-yellow-500 text-black font-extrabold rounded-md px-3 py-1">{player3Score}</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div
          className="fixed z-50 hidden sm:block"
          style={{ top: "50px", right: "50px" }}
        >
          <Image src="/Tourtrack.png" alt="TourTrack Logo" width={109} height={109} style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))", borderRadius: "10px", objectFit: "contain" }} />
          <Image src="/qr-code copy.png" alt="QR Code" width={109} height={109} className="mt-5" style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))", borderRadius: "10px", objectFit: "contain" }} />
      </div>

      <PlayerSelectionModal
        isOpen={showPlayer1Modal} onClose={() => setShowPlayer1Modal(false)}
        players={players} selectedPlayerId={player1?.id || null} onSelect={(p) => handlePlayerSelect(p, 1)} title="Select Player 1"
      />
      <PlayerSelectionModal
        isOpen={showPlayer2Modal} onClose={() => setShowPlayer2Modal(false)}
        players={players} selectedPlayerId={player2?.id || null} onSelect={(p) => handlePlayerSelect(p, 2)} title="Select Player 2"
      />
      <PlayerSelectionModal
        isOpen={showPlayer3Modal} onClose={() => setShowPlayer3Modal(false)}
        players={players} selectedPlayerId={player3?.id || null} onSelect={(p) => handlePlayerSelect(p, 3)} title="Select Player 3"
      />
    </div>
  );
};

export default RingGamePage;
