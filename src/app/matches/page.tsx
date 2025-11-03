"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
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
  status: "pending" | "in_progress" | "completed";
  round: string;
  bracket: "winners" | "losers";
  // Bracket advancement fields
  nextMatchId?: string; // ID of match winner advances to
  nextPosition?: "player1" | "player2"; // Position in next match
  loserNextMatchId?: string; // ID of match loser goes to (losers bracket)
  loserNextPosition?: "player1" | "player2"; // Position in losers bracket match
}

const MatchesPage = () => {
  // Authentication
  const { isManager, loading: authLoading } = useAuth();

  // Tournament state - can be managed by tournament manager
  const totalPlayers = 10; // Example: 8, 9, or 10 players
  const qualifyingMatches = totalPlayers > 8 ? totalPlayers - 8 : 0;

  // State management
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal form state
  const [selectedPlayer1, setSelectedPlayer1] = useState<string>("");
  const [selectedPlayer2, setSelectedPlayer2] = useState<string>("");
  const [score1, setScore1] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0);
  const [raceTo, setRaceTo] = useState<number>(9);

  // Generate match numbers based on structure
  const getMatchNumbers = () => {
    let matchCounter = 1;
    const matches = {
      qualifying: [] as string[],
      round1: [] as string[],
      round2: [] as string[],
      round3: [] as string[],
    };

    // Qualifying matches (if any)
    for (let i = 0; i < qualifyingMatches; i++) {
      matches.qualifying.push(`M${matchCounter++}`);
    }

    // Round 1 matches (always 4)
    for (let i = 0; i < 4; i++) {
      matches.round1.push(`M${matchCounter++}`);
    }

    // Round 2 matches (always 2)
    for (let i = 0; i < 2; i++) {
      matches.round2.push(`M${matchCounter++}`);
    }

    // Round 3 match (always 1)
    matches.round3.push(`M${matchCounter++}`);

    return matches;
  };

  const matchNumbers = getMatchNumbers();

  // Initialize all matches for the tournament with proper bracket relationships
  const initializeMatches = useCallback(async () => {
    console.log("Initializing matches...");
    const allMatches: Match[] = [];
    let matchCounter = 1;

    // ===== WINNERS BRACKET =====
    
    // Qualifying matches (if any - for 9-10 players)
    const qualifyingMatchIds: string[] = [];
    for (let i = 0; i < qualifyingMatches; i++) {
      const matchId = `winners-qualifying-${i}`;
      qualifyingMatchIds.push(matchId);
      allMatches.push({
        id: matchId,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "qualifying",
        bracket: "winners",
        // Winners go to Round 1 matches (positions 0 or 3 if qualifying exists)
        nextMatchId: qualifyingMatches > 0 ? `winners-round1-${i === 0 ? 0 : 3}` : undefined,
        nextPosition: qualifyingMatches > 0 ? (i === 0 ? "player1" : "player2") : undefined,
        // Losers go to losers bracket qualifying
        loserNextMatchId: "losers-qualifying-0",
        loserNextPosition: i === 0 ? "player1" : "player2",
      });
    }

    // Round 1 matches (4 matches)
    const round1MatchIds: string[] = [];
    for (let i = 0; i < 4; i++) {
      const matchId = `winners-round1-${i}`;
      round1MatchIds.push(matchId);
      allMatches.push({
        id: matchId,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "round1",
        bracket: "winners",
        // Winners advance to Round 2 (positions based on bracket structure)
        nextMatchId: `winners-round2-${Math.floor(i / 2)}`,
        nextPosition: i % 2 === 0 ? "player1" : "player2",
        // Losers go to different losers bracket matches
        loserNextMatchId: i < 2 ? "losers-r1-0" : i === 2 ? "losers-r1-1" : "losers-r1-2",
        loserNextPosition: i % 2 === 0 ? "player1" : "player2",
      });
    }

    // Round 2 matches (2 matches)
    const round2MatchIds: string[] = [];
    for (let i = 0; i < 2; i++) {
      const matchId = `winners-round2-${i}`;
      round2MatchIds.push(matchId);
      allMatches.push({
        id: matchId,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "round2",
        bracket: "winners",
        // Winners advance to Round 3 (final)
        nextMatchId: "winners-round3-0",
        nextPosition: i === 0 ? "player1" : "player2",
        // Losers go to losers bracket R3 (later rounds)
        loserNextMatchId: "losers-r3-0",
        loserNextPosition: i === 0 ? "player1" : "player2",
      });
    }

    // Round 3 match (WB Final)
    allMatches.push({
      id: "winners-round3-0",
      matchNumber: `M${matchCounter++}`,
      score1: 0,
      score2: 0,
      raceTo: 9,
      status: "pending",
      round: "round3",
      bracket: "winners",
      // Winner stays as WB winner (no next match yet - will fight LB winner later)
      // Loser goes to losers bracket final
      loserNextMatchId: "losers-r5-0",
      loserNextPosition: "player1",
    });

    // ===== LOSERS BRACKET =====
    
    // Losers Qualifying (1 match) - gets losers from WB qualifying
    allMatches.push({
      id: "losers-qualifying-0",
      matchNumber: `M${matchCounter++}`,
      score1: 0,
      score2: 0,
      raceTo: 9,
      status: "pending",
      round: "losers-qualifying",
      bracket: "losers",
      nextMatchId: "losers-r1-0",
      nextPosition: "player1",
    });

    // Losers R1 (3 matches) - gets losers from WB Round 1 + LB qualifying winner
    for (let i = 0; i < 3; i++) {
      allMatches.push({
        id: `losers-r1-${i}`,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "losers-r1",
        bracket: "losers",
        nextMatchId: i < 2 ? `losers-r2-${Math.floor(i / 2)}` : "losers-r2-1",
        nextPosition: i % 2 === 0 ? "player1" : "player2",
      });
    }

    // Losers R2 (2 matches)
    for (let i = 0; i < 2; i++) {
      allMatches.push({
        id: `losers-r2-${i}`,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: "pending",
        round: "losers-r2",
        bracket: "losers",
        nextMatchId: "losers-r3-0",
        nextPosition: i === 0 ? "player1" : "player2",
      });
    }

    // Losers R3 (1 match) - gets losers from WB Round 2 + LB R2 winners
    allMatches.push({
      id: "losers-r3-0",
      matchNumber: `M${matchCounter++}`,
      score1: 0,
      score2: 0,
      raceTo: 9,
      status: "pending",
      round: "losers-r3",
      bracket: "losers",
      nextMatchId: "losers-r4-0",
      nextPosition: "player1",
    });

    // Losers R4 (1 match) - gets winner from LB R3
    allMatches.push({
      id: "losers-r4-0",
      matchNumber: `M${matchCounter++}`,
      score1: 0,
      score2: 0,
      raceTo: 9,
      status: "pending",
      round: "losers-r4",
      bracket: "losers",
      nextMatchId: "losers-r5-0",
      nextPosition: "player2",
    });

    // Losers R5 (1 match) - Final LB match - gets WB final loser + LB R4 winner
    allMatches.push({
      id: "losers-r5-0",
      matchNumber: `M${matchCounter++}`,
      score1: 0,
      score2: 0,
      raceTo: 9,
      status: "pending",
      round: "losers-r5",
      bracket: "losers",
      // Winner becomes LB winner (no next match - will fight WB winner in quarterfinals later)
    });

    console.log("Created matches:", allMatches.length);
    setMatches(allMatches);

    // Save all matches to Firebase
    try {
      console.log("Saving matches to Firebase...");
      const matchesRef = collection(db, "matches");
      for (const match of allMatches) {
        await setDoc(doc(matchesRef, match.id), match);
        console.log(`Saved match ${match.matchNumber} to Firebase`);
      }
      console.log("All matches saved to Firebase successfully!");
    } catch (error) {
      console.error("Error saving matches to Firebase:", error);
    }
  }, [qualifyingMatches]);

  // Load players and matches from Firebase
  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    console.log("useEffect triggered - loading data...");
    console.log("Is Manager:", isManager);
    const loadData = async () => {
      try {
        console.log("Loading players from Firebase...");
        // Load players
        const playersSnapshot = await getDocs(collection(db, "players"));
        const playersData = playersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Player[];
        console.log("Loaded players:", playersData.length);
        setPlayers(playersData);

        // Check if matches exist in Firebase
        console.log("Checking for existing matches in Firebase...");
        const matchesSnapshot = await getDocs(collection(db, "matches"));
        if (matchesSnapshot.empty) {
          console.log("No matches found, initializing...");
          // Only initialize if manager is logged in
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
        console.error("Full error details:", error);
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
        const matchesSnapshot = await getDocs(collection(db, "matches"));
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

  // Handle match click
  const handleMatchClick = (matchId: string) => {
    if (!isManager) {
      alert("Please log in as a manager to edit matches.");
      return;
    }
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      setSelectedMatch(match);
      setSelectedPlayer1(match.player1?.id || "");
      setSelectedPlayer2(match.player2?.id || "");
      setScore1(match.score1);
      setScore2(match.score2);
      setRaceTo(match.raceTo);
      setIsModalOpen(true);
    }
  };

  // Get match by ID
  const getMatchById = (matchId: string) => {
    return matches.find((m) => m.id === matchId);
  };

  // Calculate next match relationships based on match structure (fallback if not stored)
  const calculateNextMatch = (match: Match): { nextMatchId?: string; nextPosition?: "player1" | "player2"; loserNextMatchId?: string; loserNextPosition?: "player1" | "player2" } => {
    // If relationships are already stored, use them
    if (match.nextMatchId) {
      return {
        nextMatchId: match.nextMatchId,
        nextPosition: match.nextPosition,
        loserNextMatchId: match.loserNextMatchId,
        loserNextPosition: match.loserNextPosition,
      };
    }

    // Calculate based on match ID pattern
    if (match.bracket === "winners") {
      if (match.id.startsWith("winners-qualifying-")) {
        const index = parseInt(match.id.split("-")[2]);
        return {
          nextMatchId: index === 0 ? "winners-round1-0" : "winners-round1-3",
          nextPosition: index === 0 ? "player1" : "player2",
          loserNextMatchId: "losers-qualifying-0",
          loserNextPosition: index === 0 ? "player1" : "player2",
        };
      } else if (match.id.startsWith("winners-round1-")) {
        const index = parseInt(match.id.split("-")[2]);
        return {
          nextMatchId: `winners-round2-${Math.floor(index / 2)}`,
          nextPosition: index % 2 === 0 ? "player1" : "player2",
          loserNextMatchId: index < 2 ? "losers-r1-0" : index === 2 ? "losers-r1-1" : "losers-r1-2",
          loserNextPosition: index % 2 === 0 ? "player1" : "player2",
        };
      } else if (match.id.startsWith("winners-round2-")) {
        const index = parseInt(match.id.split("-")[2]);
        return {
          nextMatchId: "winners-round3-0",
          nextPosition: index === 0 ? "player1" : "player2",
          loserNextMatchId: "losers-r3-0",
          loserNextPosition: index === 0 ? "player1" : "player2",
        };
      } else if (match.id === "winners-round3-0") {
        return {
          loserNextMatchId: "losers-r5-0",
          loserNextPosition: "player1",
        };
      }
    } else if (match.bracket === "losers") {
      if (match.id === "losers-qualifying-0") {
        return {
          nextMatchId: "losers-r1-0",
          nextPosition: "player1",
        };
      } else if (match.id.startsWith("losers-r1-")) {
        const index = parseInt(match.id.split("-")[2]);
        return {
          nextMatchId: index < 2 ? `losers-r2-${Math.floor(index / 2)}` : "losers-r2-1",
          nextPosition: index % 2 === 0 ? "player1" : "player2",
        };
      } else if (match.id.startsWith("losers-r2-")) {
        const index = parseInt(match.id.split("-")[2]);
        return {
          nextMatchId: "losers-r3-0",
          nextPosition: index === 0 ? "player1" : "player2",
        };
      } else if (match.id === "losers-r3-0") {
        return {
          nextMatchId: "losers-r4-0",
          nextPosition: "player1",
        };
      } else if (match.id === "losers-r4-0") {
        return {
          nextMatchId: "losers-r5-0",
          nextPosition: "player2",
        };
      }
    }

    return {};
  };

  // Auto-advance players when a match completes
  const advancePlayers = async (completedMatch: Match) => {
    if (!completedMatch.winner || completedMatch.status !== "completed") {
      return;
    }

    const winner = completedMatch.winner === "player1" 
      ? completedMatch.player1 
      : completedMatch.player2;
    const loser = completedMatch.winner === "player1"
      ? completedMatch.player2
      : completedMatch.player1;

    if (!winner) {
      console.warn("⚠️ No winner found in completed match");
      return;
    }

    // Reload matches to get latest state
    const matchesSnapshot = await getDocs(collection(db, "matches"));
    const currentMatches = matchesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Match[];
    
    const updatedMatches = [...currentMatches];

    // Find the completed match to get relationships
    const matchWithRelations = updatedMatches.find(m => m.id === completedMatch.id);
    const relationships = calculateNextMatch(matchWithRelations || completedMatch);
    
    console.log(`🔄 Processing advancement for ${completedMatch.matchNumber}:`, relationships);
    
    // Advance winner to next match
    const nextMatchId = relationships.nextMatchId;
    const nextPosition = relationships.nextPosition;
    
    if (nextMatchId && nextPosition && winner) {
      const nextMatch = updatedMatches.find(m => m.id === nextMatchId);
      if (nextMatch) {
        if (nextPosition === "player1") {
          nextMatch.player1 = winner;
        } else {
          nextMatch.player2 = winner;
        }
        // Update status if both players are now set
        if (nextMatch.player1 && nextMatch.player2 && nextMatch.status === "pending") {
          nextMatch.status = "in_progress";
        }

        // Save to Firebase
        try {
          const matchRef = doc(db, "matches", nextMatch.id);
          await updateDoc(matchRef, {
            player1: nextMatch.player1 || null,
            player2: nextMatch.player2 || null,
            status: nextMatch.status,
          });
          console.log(`✅ Advanced ${winner.name} to ${nextMatch.matchNumber} (${nextMatchId}, ${nextPosition})`);
        } catch (error) {
          console.error("Error updating next match:", error);
        }
      } else {
        console.warn(`⚠️ Next match ${nextMatchId} not found in matches:`, updatedMatches.map(m => ({ id: m.id, matchNumber: m.matchNumber })));
      }
    } else {
      console.warn(`⚠️ Missing advancement data:`, { nextMatchId, nextPosition, hasWinner: !!winner });
    }

    // Advance loser to losers bracket (if applicable)
    const loserMatchId = relationships.loserNextMatchId;
    const loserPosition = relationships.loserNextPosition;
    
    if (loserMatchId && loserPosition && loser) {
      const loserMatch = updatedMatches.find(m => m.id === loserMatchId);
      if (loserMatch) {
        if (loserPosition === "player1") {
          loserMatch.player1 = loser;
        } else {
          loserMatch.player2 = loser;
        }
        // Update status if both players are now set
        if (loserMatch.player1 && loserMatch.player2 && loserMatch.status === "pending") {
          loserMatch.status = "in_progress";
        }

        // Save to Firebase
        try {
          const matchRef = doc(db, "matches", loserMatch.id);
          await updateDoc(matchRef, {
            player1: loserMatch.player1 || null,
            player2: loserMatch.player2 || null,
            status: loserMatch.status,
          });
          console.log(`✅ Advanced ${loser.name} to losers bracket ${loserMatch.matchNumber} (${loserPosition})`);
        } catch (error) {
          console.error("Error updating losers bracket match:", error);
        }
      } else {
        console.warn(`⚠️ Losers bracket match ${loserMatchId} not found in matches:`, updatedMatches.map(m => ({ id: m.id, matchNumber: m.matchNumber })));
      }
    } else if (loser) {
      console.warn(`⚠️ Missing loser advancement data:`, { loserMatchId, loserPosition, hasLoser: !!loser });
    }

    setMatches(updatedMatches);
  };

  // Global reset - reset all matches
  const handleGlobalReset = async () => {
    if (!isManager) return;
    
    const confirmReset = window.confirm(
      "Are you sure you want to reset ALL matches? This will clear all scores, players, and set all matches to pending status."
    );
    
    if (!confirmReset) return;

    try {
      // Reset all matches in Firebase
      const matchesCollection = collection(db, "matches");
      const matchesSnapshot = await getDocs(matchesCollection);
      
      for (const matchDoc of matchesSnapshot.docs) {
        const matchRef = doc(db, "matches", matchDoc.id);
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
      alert("All matches have been reset successfully!");
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
      const matchRef = doc(db, "matches", matchId);
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
      ...selectedMatch, // This preserves all fields including nextMatchId, loserNextMatchId, etc.
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
      // Preserve relationship fields
      nextMatchId: selectedMatch.nextMatchId,
      nextPosition: selectedMatch.nextPosition,
      loserNextMatchId: selectedMatch.loserNextMatchId,
      loserNextPosition: selectedMatch.loserNextPosition,
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
      const matchRef = doc(db, "matches", selectedMatch.id);
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
        alert(`Match completed! ${winnerName} wins!\n\nPlayers have been automatically advanced to the next round.`);
        
        // Reload matches to show updated bracket
        const matchesSnapshot = await getDocs(collection(db, "matches"));
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
    <div className="p-3 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tournament Matches
          </h1>
          {isManager && (
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
          )}
        </div>

        {/* Main Container: Column Layout */}
        <div className="flex flex-col space-y-2">
          {/* Row 1: Winners Bracket */}
          <div className="w-full">
            <div className="flex items-center mb-2">
              <div className="bg-blue-600 text-white px-2 py-1 rounded-lg font-bold mr-2 text-sm">
                WB
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Winners Bracket
              </h2>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="overflow-x-auto">
              <div className="flex space-x-4 min-w-max pb-2 items-center min-h-[300px]">
                {/* Column 1: Qualifying matches (dynamic) */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.qualifying.length > 0 ? (
                      matchNumbers.qualifying.map((matchId, index) => {
                        const match = getMatchById(
                          `winners-qualifying-${index}`
                        );
                        return (
                          <div
                            key={index}
                            className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                            onClick={() =>
                              handleMatchClick(`winners-qualifying-${index}`)
                            }
                          >
                            <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                              {/* Column 1: Match Number (1x1) */}
                              <div className="flex items-center justify-center border-r border-gray-400">
                                <div className="text-sm text-gray-700 font-medium">
                                  {matchId}
                                </div>
                              </div>

                              {/* Column 2: Player Names (2x1) */}
                              <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-sm text-left border-b border-gray-400 pb-1 truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800 font-medium"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-sm text-left pt-1 truncate px-1 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800 font-medium"
                                }`}
                                title={match?.player2?.name || "TBD"}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                              </div>

                              {/* Column 3: Scores (2x1) */}
                              <div className="flex flex-col justify-center space-y-0">
                                <div
                                  className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                    match?.winner === "player1"
                                      ? "text-yellow-600"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {match?.score1 || 0}
                                </div>
                                <div
                                  className={`text-base font-bold text-center pt-1 ${
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
                      })
                    ) : (
                      <div className="text-gray-800 font-medium text-sm">
                        No qualifying matches
                      </div>
                    )}
                  </div>
                </div>

                {/* Column 2: 4 matches */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Round 1
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.round1.map((matchId, index) => {
                      const match = getMatchById(`winners-round1-${index}`);
                      const needsQualifying =
                        qualifyingMatches > 0 && (index === 0 || index === 3);
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                          onClick={() =>
                            handleMatchClick(`winners-round1-${index}`)
                          }
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) */}
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400 min-w-0 flex-1">
                              <div
                                className={`text-xs text-left border-b border-gray-400 pb-1 font-medium truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-xs text-left pt-1 font-medium truncate px-1 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player2?.name || "TBD"}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>

                            {/* Column 3: Scores (2x1) */}
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score2 || (needsQualifying ? "-" : 0)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: 2 matches */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Round 2
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.round2.map((matchId, index) => {
                      const match = getMatchById(`winners-round2-${index}`);
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                          onClick={() =>
                            handleMatchClick(`winners-round2-${index}`)
                          }
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) */}
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400 min-w-0 flex-1">
                              <div
                                className={`text-xs text-left border-b border-gray-400 pb-1 font-medium truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-xs text-left pt-1 font-medium truncate px-1 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player2?.name || "TBD"}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>

                            {/* Column 3: Scores (2x1) */}
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Column 4: 1 match */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Round 3
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const match = getMatchById("winners-round3-0");
                      return (
                        <div
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick("winners-round3-0")}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchNumbers.round3[0]}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) */}
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400 min-w-0 flex-1">
                              <div
                                className={`text-xs text-left border-b border-gray-400 pb-1 font-medium truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-xs text-left pt-1 font-medium truncate px-1 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player2?.name || "TBD"}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>

                            {/* Column 3: Scores (2x1) */}
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Winner Rectangle */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Winner
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const wbFinalMatch = getMatchById("winners-round3-0");
                      const wbWinner = wbFinalMatch?.winner 
                        ? (wbFinalMatch.winner === "player1" ? wbFinalMatch.player1 : wbFinalMatch.player2)
                        : null;
                      return (
                        <div className="w-56 h-12 border-2 border-gray-300 rounded-lg bg-white px-1 py-px flex items-center justify-center">
                          <div className="text-base font-bold text-gray-700 text-center">
                            {wbWinner?.name || "Group A WB Winner"}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-300 my-2"></div>

          {/* Row 2: Losers Bracket */}
          <div className="w-full">
            <div className="flex items-center mb-2">
              <div className="bg-red-600 text-white px-2 py-1 rounded-lg font-bold mr-2 text-sm">
                LB
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Losers Bracket
              </h2>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="overflow-x-auto">
              <div className="flex space-x-4 min-w-max pb-2 items-center min-h-[300px]">
                {/* Losers (Qualifying) - 1 match */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Losers Q
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const match = getMatchById("losers-qualifying-0");
                      return (
                        <div
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick("losers-qualifying-0")}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {match?.matchNumber || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-base text-center border-b border-gray-400 pb-1 font-medium ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-base text-center pt-1 font-medium ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Losers R1 - 3 matches */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Losers R1
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {[0, 1, 2].map((index) => {
                      const match = getMatchById(`losers-r1-${index}`);
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick(`losers-r1-${index}`)}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {match?.matchNumber || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-base text-center border-b border-gray-400 pb-1 font-medium ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-base text-center pt-1 font-medium ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Losers R2 - 2 matches */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Losers R2
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {[0, 1].map((index) => {
                      const match = getMatchById(`losers-r2-${index}`);
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick(`losers-r2-${index}`)}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {match?.matchNumber || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-base text-center border-b border-gray-400 pb-1 font-medium ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-base text-center pt-1 font-medium ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Losers R3 - 1 match */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Losers R3
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const match = getMatchById("losers-r3-0");
                      return (
                        <div
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick("losers-r3-0")}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {match?.matchNumber || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-base text-center border-b border-gray-400 pb-1 font-medium ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-base text-center pt-1 font-medium ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Losers R4 - 1 match */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Losers R4
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const match = getMatchById("losers-r4-0");
                      return (
                        <div
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick("losers-r4-0")}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {match?.matchNumber || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-base text-center border-b border-gray-400 pb-1 font-medium ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-base text-center pt-1 font-medium ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Losers R5 - Final LB match */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Losers R5
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const match = getMatchById("losers-r5-0");
                      return (
                        <div
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick("losers-r5-0")}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {match?.matchNumber || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-base text-center border-b border-gray-400 pb-1 font-medium ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-base text-center pt-1 font-medium ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.player2?.name || "TBD"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-0">
                              <div
                                className={`text-base font-bold text-center border-b border-gray-400 pb-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-1 ${
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
                </div>

                {/* Loser Bracket Winner */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Winner
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const lbFinalMatch = getMatchById("losers-r5-0");
                      const lbWinner = lbFinalMatch?.winner 
                        ? (lbFinalMatch.winner === "player1" ? lbFinalMatch.player1 : lbFinalMatch.player2)
                        : null;
                      return (
                        <div className="w-56 h-12 border-2 border-gray-300 rounded-lg bg-white px-1 py-px flex items-center justify-center">
                          <div className="text-base font-bold text-gray-700 text-center">
                            {lbWinner?.name || "Group A LB Winner"}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Input Modal */}
      {isModalOpen && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedMatch.matchNumber} - {selectedMatch.round.charAt(0).toUpperCase() + selectedMatch.round.slice(1).replace(/round(\d)/i, (match, num) => `Round ${num}`)}
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
                  value={raceTo}
                  onChange={(e) => setRaceTo(parseInt(e.target.value) || 9)}
                />
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score 1
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={raceTo}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-gray-900"
                    value={score1}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setScore1(Math.min(val, raceTo));
                    }}
                  />
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
                  <input
                    type="number"
                    min="0"
                    max={raceTo}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-gray-900"
                    value={score2}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setScore2(Math.min(val, raceTo));
                    }}
                  />
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
                  Advance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;
