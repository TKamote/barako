"use client";

import { useState, useEffect } from "react";

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
  const defaultPlayerNames = [
    "Joel",
    "David",
    "CZ",
    "Chong Han",
    "Rex",
    "Gabriel",
    "Mon",
    "VJ",
    "Aaron",
    "Adam",
    "Adrian",
    "Alan",
    "Alex",
    "Andrew",
    "Anthony",
    "Ben",
    "Brandon",
    "Brian",
    "Carl",
    "Charles",
    "Chris",
    "Daniel",
    "David",
    "Edward",
    "Eric",
    "Frank",
    "George",
    "Henry",
    "Ian",
    "Jack",
    "James",
    "Jason",
    "Jeff",
    "John",
    "Jonathan",
    "Jordan",
    "Joshua",
    "Kevin",
    "Kyle",
    "Liam",
    "Luke",
    "Mark",
    "Matthew",
    "Michael",
    "Nathan",
    "Nicholas",
    "Oliver",
    "Paul",
    "Peter",
    "Philip",
    "Richard",
    "Robert",
    "Ryan",
    "Samuel",
    "Scott",
    "Sean",
    "Steven",
    "Thomas",
    "Timothy",
    "Tyler",
    "Victor",
    "Vincent",
    "William",
    "Zachary",
    "Aaron",
    "Adam",
    "Adrian",
    "Alan",
    "Alex",
    "Andrew",
    "Anthony",
    "Ben",
    "Brandon",
    "Brian",
    "Carl",
    "Charles",
    "Chris",
    "Daniel",
    "David",
    "Edward",
    "Eric",
    "Frank",
    "George",
    "Henry",
    "Ian",
    "Jack",
    "James",
    "Jason",
    "Jeff",
    "John",
    "Jonathan",
    "Jordan",
    "Joshua",
    "Kevin",
    "Kyle",
    "Liam",
    "Luke",
    "Mark",
    "Matthew",
    "Michael",
    "Nathan",
    "Nicholas",
    "Oliver",
    "Paul",
    "Peter",
    "Philip",
    "Richard",
    "Robert",
    "Ryan",
    "Samuel",
    "Scott",
    "Sean",
    "Steven",
    "Thomas",
    "Timothy",
    "Tyler",
    "Victor",
    "Vincent",
    "William",
    "Zachary",
    "Aaron",
    "Adam",
    "Adrian",
    "Alan",
    "Alex",
    "Andrew",
    "Anthony",
    "Ben",
    "Brandon",
    "Brian",
    "Carl",
    "Charles",
    "Chris",
    "Daniel",
    "David",
    "Edward",
    "Eric",
    "Frank",
    "George",
    "Henry",
    "Ian",
    "Jack",
    "James",
    "Jason",
    "Jeff",
    "John",
    "Jonathan",
    "Jordan",
    "Joshua",
    "Kevin",
    "Kyle",
    "Liam",
    "Luke",
    "Mark",
    "Matthew",
    "Michael",
    "Nathan",
    "Nicholas",
    "Oliver",
    "Paul",
    "Peter",
    "Philip",
    "Richard",
    "Robert",
    "Ryan",
    "Samuel",
    "Scott",
    "Sean",
    "Steven",
    "Thomas",
    "Timothy",
    "Tyler",
    "Victor",
    "Vincent",
    "William",
    "Zachary",
    "Aaron",
    "Adam",
    "Adrian",
    "Alan",
    "Alex",
    "Andrew",
    "Anthony",
    "Ben",
    "Brandon",
    "Brian",
    "Carl",
    "Charles",
    "Chris",
    "Daniel",
    "David",
    "Edward",
    "Eric",
    "Frank",
    "George",
    "Henry",
    "Ian",
    "Jack",
    "James",
    "Jason",
    "Jeff",
    "John",
    "Jonathan",
    "Jordan",
    "Joshua",
    "Kevin",
    "Kyle",
    "Liam",
    "Luke",
    "Mark",
    "Matthew",
    "Michael",
    "Nathan",
    "Nicholas",
    "Oliver",
    "Paul",
    "Peter",
    "Philip",
    "Richard",
    "Robert",
    "Ryan",
    "Samuel",
    "Scott",
    "Sean",
    "Steven",
    "Thomas",
    "Timothy",
    "Tyler",
    "Victor",
    "Vincent",
    "William",
    "Zachary",
    "Aaron",
    "Adam",
    "Adrian",
    "Alan",
    "Alex",
    "Andrew",
    "Anthony",
    "Ben",
    "Brandon",
    "Brian",
    "Carl",
    "Charles",
    "Chris",
    "Daniel",
    "David",
    "Edward",
    "Eric",
    "Frank",
    "George",
    "Henry",
    "Ian",
    "Jack",
    "James",
    "Jason",
    "Jeff",
    "John",
    "Jonathan",
    "Jordan",
    "Joshua",
    "Kevin",
    "Kyle",
    "Liam",
    "Luke",
    "Mark",
    "Matthew",
    "Michael",
    "Nathan",
    "Nicholas",
    "Oliver",
    "Paul",
    "Peter",
    "Philip",
    "Richard",
    "Robert",
    "Ryan",
    "Samuel",
    "Scott",
    "Sean",
    "Steven",
    "Thomas",
    "Timothy",
    "Tyler",
    "Victor",
    "Vincent",
    "William",
    "Zachary",
    "Aaron",
    "Adam",
    "Adrian",
    "Alan",
    "Alex",
    "Andrew",
    "Anthony",
    "Ben",
    "Brandon",
    "Brian",
    "Carl",
    "Charles",
    "Chris",
    "Daniel",
    "David",
    "Edward",
    "Eric",
    "Frank",
    "George",
    "Henry",
    "Ian",
    "Jack",
    "James",
    "Jason",
    "Jeff",
    "John",
    "Jonathan",
    "Jordan",
    "Joshua",
    "Kevin",
    "Kyle",
    "Liam",
    "Luke",
    "Mark",
    "Matthew",
    "Michael",
    "Nathan",
    "Nicholas",
    "Oliver",
    "Paul",
    "Peter",
    "Philip",
    "Richard",
    "Robert",
    "Ryan",
    "Samuel",
    "Scott",
    "Sean",
    "Steven",
    "Thomas",
    "Timothy",
    "Tyler",
    "Victor",
    "Vincent",
    "William",
    "Zachary",
  ];

  // Generate player data outside of render to avoid Math.random() issues
  const generatePlayerData = (name: string, index: number): Player => ({
    id: (index + 1).toString(),
    name: name,
    email: `${name.toLowerCase().replace(/\s+/g, "")}@email.com`,
    phone: `+65 ${1000 + ((index * 123) % 9000)} ${
      1000 + ((index * 456) % 9000)
    }`,
    skillLevel: ["beginner", "intermediate", "advanced", "expert"][
      index % 4
    ] as "beginner" | "intermediate" | "advanced" | "expert",
    rating: 3.0 + (index % 20) * 0.1,
    tournamentsPlayed: index % 20,
    wins: index % 10,
    status: "active" as const,
  });

  const [players, setPlayers] = useState<Player[]>(
    defaultPlayerNames.map(generatePlayerData)
  );

  // Load persisted data on component mount
  useEffect(() => {
    const loadPersistedData = () => {
      const savedPlayers = localStorage.getItem("players-data");
      if (savedPlayers) {
        try {
          const parsedPlayers = JSON.parse(savedPlayers);
          setPlayers(parsedPlayers);
        } catch (error) {
          console.error("Error loading players data:", error);
        }
      }
    };

    loadPersistedData();
  }, []);

  // Save data whenever players change
  useEffect(() => {
    localStorage.setItem("players-data", JSON.stringify(players));
  }, [players]);

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

  const handleCreatePlayer = () => {
    // Check for duplicate name
    const duplicateName = players.find(
      (player) => player.name.toLowerCase() === newPlayer.name.toLowerCase()
    );

    if (duplicateName) {
      alert(`Player with name "${newPlayer.name}" already exists!`);
      return;
    }

    const player: Player = {
      id: Date.now().toString(),
      name: newPlayer.name,
      email: "", // Default empty email
      phone: "", // Default empty phone
      skillLevel: newPlayer.skillLevel,
      rating: newPlayer.rank,
      tournamentsPlayed: 0,
      wins: 0,
      status: "active",
    };

    setPlayers([...players, player]);
    setNewPlayer({ name: "", rank: 0, points: 0, skillLevel: "beginner" });
    setShowCreateForm(false);
  };

  const handleEditPlayer = (player: Player) => {
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

  const handleUpdatePlayer = () => {
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
    }
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
    setNewPlayer({ name: "", rank: 0, points: 0, skillLevel: "beginner" });
    setShowCreateForm(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            ➕ Add Player
          </button>
        </div>

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
                        skillLevel: e.target.value as any,
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
                      Players Name
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
                      className={`hover:bg-gray-50 cursor-pointer ${
                        i < 8 ? "bg-yellow-100" : ""
                      }`}
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
                      Players Name
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
                      Players Name
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
      </div>
    </div>
  );
};

export default PlayersPage;
