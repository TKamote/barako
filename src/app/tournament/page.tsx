"use client";

import { useState, useEffect } from "react";

interface Tournament {
  id: string;
  name: string;
  date: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: number;
  maxParticipants: number;
  prize: string;
}

const TournamentPage = () => {
  // Default tournament data
  const defaultTournaments: Tournament[] = [
    {
      id: "1",
      name: "Barako 9-Ball Championship - November 2025",
      date: "2025-11-15",
      status: "upcoming",
      participants: 0,
      maxParticipants: 32,
      prize: "$800",
    },
    {
      id: "2",
      name: "Barako 9-Ball Championship - December 2025",
      date: "2025-12-20",
      status: "upcoming",
      participants: 0,
      maxParticipants: 32,
      prize: "$800",
    },
    {
      id: "3",
      name: "Barako 9-Ball Championship - January 2026",
      date: "2026-01-17",
      status: "upcoming",
      participants: 0,
      maxParticipants: 32,
      prize: "$800",
    },
    {
      id: "4",
      name: "Barako 9-Ball Championship - February 2026",
      date: "2026-02-21",
      status: "upcoming",
      participants: 0,
      maxParticipants: 32,
      prize: "$800",
    },
    {
      id: "5",
      name: "Barako 9-Ball Championship - March 2026",
      date: "2026-03-21",
      status: "upcoming",
      participants: 0,
      maxParticipants: 32,
      prize: "$800",
    },
    {
      id: "6",
      name: "Barako 9-Ball Championship - April 2026",
      date: "2026-04-18",
      status: "upcoming",
      participants: 0,
      maxParticipants: 32,
      prize: "$800",
    },
  ];

  const [tournaments, setTournaments] =
    useState<Tournament[]>(defaultTournaments);

  // Load persisted data on component mount
  useEffect(() => {
    const loadPersistedData = () => {
      const savedTournaments = localStorage.getItem("tournaments-data");
      if (savedTournaments) {
        try {
          const parsedTournaments = JSON.parse(savedTournaments);
          setTournaments(parsedTournaments);
        } catch (error) {
          console.error("Error loading tournaments data:", error);
        }
      }
    };

    loadPersistedData();
  }, []);

  // Save data whenever tournaments change
  useEffect(() => {
    localStorage.setItem("tournaments-data", JSON.stringify(tournaments));
  }, [tournaments]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(
    null
  );
  const [newTournament, setNewTournament] = useState({
    name: "",
    date: "",
    maxParticipants: 16,
    prize: "",
  });

  const handleCreateTournament = () => {
    console.log("Creating tournament with data:", newTournament);

    const tournament: Tournament = {
      id: Date.now().toString(),
      name: newTournament.name,
      date: newTournament.date,
      status: "upcoming",
      participants: 0,
      maxParticipants: newTournament.maxParticipants,
      prize: newTournament.prize,
    };

    console.log("New tournament object:", tournament);
    setTournaments([...tournaments, tournament]);
    setNewTournament({ name: "", date: "", maxParticipants: 16, prize: "" });
    setShowCreateForm(false);
  };

  const handleEditTournament = (tournament: Tournament) => {
    console.log("Editing tournament:", tournament);
    setEditingTournament(tournament);
    setNewTournament({
      name: tournament.name,
      date: tournament.date,
      maxParticipants: tournament.maxParticipants,
      prize: tournament.prize,
    });
    setShowCreateForm(true);
  };

  const handleUpdateTournament = () => {
    if (editingTournament) {
      console.log("Updating tournament:", editingTournament.id);

      const updatedTournaments = tournaments.map((tournament) =>
        tournament.id === editingTournament.id
          ? {
              ...tournament,
              name: newTournament.name,
              date: newTournament.date,
              maxParticipants: newTournament.maxParticipants,
              prize: newTournament.prize,
            }
          : tournament
      );

      setTournaments(updatedTournaments);
      setEditingTournament(null);
      setNewTournament({ name: "", date: "", maxParticipants: 16, prize: "" });
      setShowCreateForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTournament(null);
    setNewTournament({ name: "", date: "", maxParticipants: 16, prize: "" });
    setShowCreateForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              🏆 Manage your billiards tournaments
            </h1>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors w-full sm:w-auto"
          >
            ➕ Create Tournament
          </button>
        </div>

        {/* Create Tournament Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingTournament
                  ? "Edit Tournament"
                  : "Create New Tournament"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tournament Name
                  </label>
                  <input
                    type="text"
                    value={newTournament.name}
                    onChange={(e) => {
                      console.log("Name changing to:", e.target.value);
                      setNewTournament({
                        ...newTournament,
                        name: e.target.value,
                      });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter tournament name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newTournament.date}
                    onChange={(e) =>
                      setNewTournament({
                        ...newTournament,
                        date: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    value={newTournament.maxParticipants}
                    onChange={(e) =>
                      setNewTournament({
                        ...newTournament,
                        maxParticipants: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    min="2"
                    max="64"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prize
                  </label>
                  <input
                    type="text"
                    value={newTournament.prize}
                    onChange={(e) =>
                      setNewTournament({
                        ...newTournament,
                        prize: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="e.g., $500"
                  />
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
                    editingTournament
                      ? handleUpdateTournament
                      : handleCreateTournament
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingTournament
                    ? "Update Tournament"
                    : "Create Tournament"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">
                    Barako 9-Ball Championship
                  </h3>
                  <p className="text-base sm:text-xl text-blue-600 font-medium">
                    {tournament.name.replace(
                      "Barako 9-Ball Championship - ",
                      ""
                    )}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    tournament.status
                  )}`}
                >
                  {tournament.status.charAt(0).toUpperCase() +
                    tournament.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📅</span>
                  <span>{new Date(tournament.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <span className="mr-2">👥</span>
                  <span>
                    {tournament.participants}/{tournament.maxParticipants}{" "}
                    participants
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <span className="mr-2">🏆</span>
                  <span>Prize: {tournament.prize}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                  <div className="text-sm text-gray-500">
                    {tournament.status === "ongoing" && (
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span>
                        In Progress
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEditTournament(tournament)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium py-2 px-3 rounded hover:bg-blue-50 transition-colors w-full sm:w-auto"
                  >
                    Edit Tournament
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tournaments yet
            </h3>
            <p className="text-gray-600">
              Create your first tournament to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentPage;
