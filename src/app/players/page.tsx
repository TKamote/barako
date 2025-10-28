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
import { useAuth } from "@/contexts/AuthContext";

interface Player {
  id: string;
  name: string;
  email: string;
  phone: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | "expert";
  rating: number;
  tournamentsPlayed: number;
  wins: number;
  status: "active" | "inactive";
}

const PlayersPage = () => {
  const { isManager } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Load players from Firestore on component mount
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        const playersCollection = collection(db, "players");
        const playersSnapshot = await getDocs(playersCollection);
        const playersList = playersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Player[];
        setPlayers(playersList);
      } catch (error) {
        console.error("Error loading players:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    rank: 0,
    points: 0,
    skillLevel: "beginner" as
      | "beginner"
      | "intermediate"
      | "advanced"
      | "expert",
  });

  const handleCreatePlayer = async () => {
    // Check for duplicate name
    const duplicateName = players.find(
      (player) => player.name.toLowerCase() === newPlayer.name.toLowerCase()
    );

    if (duplicateName) {
      alert(`Player with name "${newPlayer.name}" already exists!`);
      return;
    }

    try {
      setLoading(true);
      const playerData = {
        name: newPlayer.name,
        email: "", // Default empty email
        phone: "", // Default empty phone
        skillLevel: newPlayer.skillLevel,
        rating: newPlayer.rank,
        tournamentsPlayed: 0,
        wins: 0,
        status: "active",
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "players"), playerData);

      // Update local state with new player including Firestore ID
      const newPlayerWithId: Player = {
        id: docRef.id,
        ...playerData,
        status: "active" as const,
      };

      setPlayers([...players, newPlayerWithId]);
      setNewPlayer({ name: "", rank: 0, points: 0, skillLevel: "beginner" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating player:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(
        `Failed to create player: ${errorMessage}\n\nCheck the console for more details.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlayer = (player: Player) => {
    if (!isManager) {
      setShowLoginPrompt(true);
      return;
    }
    console.log("Editing player:", player);
    setEditingPlayer(player);
    setNewPlayer({
      name: player.name,
      rank: player.rating,
      points: 100 + parseInt(player.id) * 10, // Calculate points based on ID
      skillLevel: player.skillLevel,
    });
    setShowCreateForm(true);
  };

  const handleUpdatePlayer = async () => {
    if (editingPlayer) {
      // Check for duplicate name (excluding the current player being edited)
      const duplicateName = players.find(
        (player) =>
          player.name.toLowerCase() === newPlayer.name.toLowerCase() &&
          player.id !== editingPlayer.id
      );

      if (duplicateName) {
        alert(`Player with name "${newPlayer.name}" already exists!`);
        return;
      }

      try {
        setLoading(true);

        // Update in Firestore
        const playerRef = doc(db, "players", editingPlayer.id);
        await updateDoc(playerRef, {
          name: newPlayer.name,
          rating: newPlayer.rank,
          skillLevel: newPlayer.skillLevel,
        });

        // Update local state
        const updatedPlayers = players.map((player) =>
          player.id === editingPlayer.id
            ? {
                ...player,
                name: newPlayer.name,
                rating: newPlayer.rank,
                skillLevel: newPlayer.skillLevel,
              }
            : player
        );

        setPlayers(updatedPlayers);
        setEditingPlayer(null);
        setNewPlayer({ name: "", rank: 0, points: 0, skillLevel: "beginner" });
        setShowCreateForm(false);
      } catch (error) {
        console.error("Error updating player:", error);
        alert("Failed to update player. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
    setNewPlayer({ name: "", rank: 0, points: 0, skillLevel: "beginner" });
    setShowCreateForm(false);
  };

  const handleAddPlayerClick = () => {
    if (!isManager) {
      setShowLoginPrompt(true);
      return;
    }
    setShowCreateForm(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleAddPlayerClick}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
          >
            ➕ Add Player
          </button>
        </div>

        {loading && players.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading players...</p>
          </div>
        )}

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  Manager Login Required
                </h2>
                <p className="text-gray-600 mb-6">
                  Only logged-in managers can add or edit players. Please login
                  to continue.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setShowLoginPrompt(false);
                      window.location.href = "/tournament"; // Redirect to tournament page where login button is
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Player Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingPlayer ? "Edit Player" : "Add New Player"}
              </h2>
              <div className="text-xs text-gray-500 mb-2">
                Debug: {JSON.stringify(newPlayer)}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player Name
                  </label>
                  <input
                    type="text"
                    value={newPlayer.name}
                    onChange={(e) => {
                      console.log("Name changing to:", e.target.value);
                      setNewPlayer({ ...newPlayer, name: e.target.value });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter player name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rank
                  </label>
                  <input
                    type="number"
                    value={newPlayer.rank}
                    onChange={(e) => {
                      setNewPlayer({
                        ...newPlayer,
                        rank: parseInt(e.target.value) || 0,
                      });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter rank"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points
                  </label>
                  <input
                    type="number"
                    value={newPlayer.points}
                    onChange={(e) => {
                      setNewPlayer({
                        ...newPlayer,
                        points: parseInt(e.target.value) || 0,
                      });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter points"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Level
                  </label>
                  <select
                    value={newPlayer.skillLevel}
                    onChange={(e) =>
                      setNewPlayer({
                        ...newPlayer,
                        skillLevel: e.target.value as
                          | "beginner"
                          | "intermediate"
                          | "advanced"
                          | "expert",
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    editingPlayer ? handleUpdatePlayer : handleCreatePlayer
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingPlayer ? "Update Player" : "Add Player"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Players Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Players 1-32 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Players 1-25
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16">
                      Rank
                    </th>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16">
                      Photo
                    </th>
                    <th className="px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Players
                    </th>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {players.slice(0, 25).map((player, i) => (
                    <tr
                      key={player.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleEditPlayer(player)}
                    >
                      <td className="px-2 py-2 text-center text-lg font-medium text-gray-900 w-16">
                        #{i + 1}
                      </td>
                      <td className="px-2 py-2 text-center w-16">
                        <div className="w-6 h-6 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-sm mx-auto">
                          👤
                        </div>
                      </td>
                      <td className="px-3 py-2 text-lg text-gray-900">
                        {player.name}
                      </td>
                      <td className="px-2 py-2 text-center text-lg text-gray-900 w-20">
                        {100 + (i + 1) * 10}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Middle Column - Players 26-50 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Players 26-50
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16">
                      Rank
                    </th>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16">
                      Photo
                    </th>
                    <th className="px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Players
                    </th>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {players.slice(25, 50).map((player, i) => (
                    <tr
                      key={player.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleEditPlayer(player)}
                    >
                      <td className="px-2 py-2 text-center text-lg font-medium text-gray-900 w-16">
                        #{i + 26}
                      </td>
                      <td className="px-2 py-2 text-center w-16">
                        <div className="w-6 h-6 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-sm mx-auto">
                          👤
                        </div>
                      </td>
                      <td className="px-3 py-2 text-lg text-gray-900">
                        {player.name}
                      </td>
                      <td className="px-2 py-2 text-center text-lg text-gray-900 w-20">
                        {100 + (i + 26) * 10}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Players 51-75 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Players 51-75
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16">
                      Rank
                    </th>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16">
                      Photo
                    </th>
                    <th className="px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Players
                    </th>
                    <th className="px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {players.slice(50, 75).map((player, i) => (
                    <tr
                      key={player.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleEditPlayer(player)}
                    >
                      <td className="px-2 py-2 text-center text-lg font-medium text-gray-900 w-16">
                        #{i + 51}
                      </td>
                      <td className="px-2 py-2 text-center w-16">
                        <div className="w-6 h-6 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-sm mx-auto">
                          👤
                        </div>
                      </td>
                      <td className="px-3 py-2 text-lg text-gray-900">
                        {player.name}
                      </td>
                      <td className="px-2 py-2 text-center text-lg text-gray-900 w-20">
                        {100 + (i + 51) * 10}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {!loading && players.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No players yet
            </h3>
            <p className="text-gray-600">
              Click &quot;Add Player&quot; to create your first player
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
