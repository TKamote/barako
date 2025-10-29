"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Player {
  id: string;
  name: string;
  points: number;
  photoURL?: string;
  skillLevel: string;
}

interface Match {
  id: string;
  tournamentId: string;
  round: string;
  bracket: "WB" | "LB"; // Winners Bracket or Losers Bracket
  matchNumber: number;
  player1Id: string;
  player2Id: string;
  player1Name: string;
  player2Name: string;
  score1: number;
  score2: number;
  winnerId: string | null;
  status: "upcoming" | "ongoing" | "completed";
  isBye: boolean;
}

interface Tournament {
  id: string;
  name: string;
  date: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: number;
  maxParticipants: number;
  prize: string;
}

const MatchesPage = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  // Load tournaments and players on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load tournaments
        const tournamentsCollection = collection(db, "tournaments");
        const tournamentsSnapshot = await getDocs(tournamentsCollection);
        const tournamentsList = tournamentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tournament[];
        setTournaments(tournamentsList);

        // Load players
        const playersCollection = collection(db, "players");
        const playersSnapshot = await getDocs(playersCollection);
        const playersList = playersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Player[];
        setPlayers(playersList);

        // Load matches
        const matchesCollection = collection(db, "matches");
        const matchesSnapshot = await getDocs(matchesCollection);
        const matchesList = matchesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Match[];
        setMatches(matchesList);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Generate bracket structure for 16 players double elimination
  const generateBracket = (tournamentId: string, playerIds: string[]) => {
    const newMatches: Match[] = [];
    let matchId = 1;

    // Winners Bracket - Round 1 (16 players -> 8 matches)
    for (let i = 0; i < 8; i++) {
      const player1Id = playerIds[i * 2] || "";
      const player2Id = playerIds[i * 2 + 1] || "";
      const player1Name =
        players.find((p) => p.id === player1Id)?.name || `Player ${i * 2 + 1}`;
      const player2Name =
        players.find((p) => p.id === player2Id)?.name || `Player ${i * 2 + 2}`;

      newMatches.push({
        id: `wb-r1-m${matchId}`,
        tournamentId,
        round: "R1",
        bracket: "WB",
        matchNumber: matchId++,
        player1Id,
        player2Id,
        player1Name,
        player2Name,
        score1: 0,
        score2: 0,
        winnerId: null,
        status: "upcoming",
        isBye: !player1Id || !player2Id,
      });
    }

    // Winners Bracket - Round 2 (8 players -> 4 matches)
    for (let i = 0; i < 4; i++) {
      newMatches.push({
        id: `wb-r2-m${matchId}`,
        tournamentId,
        round: "R2",
        bracket: "WB",
        matchNumber: matchId++,
        player1Id: "",
        player2Id: "",
        player1Name: "TBD",
        player2Name: "TBD",
        score1: 0,
        score2: 0,
        winnerId: null,
        status: "upcoming",
        isBye: false,
      });
    }

    // Winners Bracket - Quarterfinals (4 players -> 2 matches)
    for (let i = 0; i < 2; i++) {
      newMatches.push({
        id: `wb-qf-m${matchId}`,
        tournamentId,
        round: "QF",
        bracket: "WB",
        matchNumber: matchId++,
        player1Id: "",
        player2Id: "",
        player1Name: "TBD",
        player2Name: "TBD",
        score1: 0,
        score2: 0,
        winnerId: null,
        status: "upcoming",
        isBye: false,
      });
    }

    // Winners Bracket - Semifinals (2 players -> 1 match)
    newMatches.push({
      id: `wb-sf-m${matchId}`,
      tournamentId,
      round: "SF",
      bracket: "WB",
      matchNumber: matchId++,
      player1Id: "",
      player2Id: "",
      player1Name: "TBD",
      player2Name: "TBD",
      score1: 0,
      score2: 0,
      winnerId: null,
      status: "upcoming",
      isBye: false,
    });

    // Winners Bracket - Finals (1 match)
    newMatches.push({
      id: `wb-f-m${matchId}`,
      tournamentId,
      round: "F",
      bracket: "WB",
      matchNumber: matchId++,
      player1Id: "",
      player2Id: "",
      player1Name: "TBD",
      player2Name: "TBD",
      score1: 0,
      score2: 0,
      winnerId: null,
      status: "upcoming",
      isBye: false,
    });

    // Losers Bracket - Round 1 (8 losers from WB R1 -> 4 matches)
    for (let i = 0; i < 4; i++) {
      newMatches.push({
        id: `lb-r1-m${matchId}`,
        tournamentId,
        round: "R1",
        bracket: "LB",
        matchNumber: matchId++,
        player1Id: "",
        player2Id: "",
        player1Name: "TBD",
        player2Name: "TBD",
        score1: 0,
        score2: 0,
        winnerId: null,
        status: "upcoming",
        isBye: false,
      });
    }

    // Losers Bracket - Round 2 (4 players -> 2 matches)
    for (let i = 0; i < 2; i++) {
      newMatches.push({
        id: `lb-r2-m${matchId}`,
        tournamentId,
        round: "R2",
        bracket: "LB",
        matchNumber: matchId++,
        player1Id: "",
        player2Id: "",
        player1Name: "TBD",
        player2Name: "TBD",
        score1: 0,
        score2: 0,
        winnerId: null,
        status: "upcoming",
        isBye: false,
      });
    }

    // Losers Bracket - Round 3 (2 players -> 1 match)
    newMatches.push({
      id: `lb-r3-m${matchId}`,
      tournamentId,
      round: "R3",
      bracket: "LB",
      matchNumber: matchId++,
      player1Id: "",
      player2Id: "",
      player1Name: "TBD",
      player2Name: "TBD",
      score1: 0,
      score2: 0,
      winnerId: null,
      status: "upcoming",
      isBye: false,
    });

    // Grand Finals (WB Winner vs LB Winner)
    newMatches.push({
      id: `gf-m${matchId}`,
      tournamentId,
      round: "GF",
      bracket: "WB", // Grand Finals is technically WB
      matchNumber: matchId++,
      player1Id: "",
      player2Id: "",
      player1Name: "TBD",
      player2Name: "TBD",
      score1: 0,
      score2: 0,
      winnerId: null,
      status: "upcoming",
      isBye: false,
    });

    return newMatches;
  };

  const handleCreateBracket = async (tournament: Tournament) => {
    if (players.length < 16) {
      alert("Need at least 16 players to create a bracket");
      return;
    }

    // Get top 16 players by points
    const topPlayers = players
      .sort((a, b) => b.points - a.points)
      .slice(0, 16)
      .map((p) => p.id);

    const newMatches = generateBracket(tournament.id, topPlayers);

    try {
      // Add matches to Firestore
      for (const match of newMatches) {
        await addDoc(collection(db, "matches"), match);
      }

      // Update local state
      setMatches([...matches, ...newMatches]);
      setSelectedTournament(tournament);
    } catch (error) {
      console.error("Error creating bracket:", error);
    }
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-yellow-100 border-yellow-300";
      case "completed":
        return "bg-green-100 border-green-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const getBracketMatches = (bracket: "WB" | "LB") => {
    if (!selectedTournament) return [];
    return matches.filter(
      (m) => m.tournamentId === selectedTournament.id && m.bracket === bracket
    );
  };

  const getRoundMatches = (bracket: "WB" | "LB", round: string) => {
    return getBracketMatches(bracket).filter((m) => m.round === round);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h3 className="text-lg font-medium text-gray-900">
            Loading matches...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tournament Matches
          </h1>

          {/* Tournament Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tournament
            </label>
            <select
              value={selectedTournament?.id || ""}
              onChange={(e) => {
                const tournament = tournaments.find(
                  (t) => t.id === e.target.value
                );
                setSelectedTournament(tournament || null);
              }}
              className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a tournament...</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </option>
              ))}
            </select>
          </div>

          {/* Create Bracket Button */}
          {selectedTournament && (
            <button
              onClick={() => handleCreateBracket(selectedTournament)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Create 16-Player Double Elimination Bracket
            </button>
          )}
        </div>

        {selectedTournament && (
          <div className="space-y-8">
            {/* Winners Bracket */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold mr-3">
                  WB
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Winners Bracket
                </h2>
              </div>

              <div className="overflow-x-auto">
                <div className="flex space-x-8 min-w-max">
                  {/* Round 1 */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      R1
                    </div>
                    {getRoundMatches("WB", "R1").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Round 2 */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      R2
                    </div>
                    {getRoundMatches("WB", "R2").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quarterfinals */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      QF
                    </div>
                    {getRoundMatches("WB", "QF").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Semifinals */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      SF
                    </div>
                    {getRoundMatches("WB", "SF").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Finals */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      F
                    </div>
                    {getRoundMatches("WB", "F").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Losers Bracket */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold mr-3">
                  LB
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Losers Bracket
                </h2>
              </div>

              <div className="overflow-x-auto">
                <div className="flex space-x-8 min-w-max">
                  {/* Losers Round 1 */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      R1
                    </div>
                    {getRoundMatches("LB", "R1").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Losers Round 2 */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      R2
                    </div>
                    {getRoundMatches("LB", "R2").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Losers Round 3 */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center font-bold text-sm text-gray-600 mb-2">
                      R3
                    </div>
                    {getRoundMatches("LB", "R3").map((match) => (
                      <div
                        key={match.id}
                        className={`w-48 p-3 border-2 rounded-lg ${getMatchStatusColor(
                          match.status
                        )}`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-2">
                          Match {match.matchNumber}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player1Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score1}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {match.player2Name}
                            </span>
                            <span className="text-sm font-bold">
                              {match.score2}
                            </span>
                          </div>
                        </div>
                        {match.winnerId && (
                          <div className="mt-2 text-center">
                            <span className="text-xs font-bold text-green-600">
                              W
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grand Finals */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 text-white px-3 py-1 rounded-lg font-bold mr-3">
                  GF
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Grand Finals
                </h2>
              </div>

              <div className="flex justify-center">
                <div className="w-64">
                  {getRoundMatches("WB", "GF").map((match) => (
                    <div
                      key={match.id}
                      className={`w-full p-4 border-2 rounded-lg ${getMatchStatusColor(
                        match.status
                      )}`}
                    >
                      <div className="text-center font-bold text-sm text-gray-500 mb-3">
                        Grand Finals
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium">
                            {match.player1Name}
                          </span>
                          <span className="text-lg font-bold">
                            {match.score1}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium">
                            {match.player2Name}
                          </span>
                          <span className="text-lg font-bold">
                            {match.score2}
                          </span>
                        </div>
                      </div>
                      {match.winnerId && (
                        <div className="mt-3 text-center">
                          <span className="text-sm font-bold text-green-600">
                            CHAMPION
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
