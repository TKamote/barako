"use client";

import { useState } from "react";

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
  const playerNames = [
    "Adrian",
    "AJ",
    "Aldrin",
    "Aldwin",
    "Alfie",
    "AllanC",
    "Anthony",
    "Arys",
    "Boj",
    "Brandon",
    "Clarke",
    "Dave",
    "Dennis",
    "Dunn",
    "Ebet",
    "Ed",
    "Erwin",
    "Gem",
    "Hans",
    "Hervin",
    "Huber",
    "Ivan",
    "Jarland",
    "Joemz",
    "Joelski",
    "Johner",
    "Jonas",
    "Joey",
    "JP",
    "Khristian",
    "Louie",
    "Louie S.",
    "Marlon",
    "Nikko",
    "Owen",
    "Padi",
    "Patrick",
    "Renz",
    "Reymund",
    "Richard",
    "Robbie",
    "Sherwin",
    "Shierwin",
    "Siva",
    "Ted",
    "Terrel",
    "Varan",
    "VJ",
    "Warren",
    "Topher",
    "Dennel",
    "Jerome",
    "Emerson",
    "Tom",
    "Jun",
    "Chito",
    "Player 58",
    "Player 59",
    "Player 60",
    "Player 61",
    "Player 62",
    "Player 63",
    "Player 64",
    "Player 65",
    "Player 66",
    "Player 67",
    "Player 68",
    "Player 69",
    "Player 70",
    "Player 71",
    "Player 72",
    "Player 73",
    "Player 74",
    "Player 75",
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
    playerNames.map(generatePlayerData)
  );

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    email: "",
    phone: "",
    skillLevel: "beginner" as
      | "beginner"
      | "intermediate"
      | "advanced"
      | "expert",
  });

  const handleCreatePlayer = () => {
    const player: Player = {
      id: Date.now().toString(),
      name: newPlayer.name,
      email: newPlayer.email,
      phone: newPlayer.phone,
      skillLevel: newPlayer.skillLevel,
      rating: 0,
      tournamentsPlayed: 0,
      wins: 0,
      status: "active",
    };

    setPlayers([...players, player]);
    setNewPlayer({ name: "", email: "", phone: "", skillLevel: "beginner" });
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
              <h2 className="text-xl font-bold mb-4">Add New Player</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player Name
                  </label>
                  <input
                    type="text"
                    value={newPlayer.name}
                    onChange={(e) =>
                      setNewPlayer({ ...newPlayer, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter player name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ranking Points
                  </label>
                  <input
                    type="number"
                    placeholder="Enter points"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlayer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Add Player
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
                    <tr key={player.id} className="hover:bg-gray-50">
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
                    <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Photo
                    </th>
                    <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {players.slice(25, 50).map((player, i) => (
                    <tr key={player.id} className="hover:bg-gray-50">
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
                    <tr key={player.id} className="hover:bg-gray-50">
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
