"use client";

const MatchesPage = () => {
  // Tournament state - can be managed by tournament manager
  const totalPlayers = 10; // Example: 8, 9, or 10 players
  const qualifyingMatches = totalPlayers > 8 ? totalPlayers - 8 : 0;

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
  return (
    <div className="p-3 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tournament Matches
          </h1>
        </div>

        {/* Main Container: Column Layout */}
        <div className="flex flex-col space-y-4">
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
              <div className="flex space-x-4 min-w-max pb-2 items-center min-h-[400px]">
                {/* Column 1: Qualifying matches (dynamic) */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    {matchNumbers.qualifying.length > 0 ? (
                      matchNumbers.qualifying.map((matchId, index) => (
                        <div
                          key={index}
                          className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                          onClick={() => {
                            console.log(`${matchId} clicked`);
                          }}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-200">
                              <div className="text-sm text-gray-500">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) */}
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                              <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                                Player {index * 2 + 7}
                              </div>
                              <div className="text-base text-gray-400 text-center pt-1">
                                Player {index * 2 + 8}
                              </div>
                            </div>

                            {/* Column 3: Scores (2x1) */}
                            <div className="flex flex-col justify-center space-y-0">
                              <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                                0
                              </div>
                              <div className="text-base font-bold text-gray-600 text-center pt-1">
                                0
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 text-sm">
                        No qualifying matches
                      </div>
                    )}
                  </div>
                </div>

                {/* Column 2: 4 matches */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Round 1
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    {matchNumbers.round1.map((matchId, index) => {
                      const needsQualifying =
                        qualifyingMatches > 0 && (index === 0 || index === 3);
                      return (
                        <div
                          key={index}
                          className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                          onClick={() => {
                            console.log(`${matchId} clicked`);
                          }}
                        >
                          <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                            {/* Column 1: Match Number (1x1) */}
                            <div className="flex items-center justify-center border-r border-gray-200">
                              <div className="text-sm text-gray-500">
                                {matchId}
                              </div>
                            </div>

                            {/* Column 2: Player Names (2x1) */}
                            <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                              <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                                Player {index + 1}
                              </div>
                              <div className="text-base text-gray-400 text-center pt-1">
                                {needsQualifying
                                  ? "TBD"
                                  : `Player ${index + 2}`}
                              </div>
                            </div>

                            {/* Column 3: Scores (2x1) */}
                            <div className="flex flex-col justify-center space-y-0">
                              <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                                0
                              </div>
                              <div className="text-base font-bold text-gray-600 text-center pt-1">
                                {needsQualifying ? "-" : "0"}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: 2 matches */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Round 2
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    {matchNumbers.round2.map((matchId, index) => (
                      <div
                        key={index}
                        className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                        onClick={() => {
                          console.log(`${matchId} clicked`);
                        }}
                      >
                        <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                          {/* Column 1: Match Number (1x1) */}
                          <div className="flex items-center justify-center border-r border-gray-200">
                            <div className="text-sm text-gray-500">
                              {matchId}
                            </div>
                          </div>

                          {/* Column 2: Player Names (2x1) */}
                          <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                            <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                              TBD
                            </div>
                            <div className="text-base text-gray-400 text-center pt-1">
                              TBD
                            </div>
                          </div>

                          {/* Column 3: Scores (2x1) */}
                          <div className="flex flex-col justify-center space-y-0">
                            <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                              -
                            </div>
                            <div className="text-base font-bold text-gray-600 text-center pt-1">
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 4: 1 match */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Round 3
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    <div
                      className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                      onClick={() => {
                        console.log("Match clicked");
                      }}
                    >
                      <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                        {/* Column 1: Match Number (1x1) */}
                        <div className="flex items-center justify-center border-r border-gray-200">
                          <div className="text-sm text-gray-500">
                            {matchNumbers.round3[0]}
                          </div>
                        </div>

                        {/* Column 2: Player Names (2x1) */}
                        <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                          <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                            TBD
                          </div>
                          <div className="text-base text-gray-400 text-center pt-1">
                            TBD
                          </div>
                        </div>

                        {/* Column 3: Scores (2x1) */}
                        <div className="flex flex-col justify-center space-y-0">
                          <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                            -
                          </div>
                          <div className="text-base font-bold text-gray-600 text-center pt-1">
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Winner Rectangle */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Winner
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    <div className="w-40 h-12 border-2 border-gray-300 rounded-lg bg-white px-2 py-px flex items-center justify-center">
                      <div className="text-base font-bold text-gray-500 text-center">
                        Group A WB Winner
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-300 my-3"></div>

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
              <div className="flex space-x-4 min-w-max pb-2 items-center min-h-[400px]">
                {/* Losers (Qualifying) - 1 match */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Losers
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    <div className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all">
                      <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                        {/* Column 1: Match Number */}
                        <div className="flex items-center justify-center border-r border-gray-200">
                          <div className="text-sm text-gray-500">
                            M{qualifyingMatches + 4 + 2 + 1 + 1}
                          </div>
                        </div>
                        {/* Column 2: Player Names */}
                        <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                          <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                            TBD
                          </div>
                          <div className="text-base text-gray-400 text-center pt-1">
                            TBD
                          </div>
                        </div>
                        {/* Column 3: Scores */}
                        <div className="flex flex-col justify-center space-y-0">
                          <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                            -
                          </div>
                          <div className="text-base font-bold text-gray-600 text-center pt-1">
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Losers R1 - 3 matches */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Losers R1
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                      >
                        <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                          {/* Column 1: Match Number */}
                          <div className="flex items-center justify-center border-r border-gray-200">
                            <div className="text-sm text-gray-500">
                              M{qualifyingMatches + 4 + 2 + 1 + 1 + 1 + index}
                            </div>
                          </div>
                          {/* Column 2: Player Names */}
                          <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                            <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                              TBD
                            </div>
                            <div className="text-base text-gray-400 text-center pt-1">
                              TBD
                            </div>
                          </div>
                          {/* Column 3: Scores */}
                          <div className="flex flex-col justify-center space-y-0">
                            <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                              -
                            </div>
                            <div className="text-base font-bold text-gray-600 text-center pt-1">
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Losers R2 - 2 matches */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Losers R2
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                      >
                        <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                          {/* Column 1: Match Number */}
                          <div className="flex items-center justify-center border-r border-gray-200">
                            <div className="text-sm text-gray-500">
                              M
                              {qualifyingMatches +
                                4 +
                                2 +
                                1 +
                                1 +
                                1 +
                                3 +
                                index}
                            </div>
                          </div>
                          {/* Column 2: Player Names */}
                          <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                            <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                              TBD
                            </div>
                            <div className="text-base text-gray-400 text-center pt-1">
                              TBD
                            </div>
                          </div>
                          {/* Column 3: Scores */}
                          <div className="flex flex-col justify-center space-y-0">
                            <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                              -
                            </div>
                            <div className="text-base font-bold text-gray-600 text-center pt-1">
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Losers R3 - 1 match */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Losers R3
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    <div className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all">
                      <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                        {/* Column 1: Match Number */}
                        <div className="flex items-center justify-center border-r border-gray-200">
                          <div className="text-sm text-gray-500">
                            M{qualifyingMatches + 4 + 2 + 1 + 1 + 1 + 3 + 2}
                          </div>
                        </div>
                        {/* Column 2: Player Names */}
                        <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                          <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                            TBD
                          </div>
                          <div className="text-base text-gray-400 text-center pt-1">
                            TBD
                          </div>
                        </div>
                        {/* Column 3: Scores */}
                        <div className="flex flex-col justify-center space-y-0">
                          <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                            -
                          </div>
                          <div className="text-base font-bold text-gray-600 text-center pt-1">
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Losers R4 - 1 match */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Losers R4
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    <div className="w-40 h-16 border-2 border-gray-300 rounded-lg bg-white px-2 py-px cursor-pointer hover:border-red-500 hover:shadow-md transition-all">
                      <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 h-full">
                        {/* Column 1: Match Number */}
                        <div className="flex items-center justify-center border-r border-gray-200">
                          <div className="text-sm text-gray-500">
                            M{qualifyingMatches + 4 + 2 + 1 + 1 + 1 + 3 + 2 + 1}
                          </div>
                        </div>
                        {/* Column 2: Player Names */}
                        <div className="flex flex-col justify-center space-y-0 border-r border-gray-200">
                          <div className="text-base text-gray-400 text-center border-b border-gray-200 pb-1">
                            TBD
                          </div>
                          <div className="text-base text-gray-400 text-center pt-1">
                            TBD
                          </div>
                        </div>
                        {/* Column 3: Scores */}
                        <div className="flex flex-col justify-center space-y-0">
                          <div className="text-base font-bold text-gray-600 text-center border-b border-gray-200 pb-1">
                            -
                          </div>
                          <div className="text-base font-bold text-gray-600 text-center pt-1">
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loser Bracket Winner */}
                <div className="flex flex-col min-h-[300px]">
                  <div className="text-center font-bold text-xs text-gray-600 mb-2">
                    Winner
                  </div>
                  <div className="flex flex-col space-y-2 items-center justify-center flex-1">
                    <div className="w-40 h-12 border-2 border-gray-300 rounded-lg bg-white px-2 py-px flex items-center justify-center">
                      <div className="text-base font-bold text-gray-500 text-center">
                        Group A LB Winner
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
