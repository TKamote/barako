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
  const totalPlayers = 12; // Maximum 12 players per group (minimum 8)
  // QR matches = (players going to QR) / 2 = (totalPlayers - 8) / 2
  // 8 players: 0 QR matches
  // 9 players: (9-8)/2 = 0.5 → 1 QR match (2 players)
  // 10 players: (10-8)/2 = 1 → 2 QR matches (4 players)
  // 11 players: (11-8)/2 = 1.5 → 3 QR matches (6 players)
  // 12 players: (12-8)/2 = 2 → 4 QR matches (8 players)
  const playersInQR = totalPlayers > 8 ? totalPlayers - 8 : 0;
  const qualifyingMatches = Math.floor(playersInQR / 2); // Number of QR matches

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

  // Generate match numbers based on structure
  // Always show 4 QR matches (max capacity for 12 players)
  const getMatchNumbers = () => {
    let matchCounter = 1;
    const matches = {
      qualifying: [] as string[],
      round1: [] as string[],
      round2: [] as string[],
      round3: [] as string[],
      // Losers bracket match numbers (for 12 players max scenario)
      losersQualifying: [] as string[],
      losersR1: [] as string[],
      losersR2: [] as string[],
      losersR3: [] as string[],
      losersFinal: [] as string[],
    };

    // Winners Bracket: Qualifying matches (always 4 for UI, but only active ones based on qualifyingMatches)
    for (let i = 0; i < 4; i++) {
      matches.qualifying.push(`M${matchCounter++}`);
    }

    // Winners Bracket: Round 1 matches (always 4)
    for (let i = 0; i < 4; i++) {
      matches.round1.push(`M${matchCounter++}`);
    }

    // Winners Bracket: Round 2 matches (always 2)
    for (let i = 0; i < 2; i++) {
      matches.round2.push(`M${matchCounter++}`);
    }

    // Winners Bracket: Round 3 match (always 1)
    matches.round3.push(`M${matchCounter++}`);

    // Losers Bracket: Qualifying (max 2 matches for 12 players)
    for (let i = 0; i < 2; i++) {
      matches.losersQualifying.push(`M${matchCounter++}`);
    }

    // Losers Bracket: R1 (max 3 matches for 12 players)
    for (let i = 0; i < 3; i++) {
      matches.losersR1.push(`M${matchCounter++}`);
    }

    // Losers Bracket: R2 (max 3 matches for 12 players)
    for (let i = 0; i < 3; i++) {
      matches.losersR2.push(`M${matchCounter++}`);
    }

    // Losers Bracket: R3 (max 2 matches for 12 players)
    for (let i = 0; i < 2; i++) {
      matches.losersR3.push(`M${matchCounter++}`);
    }

    // Losers Bracket: Final (1 match)
    matches.losersFinal.push(`M${matchCounter++}`);

    return matches;
  };

  const matchNumbers = getMatchNumbers();

  // Initialize all matches for the tournament with proper bracket relationships
  const initializeMatches = useCallback(async () => {
    console.log("Initializing matches...");
    const allMatches: Match[] = [];
    let matchCounter = 1;

    // ===== WINNERS BRACKET =====
    
    // Qualifying Round (QR) matches - Always initialize 4 matches (max for 12 players)
    // QR winners advance to Round 1, filling player2 positions
    // Top seeds in Round 1 get byes (player1 positions)
    const qualifyingMatchIds: string[] = [];
    for (let i = 0; i < 4; i++) {
      const matchId = `winners-qualifying-${i}`;
      qualifyingMatchIds.push(matchId);
      // Only create active matches (based on qualifyingMatches)
      const isActive = i < qualifyingMatches;
      allMatches.push({
        id: matchId,
        matchNumber: `M${matchCounter++}`,
        score1: 0,
        score2: 0,
        raceTo: 9,
        status: isActive ? "pending" : "disabled", // Use "disabled" status for inactive QR matches
        round: "qualifying",
        bracket: "winners",
        // QR winners go to Round 1 matches, filling player2 positions
        // QR Match 0 winner → Round 1 Match 0 (player2)
        // QR Match 1 winner → Round 1 Match 1 (player2)
        // QR Match 2 winner → Round 1 Match 2 (player2)
        // QR Match 3 winner → Round 1 Match 3 (player2)
        nextMatchId: isActive ? `winners-round1-${i}` : undefined,
        nextPosition: isActive ? "player2" : undefined,
        // Losers go to losers bracket qualifying
        loserNextMatchId: isActive ? "losers-qualifying-0" : undefined,
        loserNextPosition: isActive ? (i === 0 ? "player1" : "player2") : undefined,
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

        // Load tournament state
        try {
          const tournamentStateRef = doc(db, "tournament_state", "current");
          const tournamentStateDoc = await getDoc(tournamentStateRef);
          if (tournamentStateDoc.exists()) {
            const stateData = tournamentStateDoc.data();
            setTournamentStarted(stateData.started || false);
          }
        } catch (error) {
          console.log("No tournament state found, tournament not started");
          setTournamentStarted(false);
        }

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

  // Handle delete QR match
  const handleDeleteQRMatch = async (index: number) => {
    if (!isManager) {
      alert("Only managers can delete QR matches.");
      return;
    }
    if (tournamentStarted) {
      alert("Cannot delete QR matches after tournament has started.");
      return;
    }

    const matchId = `winners-qualifying-${index}`;
    const match = matches.find((m) => m.id === matchId);
    
    if (!match) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete QR Match ${match.matchNumber}? This will remove it from the bracket.`
    );

    if (!confirmDelete) return;

    try {
      // Delete from Firebase
      const matchRef = doc(db, "matches", matchId);
      await updateDoc(matchRef, {
        status: "disabled",
        player1: null,
        player2: null,
        score1: 0,
        score2: 0,
        winner: null,
        nextMatchId: null,
        nextPosition: null,
        loserNextMatchId: null,
        loserNextPosition: null,
      });

      // Update local state
      const updatedMatches = matches.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            status: "disabled" as const,
            player1: undefined,
            player2: undefined,
            score1: 0,
            score2: 0,
            winner: undefined,
            nextMatchId: undefined,
            nextPosition: undefined,
            loserNextMatchId: undefined,
            loserNextPosition: undefined,
          };
        }
        return m;
      });

      setMatches(updatedMatches);
      alert("QR match deleted successfully!");
    } catch (error) {
      console.error("Error deleting QR match:", error);
      alert("Failed to delete QR match. Please try again.");
    }
  };

  // Handle match click
  const handleMatchClick = (matchId: string) => {
    if (!isManager) {
      alert("Please log in as a manager to edit matches.");
      return;
    }
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      // Don't allow editing disabled matches
      if (match.status === "disabled") {
        alert("This QR match is disabled and cannot be edited.");
        return;
      }
      
      // Before tournament starts, allow assigning players to QR matches
      // After tournament starts, require tournament to be started (existing behavior)
      if (tournamentStarted || matchId.startsWith("winners-qualifying-")) {
        setSelectedMatch(match);
        setSelectedPlayer1(match.player1?.id || "");
        setSelectedPlayer2(match.player2?.id || "");
        setScore1(match.score1);
        setScore2(match.score2);
        setRaceTo(match.raceTo);
        setIsModalOpen(true);
      } else {
        alert("Please start the tournament first before editing matches.");
      }
    }
  };

  // Handle start tournament
  const handleStartTournament = async () => {
    if (!isManager) {
      alert("Only managers can start the tournament.");
      return;
    }

    // Check if we have enough players (minimum 8, maximum 12)
    if (players.length < 8) {
      alert(
        `Please add at least 8 players before starting the tournament. Currently you have ${players.length} players.`
      );
      return;
    }
    if (players.length > 12) {
      alert(
        `Maximum 12 players allowed per group. Currently you have ${players.length} players. Please remove some players.`
      );
      return;
    }

    // Count active QR matches (not disabled)
    const activeQRMatches = matches.filter(
      (m) => m.id.startsWith("winners-qualifying-") && m.status !== "disabled"
    );
    const activeQRCount = activeQRMatches.length;

    // Validate all active QR matches have players assigned
    const incompleteQRMatches = activeQRMatches.filter(
      (m) => !m.player1 || !m.player2
    );

    if (incompleteQRMatches.length > 0) {
      alert(
        `Please assign players to all active QR matches before starting the tournament.\n\n${
          incompleteQRMatches.length
        } QR match(es) still missing players.`
      );
      return;
    }

    // Determine player count based on active QR matches
    let playerCountMessage = "";
    if (activeQRCount === 0) {
      playerCountMessage = "8 players (No QR matches)";
    } else if (activeQRCount === 1) {
      playerCountMessage = "9 players";
    } else if (activeQRCount === 2) {
      playerCountMessage = "10 players";
    } else if (activeQRCount === 3) {
      playerCountMessage = "11 players";
    } else if (activeQRCount === 4) {
      playerCountMessage = "12 players";
    }

    const confirmStart = window.confirm(
      `Are you sure you filled up the Matches according to the flow?\n\nActive QR matches: ${activeQRCount}\nPlayer count: ${playerCountMessage}\n\nProceed to start the tournament?`
    );

    if (!confirmStart) return;

    try {
      // Renumber all matches sequentially
      let matchCounter = 1;
      const updatedMatches = matches.map((match) => {
        const updatedMatch = { ...match };

        // Skip disabled QR matches - remove their match numbers
        if (match.status === "disabled" && match.id.startsWith("winners-qualifying-")) {
          updatedMatch.matchNumber = ""; // No match number for disabled QR matches
          return updatedMatch;
        }

        // Assign sequential match numbers to all active matches
        updatedMatch.matchNumber = `M${matchCounter++}`;
        return updatedMatch;
      });

      // Update all matches in Firebase with new match numbers
      for (const match of updatedMatches) {
        const matchRef = doc(db, "matches", match.id);
        await updateDoc(matchRef, {
          matchNumber: match.matchNumber || "",
        });
      }

      // Update local state
      setMatches(updatedMatches);

      // Update tournament state
      const tournamentStateRef = doc(db, "tournament_state", "current");
      await setDoc(tournamentStateRef, {
        started: true,
        startedAt: new Date().toISOString(),
        totalPlayers: players.length,
        activeQRMatches: activeQRCount,
      });
      setTournamentStarted(true);

      alert(
        `Tournament started successfully!\n\nActive QR matches: ${activeQRCount}\nAll matches have been renumbered sequentially.`
      );
    } catch (error) {
      console.error("Error starting tournament:", error);
      alert("Failed to start tournament. Please try again.");
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
      "Are you sure you want to reset ALL matches? This will clear all scores, players, set all matches to pending status, and reset the tournament start status."
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

      // Reset tournament state
      try {
        const tournamentStateRef = doc(db, "tournament_state", "current");
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
            Matches
          </h1>
          {isManager && (
            <div className="flex items-center gap-3">
              {!tournamentStarted && (
                <button
                  onClick={handleStartTournament}
                  disabled={players.length < 8 || players.length > 12}
                  className={`px-4 py-1 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    players.length >= 8 && players.length <= 12
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  title={
                    players.length < 8
                      ? `Need at least 8 players. Currently have ${players.length}.`
                      : players.length > 12
                      ? `Maximum 12 players allowed. Currently have ${players.length}.`
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
                {/* Column 1: Qualifying matches (always show 4, max for 12 players) */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    QR
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.qualifying.map((matchId, index) => {
                      const match = getMatchById(`winners-qualifying-${index}`);
                      const isDisabled = match?.status === "disabled" || index >= qualifyingMatches;
                      // After tournament starts, use match.matchNumber (could be empty for disabled matches)
                      // Before tournament starts, use matchNumbers array
                      const displayMatchNumber = tournamentStarted 
                        ? (match?.matchNumber || (isDisabled ? "—" : matchId))
                        : matchId;
                      
                      return (
                        <div
                          key={index}
                          className={`w-56 h-16 border-2 rounded-lg px-1 py-0 transition-all relative ${
                            isDisabled && tournamentStarted
                              ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
                              : "border-gray-300 bg-white cursor-pointer hover:border-blue-500 hover:shadow-md"
                          }`}
                          onClick={() => {
                            if (!isDisabled) {
                              if (tournamentStarted) {
                                handleMatchClick(`winners-qualifying-${index}`);
                              } else {
                                // Before tournament starts, allow clicking to assign players
                                handleMatchClick(`winners-qualifying-${index}`);
                              }
                            }
                          }}
                        >
                          {/* Delete button - only show if not started and manager */}
                          {isManager && !tournamentStarted && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteQRMatch(index);
                              }}
                              className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-base font-bold z-10 p-0 m-0 leading-none box-border"
                              style={{ minWidth: 0, minHeight: 0 }}
                              title="Delete this QR match"
                            >
                              ×
                            </button>
                          )}
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className={`text-sm font-medium ${
                                isDisabled && tournamentStarted ? "text-gray-400" : "text-gray-700"
                              }`}>
                                {displayMatchNumber}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) */}
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-sm text-left border-b border-gray-400 pb-0 truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : isDisabled && tournamentStarted
                                    ? "text-gray-400"
                                    : "text-gray-800 font-medium"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-sm text-left pt-0 truncate px-1 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600 font-bold"
                                    : isDisabled && tournamentStarted
                                    ? "text-gray-400"
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : isDisabled && tournamentStarted
                                    ? "text-gray-400"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600"
                                    : isDisabled && tournamentStarted
                                    ? "text-gray-400"
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

                {/* Column 2: 4 matches */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    Round 1
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.round1.map((matchId, index) => {
                      const match = getMatchById(`winners-round1-${index}`);
                      // If there are QR matches, Round 1 matches 0 to (qualifyingMatches-1) are waiting for QR winners
                      const waitingForQR = qualifyingMatches > 0 && index < qualifyingMatches;
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
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
                                className={`text-xs text-left border-b border-gray-400 pb-0 font-medium truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-xs text-left pt-0 font-medium truncate px-1 ${
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
                                  match?.winner === "player2"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score2 || (waitingForQR ? "-" : 0)}
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
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
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
                                className={`text-xs text-left border-b border-gray-400 pb-0 font-medium truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-xs text-left pt-0 font-medium truncate px-1 ${
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
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
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
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
                                className={`text-xs text-left border-b border-gray-400 pb-0 font-medium truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-xs text-left pt-0 font-medium truncate px-1 ${
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || "-"}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
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
                        <div className="w-56 h-12 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 flex items-center justify-center">
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
                {/* Column 1: Losers Qualifying (max 2 matches for 12 players) */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    LB QR
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.losersQualifying.map((matchId, index) => {
                      const match = getMatchById(`losers-qualifying-${index}`);
                      // For now, show all boxes - will disable unused ones based on player count later
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick(`losers-qualifying-${index}`)}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) - left aligned like winners bracket */}
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-400">
                              <div
                                className={`text-sm text-left border-b border-gray-400 pb-0 truncate px-1 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600 font-bold"
                                    : "text-gray-800 font-medium"
                                }`}
                                title={match?.player1?.name || "TBD"}
                              >
                                {match?.player1?.name || "TBD"}
                              </div>
                              <div
                                className={`text-sm text-left pt-0 truncate px-1 ${
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
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

                {/* Column 2: Losers R1 (max 3 matches for 12 players) */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    LB R1
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.losersR1.map((matchId, index) => {
                      const match = getMatchById(`losers-r1-${index}`);
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick(`losers-r1-${index}`)}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) - left aligned */}
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
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

                {/* Column 3: Losers R2 (max 3 matches for 12 players) */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    LB R2
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.losersR2.map((matchId, index) => {
                      const match = getMatchById(`losers-r2-${index}`);
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick(`losers-r2-${index}`)}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) - left aligned */}
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
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

                {/* Column 4: Losers R3 (max 2 matches for 12 players) */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    LB R3
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {matchNumbers.losersR3.map((matchId, index) => {
                      const match = getMatchById(`losers-r3-${index}`);
                      return (
                        <div
                          key={index}
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick(`losers-r3-${index}`)}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) - left aligned */}
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
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

                {/* Column 5: Losers Final (1 match) */}
                <div className="flex flex-col min-h-[250px]">
                  <div className="text-center font-bold text-sm text-gray-800 mb-2">
                    LB Final
                  </div>
                  <div className="flex flex-col space-y-1 items-center justify-center flex-1">
                    {(() => {
                      const match = getMatchById("losers-r5-0");
                      return (
                        <div
                          className="w-56 h-16 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                          onClick={() => handleMatchClick("losers-r5-0")}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-400">
                              <div className="text-sm text-gray-700 font-medium">
                                {matchNumbers.losersFinal[0]}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) - left aligned */}
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
                                className={`text-base font-bold text-center border-b border-gray-400 pb-0 ${
                                  match?.winner === "player1"
                                    ? "text-yellow-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {match?.score1 || 0}
                              </div>
                              <div
                                className={`text-base font-bold text-center pt-0 ${
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
                    })()}
                  </div>
                </div>

                {/* Column 6: Loser Bracket Winner */}
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
                        <div className="w-56 h-12 border-2 border-gray-300 rounded-lg bg-white px-1 py-0 flex items-center justify-center">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 shadow-2xl transform transition-all">
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScore1(Math.max(score1 - 1, 0))}
                        className="border border-gray-300 border-t-0 rounded-b-md px-2 py-0.5 hover:bg-gray-100 transition-colors"
                        disabled={score1 <= 0}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScore2(Math.max(score2 - 1, 0))}
                        className="border border-gray-300 border-t-0 rounded-b-md px-2 py-0.5 hover:bg-gray-100 transition-colors"
                        disabled={score2 <= 0}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
