"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

// Types
interface Player {
  id: string;
  name: string;
  points: number;
  photoURL?: string;
}

interface Match {
  id: string;
  matchNumber: string;
  player1?: Player;
  player2?: Player;
  score1: number;
  score2: number;
  raceTo: number;
  winner?: "player1" | "player2";
  status: "pending" | "in_progress" | "completed" | "disabled";
  round: string;
  bracket: "winners";
  // Bracket advancement fields
  nextMatchId?: string;
  nextPosition?: "player1" | "player2";
}

const SixteenPlayerMatchPage = () => {
  const { isManager, loading: authLoading } = useAuth();

  // State management
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tournamentStarted, setTournamentStarted] = useState(false);

  // Modal form state
  const [selectedPlayer1, setSelectedPlayer1] = useState<string>("");
  const [selectedPlayer2, setSelectedPlayer2] = useState<string>("");
  const [score1, setScore1] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0);
  const [raceTo, setRaceTo] = useState<number>(9);

  // Generate match numbers for 16-player single elimination
  const getMatchNumbers = () => {
    let matchCounter = 1;
    const matches = {
      round1: [] as string[], // 8 matches
      round2: [] as string[], // 4 matches
      round3: [] as string[], // 2 matches
      round4: [] as string[], // 1 match (semi-final)
    };

    // Round 1: 8 matches
    for (let i = 0; i < 8; i++) {
      matches.round1.push(`M${matchCounter++}`);
    }

    // Round 2: 4 matches
    for (let i = 0; i < 4; i++) {
      matches.round2.push(`M${matchCounter++}`);
    }

    // Round 3: 2 matches
    for (let i = 0; i < 2; i++) {
      matches.round3.push(`M${matchCounter++}`);
    }

    // Round 4: 1 match (semi-final)
    matches.round4.push(`M${matchCounter++}`);

    return matches;
  };

  const matchNumbers = getMatchNumbers();

  // Initialize all matches for 16-player single elimination
  const initializeMatches = useCallback(async () => {
    console.log("Initializing 16-player single elimination matches...");
    const allMatches: Match[] = [];
    let matchCounter = 1;

    // Round 1: 8 matches (16 players → 8 winners)
    for (let i = 0; i < 8; i++) {
      const matchId = `round1-${i}`;
      allMatches.push({
        id: matchId,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "round1",
        bracket: "winners",
        // Winners advance to Round 2
        nextMatchId: `round2-${Math.floor(i / 2)}`,
        nextPosition: i % 2 === 0 ? "player1" : "player2",
      });
    }

    // Round 2: 4 matches (8 winners → 4 winners)
    for (let i = 0; i < 4; i++) {
      const matchId = `round2-${i}`;
      allMatches.push({
        id: matchId,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "round2",
        bracket: "winners",
        // Winners advance to Round 3
        nextMatchId: `round3-${Math.floor(i / 2)}`,
        nextPosition: i % 2 === 0 ? "player1" : "player2",
      });
    }

    // Round 3: 2 matches (4 winners → 2 winners)
    for (let i = 0; i < 2; i++) {
      const matchId = `round3-${i}`;
      allMatches.push({
        id: matchId,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "round3",
        bracket: "winners",
        // Winners advance to Round 4 (semi-final)
        nextMatchId: "round4-0",
        nextPosition: i === 0 ? "player1" : "player2",
      });
    }

    // Round 4: 1 match (semi-final) (2 winners → 1 winner)
    allMatches.push({
      id: "round4-0",
      matchNumber: `M${matchCounter++}`,
      score1: 0,
      score2: 0,
      raceTo: 9,
      status: "pending",
      round: "round4",
      bracket: "winners",
      // Winner is the champion (no next match)
    });

    console.log("Created matches:", allMatches.length);
    setMatches(allMatches);

    // Save all matches to Firebase
    try {
      console.log("Saving matches to Firebase...");
      const matchesRef = collection(db, "16p_matches");
      for (const match of allMatches) {
        await setDoc(doc(matchesRef, match.id), match);
        console.log(`Saved match ${match.matchNumber} to Firebase`);
      }
      console.log("All matches saved to Firebase successfully!");
    } catch (error) {
      console.error("Error saving matches to Firebase:", error);
    }
  }, []);

  // Load players and matches from Firebase
  useEffect(() => {
    if (authLoading) return;

    console.log("useEffect triggered - loading data...");
    const loadData = async () => {
      try {
        // Load players
        const playersSnapshot = await getDocs(collection(db, "players"));
        const playersData = playersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Player[];
        console.log("Loaded players:", playersData.length);
        setPlayers(playersData);

        // Load tournament state
        try {
          const tournamentStateRef = doc(db, "tournament_state", "16p_current");
          const tournamentStateDoc = await getDoc(tournamentStateRef);
          if (tournamentStateDoc.exists()) {
            const stateData = tournamentStateDoc.data();
            setTournamentStarted(stateData.started || false);
          }
        } catch {
          console.log("No tournament state found, tournament not started");
          setTournamentStarted(false);
        }

        // Check if matches exist in Firebase
        console.log("Checking for existing matches in Firebase...");
        const matchesSnapshot = await getDocs(collection(db, "16p_matches"));
        if (matchesSnapshot.empty) {
          console.log("No matches found, initializing...");
          if (isManager) {
            console.log("Manager is logged in, initializing matches...");
            await initializeMatches();
          } else {
            console.log(
              "Not logged in as manager, matches will be initialized after login"
            );
            setMatches([]);
          }
        } else {
          console.log("Loading existing matches from Firebase...");
          const matchesData = matchesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Match[];
          console.log("Loaded matches:", matchesData.length);
          setMatches(matchesData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [initializeMatches, isManager, authLoading]);

  // Initialize matches when manager logs in (if matches don't exist)
  useEffect(() => {
    if (authLoading || loading) return;

    const checkAndInitialize = async () => {
      if (!isManager) return;

      try {
        const matchesSnapshot = await getDocs(collection(db, "16p_matches"));
        if (
          matchesSnapshot.empty &&
          matches.length === 0 &&
          players.length > 0
        ) {
          console.log("Manager logged in, initializing matches now...");
          await initializeMatches();
        }
      } catch (error) {
        console.error("Error checking matches after login:", error);
      }
    };

    checkAndInitialize();
  }, [
    isManager,
    authLoading,
    loading,
    matches.length,
    players.length,
    initializeMatches,
  ]);

  // Check if a match can be edited based on parent matches
  const canEditMatch = (
    match: Match
  ): { canEdit: boolean; reason?: string } => {
    // Round 1 matches can always be edited
    if (match.round === "round1") {
      return { canEdit: true };
    }

    // If tournament has started, all matches can be edited
    if (tournamentStarted) {
      return { canEdit: true };
    }

    // For Round 2+, check if parent matches are completed
    if (match.round === "round2") {
      // Round 2 matches need their two Round 1 parent matches to be completed
      // M9 needs M1 and M2, M10 needs M3 and M4, etc.
      const matchIndex = parseInt(match.id.split("-")[1]);
      const parent1Index = matchIndex * 2;
      const parent2Index = matchIndex * 2 + 1;
      const parent1 = matches.find((m) => m.id === `round1-${parent1Index}`);
      const parent2 = matches.find((m) => m.id === `round1-${parent2Index}`);

      if (!parent1 || !parent2) {
        return {
          canEdit: false,
          reason: "Parent matches not found.",
        };
      }

      if (parent1.status !== "completed" || parent2.status !== "completed") {
        return {
          canEdit: false,
          reason:
            "Please complete the parent Round 1 matches first, or start the tournament.",
        };
      }

      return { canEdit: true };
    }

    if (match.round === "round3") {
      // Round 3 matches need their two Round 2 parent matches to be completed
      const matchIndex = parseInt(match.id.split("-")[1]);
      const parent1Index = matchIndex * 2;
      const parent2Index = matchIndex * 2 + 1;
      const parent1 = matches.find((m) => m.id === `round2-${parent1Index}`);
      const parent2 = matches.find((m) => m.id === `round2-${parent2Index}`);

      if (!parent1 || !parent2) {
        return {
          canEdit: false,
          reason: "Parent matches not found.",
        };
      }

      if (parent1.status !== "completed" || parent2.status !== "completed") {
        return {
          canEdit: false,
          reason:
            "Please complete the parent Round 2 matches first, or start the tournament.",
        };
      }

      return { canEdit: true };
    }

    if (match.round === "round4") {
      // Round 4 (M15) needs both Round 3 matches to be completed
      const parent1 = matches.find((m) => m.id === "round3-0");
      const parent2 = matches.find((m) => m.id === "round3-1");

      if (!parent1 || !parent2) {
        return {
          canEdit: false,
          reason: "Parent matches not found.",
        };
      }

      if (parent1.status !== "completed" || parent2.status !== "completed") {
        return {
          canEdit: false,
          reason:
            "Please complete the parent Round 3 matches first, or start the tournament.",
        };
      }

      return { canEdit: true };
    }

    return { canEdit: false, reason: "Unknown round." };
  };

  // Handle match click
  const handleMatchClick = (matchId: string) => {
    if (!isManager) {
      alert("Please log in as a manager to edit matches.");
      return;
    }
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      // Check if match can be edited
      const { canEdit, reason } = canEditMatch(match);
      if (!canEdit) {
        alert(reason || "This match cannot be edited at this time.");
        return;
      }

      setSelectedMatch(match);
      setSelectedPlayer1(match.player1?.id || "");
      setSelectedPlayer2(match.player2?.id || "");
      setScore1(match.score1);
      setScore2(match.score2);
      setRaceTo(match.raceTo);
      setIsModalOpen(true);
    }
  };

  // Handle start tournament
  const handleStartTournament = async () => {
    if (!isManager) {
      alert("Only managers can start the tournament.");
      return;
    }

    // Check if we have 16 players
    if (players.length < 16) {
      alert(
        `Please add at least 16 players before starting the tournament. Currently you have ${players.length} players.`
      );
      return;
    }
    if (players.length > 16) {
      alert(
        `Maximum 16 players allowed. Currently you have ${players.length} players. Please remove some players.`
      );
      return;
    }

    // Validate all Round 1 matches have players assigned
    const round1Matches = matches.filter((m) => m.round === "round1");
    const incompleteMatches = round1Matches.filter(
      (m) => !m.player1 || !m.player2
    );

    if (incompleteMatches.length > 0) {
      alert(
        `Please assign players to all Round 1 matches before starting the tournament.\n\n${incompleteMatches.length} match(es) still missing players.`
      );
      return;
    }

    const confirmStart = window.confirm(
      `Are you sure you filled up all Round 1 matches?\n\n16 players\n\nProceed to start the tournament?`
    );

    if (!confirmStart) return;

    try {
      // Update tournament state
      const tournamentStateRef = doc(db, "tournament_state", "16p_current");
      await setDoc(tournamentStateRef, {
        started: true,
        startedAt: new Date().toISOString(),
        totalPlayers: players.length,
      });
      setTournamentStarted(true);

      alert("Tournament started successfully!");
    } catch (error) {
      console.error("Error starting tournament:", error);
      alert("Failed to start tournament. Please try again.");
    }
  };

  // Get match by ID
  const getMatchById = (matchId: string) => {
    return matches.find((m) => m.id === matchId);
  };

  // Auto-advance players when a match completes
  const advancePlayers = async (completedMatch: Match) => {
    if (!completedMatch.winner || completedMatch.status !== "completed") {
      return;
    }

    const winner =
      completedMatch.winner === "player1"
        ? completedMatch.player1
        : completedMatch.player2;

    if (!winner) {
      console.warn("⚠️ No winner found in completed match");
      return;
    }

    // Reload matches to get latest state
    const matchesSnapshot = await getDocs(collection(db, "16p_matches"));
    const currentMatches = matchesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Match[];

    const updatedMatches = [...currentMatches];

    // Advance winner to next match
    const nextMatchId = completedMatch.nextMatchId;
    const nextPosition = completedMatch.nextPosition;

    if (nextMatchId && nextPosition && winner) {
      const nextMatch = updatedMatches.find((m) => m.id === nextMatchId);
      if (nextMatch) {
        if (nextPosition === "player1") {
          nextMatch.player1 = winner;
        } else {
          nextMatch.player2 = winner;
        }
        // Update status if both players are now set
        if (
          nextMatch.player1 &&
          nextMatch.player2 &&
          nextMatch.status === "pending"
        ) {
          nextMatch.status = "in_progress";
        }

        // Save to Firebase
        try {
          const matchRef = doc(db, "16p_matches", nextMatch.id);
          await updateDoc(matchRef, {
            player1: nextMatch.player1 || null,
            player2: nextMatch.player2 || null,
            status: nextMatch.status,
          });
          console.log(
            `✅ Advanced ${winner.name} to ${nextMatch.matchNumber} (${nextMatchId}, ${nextPosition})`
          );
        } catch (error) {
          console.error("Error updating next match:", error);
        }
      }
    }

    setMatches(updatedMatches);
  };

  // Global reset - reset all matches
  const handleGlobalReset = async () => {
    if (!isManager) return;

    const confirmReset = window.confirm(
      "Are you sure you want to reset ALL matches? This will clear all scores, players, set all matches to pending status, and reset the tournament start status."
    );

    if (!confirmReset) return;

    try {
      // Reset all matches in Firebase
      const matchesCollection = collection(db, "16p_matches");
      const matchesSnapshot = await getDocs(matchesCollection);

      for (const matchDoc of matchesSnapshot.docs) {
        const matchRef = doc(db, "16p_matches", matchDoc.id);
        await updateDoc(matchRef, {
          player1: null,
          player2: null,
          score1: 0,
          score2: 0,
          winner: null,
          status: "pending",
          raceTo: 9,
        });
      }

      // Reset tournament state
      try {
        const tournamentStateRef = doc(db, "tournament_state", "16p_current");
        await setDoc(tournamentStateRef, {
          started: false,
          startedAt: null,
        });
        setTournamentStarted(false);
      } catch (error) {
        console.error("Error resetting tournament state:", error);
      }

      // Reload matches
      const updatedMatches = matchesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        player1: undefined,
        player2: undefined,
        score1: 0,
        score2: 0,
        winner: undefined,
        status: "pending" as const,
        raceTo: 9,
      })) as Match[];

      setMatches(updatedMatches);
      alert("All matches and tournament status have been reset successfully!");
    } catch (error) {
      console.error("Error resetting matches:", error);
      alert("Failed to reset matches. Please try again.");
    }
  };

  // Reset individual match
  const handleResetMatch = async (matchId: string) => {
    if (!isManager) return;

    const confirmReset = window.confirm(
      "Are you sure you want to reset this match? This will clear scores, players, and set status to pending."
    );

    if (!confirmReset) return;

    try {
      const matchRef = doc(db, "16p_matches", matchId);
      await updateDoc(matchRef, {
        player1: null,
        player2: null,
        score1: 0,
        score2: 0,
        winner: null,
        status: "pending",
      });

      // Update local state
      const updatedMatches = matches.map((match) => {
        if (match.id === matchId) {
          return {
            ...match,
            player1: undefined,
            player2: undefined,
            score1: 0,
            score2: 0,
            winner: undefined,
            status: "pending" as const,
          };
        }
        return match;
      });

      setMatches(updatedMatches);

      // If modal is open for this match, update the form
      if (selectedMatch?.id === matchId) {
        setSelectedPlayer1("");
        setSelectedPlayer2("");
        setScore1(0);
        setScore2(0);
        setSelectedMatch(updatedMatches.find((m) => m.id === matchId) || null);
      }

      alert("Match reset successfully!");
    } catch (error) {
      console.error("Error resetting match:", error);
      alert("Failed to reset match. Please try again.");
    }
  };

  // Save match data
  const handleSaveMatch = async () => {
    if (!selectedMatch) return;

    if (!isManager) {
      alert("Only managers can update matches. Please log in.");
      return;
    }

    const player1 = players.find((p) => p.id === selectedPlayer1);
    const player2 = players.find((p) => p.id === selectedPlayer2);

    // Cap scores at raceTo
    const cappedScore1 = Math.min(score1, raceTo);
    const cappedScore2 = Math.min(score2, raceTo);

    // Determine winner based on race to target
    let winner: "player1" | "player2" | undefined = undefined;
    let isCompleted = false;

    if (player1 && player2) {
      if (cappedScore1 >= raceTo && cappedScore1 > cappedScore2) {
        winner = "player1";
        isCompleted = true;
      } else if (cappedScore2 >= raceTo && cappedScore2 > cappedScore1) {
        winner = "player2";
        isCompleted = true;
      }
    }

    const updatedMatch: Match = {
      ...selectedMatch,
      player1: player1 || undefined,
      player2: player2 || undefined,
      score1: cappedScore1,
      score2: cappedScore2,
      raceTo: raceTo,
      winner: winner,
      status: isCompleted
        ? "completed"
        : player1 && player2
        ? "in_progress"
        : "pending",
      nextMatchId: selectedMatch.nextMatchId,
      nextPosition: selectedMatch.nextPosition,
    };

    const updatedMatches = matches.map((match) => {
      if (match.id === selectedMatch.id) {
        return updatedMatch;
      }
      return match;
    });

    setMatches(updatedMatches);

    // Save to Firebase
    try {
      const matchRef = doc(db, "16p_matches", selectedMatch.id);
      await updateDoc(matchRef, {
        player1: player1 || null,
        player2: player2 || null,
        score1: cappedScore1,
        score2: cappedScore2,
        raceTo: raceTo,
        winner: winner || null,
        status: updatedMatch.status,
      });

      // If match is completed, advance players to next matches
      if (isCompleted) {
        await advancePlayers(updatedMatch);
        // Show success message
        const winnerName = winner === "player1" ? player1?.name : player2?.name;

        // Special message for Round 4 (Final)
        if (updatedMatch.round === "round4") {
          alert(`🏆 TOURNAMENT COMPLETE! 🏆\n\n${winnerName} is the CHAMPION!`);
        } else {
          alert(
            `Match completed! ${winnerName} wins!\n\nPlayers have been automatically advanced to the next round.`
          );
        }

        // Reload matches to show updated bracket
        const matchesSnapshot = await getDocs(collection(db, "16p_matches"));
        const matchesData = matchesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Match[];
        setMatches(matchesData);
      }
    } catch (error) {
      console.error("Error saving match to Firebase:", error);
    }

    setIsModalOpen(false);
  };

  if (loading || authLoading) {
    return (
      <div className="p-3 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-800">
            Loading tournament...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 sm:p-3 bg-transparent sm:bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            16P-Match (Single Elimination)
          </h1>
          {isManager && (
            <div className="flex items-center gap-3">
              {!tournamentStarted && (
                <button
                  onClick={handleStartTournament}
                  disabled={players.length !== 16}
                  className={`px-4 py-1 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    players.length === 16
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  title={
                    players.length !== 16
                      ? `Need exactly 16 players. Currently have ${players.length}.`
                      : "Start Tournament"
                  }
                >
                  <span>🚀</span>
                  <span className="hidden sm:inline">Start Tournament</span>
                  <span className="sm:hidden">Start</span>
                </button>
              )}
              {tournamentStarted && (
                <span className="text-green-600 font-semibold text-sm">
                  ✓ Tournament Started
                </span>
              )}
              <button
                onClick={handleGlobalReset}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Reset all matches"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
          )}
        </div>

        {/* Winners Bracket Only */}
        <div className="w-full">
          <div className="flex items-center mb-[10px]">
            <div className="bg-blue-600 text-white px-2 py-1 rounded-lg font-bold mr-2 text-sm">
              WB
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              Winners Bracket (Single Elimination)
            </h2>
          </div>

          {/* Horizontal Scrolling Container */}
          <div className="overflow-x-auto">
            {/* Headers Row */}
            <div className="flex space-x-[46px] min-w-max mb-2">
              <div className="w-[200px] text-center font-bold text-sm text-gray-800">
                WB R1
              </div>
              <div className="w-[200px] text-center font-bold text-sm text-gray-800">
                WB R2
              </div>
              <div className="w-[200px] text-center font-bold text-sm text-gray-800">
                WB R3
              </div>
              <div className="w-[200px] text-center font-bold text-sm text-gray-800">
                WB R4
              </div>
              <div className="w-[200px] text-center font-bold text-sm text-gray-800">
                Winner
              </div>
            </div>

            <div className="flex space-x-[46px] min-w-max pb-2 items-start min-h-[600px] relative">
              {/* Column 1: Round 1 (8 matches) */}
              <div className="flex flex-col min-h-[600px] relative w-[200px]">
                <div className="flex flex-col space-y-1">
                  {matchNumbers.round1.map((matchId, index) => {
                    const match = getMatchById(`round1-${index}`);
                    return (
                      <div
                        key={index}
                        className="w-[200px] border border-gray-300 bg-white px-0 sm:px-1 py-0 sm:py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                        onClick={() => handleMatchClick(`round1-${index}`)}
                      >
                        <div className="grid grid-cols-[1fr_3fr_1fr] gap-x-0 sm:gap-x-2 gap-y-0">
                          <div className="flex items-center">
                            <div className="text-[18px] text-gray-700 font-medium">
                              {matchId}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-0 min-w-0 flex-1">
                            <div
                              className={`text-[18px] text-left py-px pb-px font-medium truncate px-1 leading-relaxed ${
                                match?.winner === "player1"
                                  ? "text-yellow-600 font-bold"
                                  : "text-gray-800"
                              }`}
                              title={match?.player1?.name || "TBD"}
                            >
                              {match?.player1?.name || "TBD"}
                            </div>
                            <div
                              className={`text-[18px] text-left py-px pt-px font-medium truncate px-1 leading-relaxed ${
                                match?.winner === "player2"
                                  ? "text-yellow-600 font-bold"
                                  : "text-gray-800"
                              }`}
                              title={match?.player2?.name || "TBD"}
                            >
                              {match?.player2?.name || "TBD"}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-0">
                            <div
                              className={`text-[18px] font-bold text-center py-0 sm:py-px pb-0 sm:pb-px leading-relaxed ${
                                match?.winner === "player1"
                                  ? "text-yellow-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {match?.score1 || 0}
                            </div>
                            <div
                              className={`text-[18px] font-bold text-center py-0 sm:py-px pt-0 sm:pt-px leading-relaxed ${
                                match?.winner === "player2"
                                  ? "text-yellow-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {match?.score2 || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Round 2 (4 matches) - Centered between pairs */}
              <div className="flex flex-col min-h-[600px] relative w-[200px]">
                {matchNumbers.round2.map((matchId, index) => {
                  const match = getMatchById(`round2-${index}`);
                  // Calculate position: M9 centered between M1(0) and M2(1), M10 between M3(2) and M4(3), etc.
                  // Each match box is approximately 60px tall with 4px spacing (space-y-1)
                  const matchHeight = 60; // Approximate height of a match box (includes border, padding, text)
                  const spacing = 4; // space-y-1 = 4px
                  const totalMatchHeight = matchHeight + spacing;
                  // Position for M9 (index 0): between round1-0 and round1-1
                  // Position for M10 (index 1): between round1-2 and round1-3
                  // Position for M11 (index 2): between round1-4 and round1-5
                  // Position for M12 (index 3): between round1-6 and round1-7
                  const firstMatchIndex = index * 2;
                  const topPosition =
                    firstMatchIndex * totalMatchHeight +
                    totalMatchHeight / 2 +
                    matchHeight / 2; // Push down by half match box height
                  return (
                    <div
                      key={index}
                      className="w-[200px] border border-gray-300 bg-white px-0 sm:px-1 py-0 sm:py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all absolute"
                      style={{ top: `${topPosition}px` }}
                      onClick={() => handleMatchClick(`round2-${index}`)}
                    >
                      <div className="grid grid-cols-[1fr_3fr_1fr] gap-x-0 sm:gap-x-2 gap-y-0">
                        <div className="flex items-center">
                          <div className="text-[18px] text-gray-700 font-medium">
                            {matchId}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-0 min-w-0 flex-1">
                          <div
                            className={`text-[18px] text-left py-px pb-px font-medium truncate px-1 leading-relaxed ${
                              match?.winner === "player1"
                                ? "text-yellow-600 font-bold"
                                : "text-gray-800"
                            }`}
                            title={match?.player1?.name || "TBD"}
                          >
                            {match?.player1?.name || "TBD"}
                          </div>
                          <div
                            className={`text-[18px] text-left py-px pt-px font-medium truncate px-1 leading-relaxed ${
                              match?.winner === "player2"
                                ? "text-yellow-600 font-bold"
                                : "text-gray-800"
                            }`}
                            title={match?.player2?.name || "TBD"}
                          >
                            {match?.player2?.name || "TBD"}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-0">
                          <div
                            className={`text-[18px] font-bold text-center py-0 sm:py-px pb-0 sm:pb-px leading-relaxed ${
                              match?.winner === "player1"
                                ? "text-yellow-600"
                                : "text-gray-800"
                            }`}
                          >
                            {match?.score1 || "-"}
                          </div>
                          <div
                            className={`text-[18px] font-bold text-center py-0 sm:py-px pt-0 sm:pt-px leading-relaxed ${
                              match?.winner === "player2"
                                ? "text-yellow-600"
                                : "text-gray-800"
                            }`}
                          >
                            {match?.score2 || "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 3: Round 3 (2 matches) - Centered between pairs */}
              <div className="flex flex-col min-h-[600px] relative w-[200px]">
                {matchNumbers.round3.map((matchId, index) => {
                  const match = getMatchById(`round3-${index}`);
                  // M13 centered between M9(0) and M10(1), M14 between M11(2) and M12(3)
                  const matchHeight = 60; // Approximate height of a match box
                  const spacing = 4;
                  const totalMatchHeight = matchHeight + spacing;
                  // Round 2 matches are positioned at: 0, 1, 2, 3 (in terms of Round 1 pairs)
                  // But we need their actual positions in Round 2 column
                  // M9 is at position 0 (between M1 and M2)
                  // M10 is at position 2 (between M3 and M4)
                  // M11 is at position 4 (between M5 and M6)
                  // M12 is at position 6 (between M7 and M8)
                  const round2FirstIndex = index * 2;
                  const round2SecondIndex = index * 2 + 1;
                  // Round 2 matches are positioned with offset: (round2FirstIndex * totalMatchHeight) + (totalMatchHeight / 2) + matchHeight / 2
                  const round2FirstPos =
                    round2FirstIndex * totalMatchHeight +
                    totalMatchHeight / 2 +
                    matchHeight / 2; // Round 2 offset
                  const round2SecondPos =
                    round2SecondIndex * totalMatchHeight +
                    totalMatchHeight / 2 +
                    matchHeight / 2; // Round 2 offset
                  let topPosition =
                    (round2FirstPos + round2SecondPos) / 2 + matchHeight / 2; // Push down by half match box height
                  // M14 (index 1) needs additional 2.0 match box height push down
                  if (index === 1) {
                    topPosition += matchHeight * 2.0;
                  }
                  return (
                    <div
                      key={index}
                      className="w-[200px] border border-gray-300 bg-white px-0 sm:px-1 py-0 sm:py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all absolute"
                      style={{ top: `${topPosition}px` }}
                      onClick={() => handleMatchClick(`round3-${index}`)}
                    >
                      <div className="grid grid-cols-[1fr_3fr_1fr] gap-x-0 sm:gap-x-2 gap-y-0">
                        <div className="flex items-center">
                          <div className="text-[18px] text-gray-700 font-medium">
                            {matchId}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-0 min-w-0 flex-1">
                          <div
                            className={`text-[18px] text-left py-px pb-px font-medium truncate px-1 leading-relaxed ${
                              match?.winner === "player1"
                                ? "text-yellow-600 font-bold"
                                : "text-gray-800"
                            }`}
                            title={match?.player1?.name || "TBD"}
                          >
                            {match?.player1?.name || "TBD"}
                          </div>
                          <div
                            className={`text-[18px] text-left py-px pt-px font-medium truncate px-1 leading-relaxed ${
                              match?.winner === "player2"
                                ? "text-yellow-600 font-bold"
                                : "text-gray-800"
                            }`}
                            title={match?.player2?.name || "TBD"}
                          >
                            {match?.player2?.name || "TBD"}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-0">
                          <div
                            className={`text-[18px] font-bold text-center py-0 sm:py-px pb-0 sm:pb-px leading-relaxed ${
                              match?.winner === "player1"
                                ? "text-yellow-600"
                                : "text-gray-800"
                            }`}
                          >
                            {match?.score1 || "-"}
                          </div>
                          <div
                            className={`text-[18px] font-bold text-center py-0 sm:py-px pt-0 sm:pt-px leading-relaxed ${
                              match?.winner === "player2"
                                ? "text-yellow-600"
                                : "text-gray-800"
                            }`}
                          >
                            {match?.score2 || "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column 4: Round 4 (1 match - Final) - Centered between M13 and M14 */}
              <div className="flex flex-col min-h-[600px] relative w-[200px]">
                {(() => {
                  const match = getMatchById("round4-0");
                  // M15 centered between M13(0) and M14(1)
                  const matchHeight = 60; // Approximate height of a match box
                  const spacing = 4;
                  const totalMatchHeight = matchHeight + spacing;
                  // Calculate M13 and M14 positions accounting for all previous offsets (same as Champion calculation)
                  const m13Pos = 1 * totalMatchHeight + totalMatchHeight / 2;
                  const m14Pos = 5 * totalMatchHeight + totalMatchHeight / 2;
                  const m15Pos = (m13Pos + m14Pos) / 2;
                  // M15 should be inline with Champion, which is at m15Pos + matchHeight / 2 + spacing
                  const topPosition = m15Pos + matchHeight / 2 + spacing;
                  return (
                    <div
                      className="w-[200px] border border-gray-300 bg-white px-0 sm:px-1 py-0 sm:py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all absolute"
                      style={{ top: `${topPosition}px` }}
                      onClick={() => handleMatchClick("round4-0")}
                    >
                      <div className="grid grid-cols-[1fr_3fr_1fr] gap-x-0 sm:gap-x-2 gap-y-0">
                        <div className="flex items-center">
                          <div className="text-[18px] text-gray-700 font-medium">
                            {matchNumbers.round4[0]}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-0 min-w-0 flex-1">
                          <div
                            className={`text-[18px] text-left py-px pb-px font-medium truncate px-1 leading-relaxed ${
                              match?.winner === "player1"
                                ? "text-yellow-600 font-bold"
                                : "text-gray-800"
                            }`}
                            title={match?.player1?.name || "TBD"}
                          >
                            {match?.player1?.name || "TBD"}
                          </div>
                          <div
                            className={`text-[18px] text-left py-px pt-px font-medium truncate px-1 leading-relaxed ${
                              match?.winner === "player2"
                                ? "text-yellow-600 font-bold"
                                : "text-gray-800"
                            }`}
                            title={match?.player2?.name || "TBD"}
                          >
                            {match?.player2?.name || "TBD"}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-0">
                          <div
                            className={`text-[18px] font-bold text-center py-0 sm:py-px pb-0 sm:pb-px leading-relaxed ${
                              match?.winner === "player1"
                                ? "text-yellow-600"
                                : "text-gray-800"
                            }`}
                          >
                            {match?.score1 || "-"}
                          </div>
                          <div
                            className={`text-[18px] font-bold text-center py-0 sm:py-px pt-0 sm:pt-px leading-relaxed ${
                              match?.winner === "player2"
                                ? "text-yellow-600"
                                : "text-gray-800"
                            }`}
                          >
                            {match?.score2 || "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Winner Rectangle - Centered below M15 */}
              <div className="flex flex-col min-h-[600px] relative w-[200px]">
                {(() => {
                  const finalMatch = getMatchById("round4-0");
                  const winner = finalMatch?.winner
                    ? finalMatch.winner === "player1"
                      ? finalMatch.player1
                      : finalMatch.player2
                    : null;
                  // M15 is centered between M13 and M14
                  const matchHeight = 60; // Approximate height of a match box
                  const spacing = 4;
                  const totalMatchHeight = matchHeight + spacing;
                  const m13Pos = 1 * totalMatchHeight + totalMatchHeight / 2;
                  const m14Pos = 5 * totalMatchHeight + totalMatchHeight / 2;
                  const m15Pos = (m13Pos + m14Pos) / 2;
                  const topPosition = m15Pos + matchHeight / 2 + spacing + 20; // Push down by 20px
                  return (
                    <div
                      className="w-[200px] border border-gray-300 bg-white px-1 py-[3px] flex items-center absolute"
                      style={{ top: `${topPosition}px` }}
                    >
                      <div className="text-[20px] font-bold text-gray-700 text-center leading-none w-full">
                        {winner?.name || "Champion"}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Input Modal - Same as Matches page */}
      {isModalOpen && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedMatch.matchNumber} -{" "}
                {selectedMatch.round.charAt(0).toUpperCase() +
                  selectedMatch.round
                    .slice(1)
                    .replace(/round(\d)/i, (match, num) => `Round ${num}`)}
              </h3>
              <div className="flex items-center gap-2">
                {isManager && (
                  <button
                    onClick={() => handleResetMatch(selectedMatch.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Reset this match"
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
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-800 font-medium hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Player 1 Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Player 1
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
                  value={selectedPlayer1}
                  onChange={(e) => setSelectedPlayer1(e.target.value)}
                >
                  <option value="">Select Player</option>
                  {players
                    .filter((player) => player.id !== selectedPlayer2)
                    .map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Player 2 Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Player 2
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
                  value={selectedPlayer2}
                  onChange={(e) => setSelectedPlayer2(e.target.value)}
                >
                  <option value="">Select Player</option>
                  {players
                    .filter((player) => player.id !== selectedPlayer1)
                    .map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Race to X */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Race to X
                </label>
                <input
                  type="number"
                  min="1"
                  max="21"
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-gray-900"
                  value={raceTo || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setRaceTo(9);
                    } else {
                      setRaceTo(parseInt(val) || 9);
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                />
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score 1
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max={raceTo}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-gray-900"
                      value={score1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setScore1(Math.min(val, raceTo));
                      }}
                    />
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setScore1(Math.min(score1 + 1, raceTo))}
                        className="border border-gray-300 rounded-t-md px-2 py-0.5 hover:bg-gray-100 transition-colors"
                        disabled={score1 >= raceTo}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScore1(Math.max(score1 - 1, 0))}
                        className="border border-gray-300 border-t-0 rounded-b-md px-2 py-0.5 hover:bg-gray-100 transition-colors"
                        disabled={score1 <= 0}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {score1 >= raceTo && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Winner! Match will auto-advance.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score 2
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max={raceTo}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-gray-900"
                      value={score2}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setScore2(Math.min(val, raceTo));
                      }}
                    />
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setScore2(Math.min(score2 + 1, raceTo))}
                        className="border border-gray-300 rounded-t-md px-2 py-0.5 hover:bg-gray-100 transition-colors"
                        disabled={score2 >= raceTo}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScore2(Math.max(score2 - 1, 0))}
                        className="border border-gray-300 border-t-0 rounded-b-md px-2 py-0.5 hover:bg-gray-100 transition-colors"
                        disabled={score2 <= 0}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {score2 >= raceTo && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Winner! Match will auto-advance.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMatch}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SixteenPlayerMatchPage;
