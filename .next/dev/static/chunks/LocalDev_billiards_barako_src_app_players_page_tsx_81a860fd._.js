(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/LocalDev/billiards/barako/src/app/players/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const PlayersPage = ()=>{
    _s();
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
        "Zachary"
    ];
    // Generate player data outside of render to avoid Math.random() issues
    const generatePlayerData = (name, index)=>({
            id: (index + 1).toString(),
            name: name,
            email: `${name.toLowerCase().replace(/\s+/g, "")}@email.com`,
            phone: `+65 ${1000 + index * 123 % 9000} ${1000 + index * 456 % 9000}`,
            skillLevel: [
                "beginner",
                "intermediate",
                "advanced",
                "expert"
            ][index % 4],
            rating: 3.0 + index % 20 * 0.1,
            tournamentsPlayed: index % 20,
            wins: index % 10,
            status: "active"
        });
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultPlayerNames.map(generatePlayerData));
    // Load persisted data on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayersPage.useEffect": ()=>{
            const loadPersistedData = {
                "PlayersPage.useEffect.loadPersistedData": ()=>{
                    const savedPlayers = localStorage.getItem("players-data");
                    if (savedPlayers) {
                        try {
                            const parsedPlayers = JSON.parse(savedPlayers);
                            setPlayers(parsedPlayers);
                        } catch (error) {
                            console.error("Error loading players data:", error);
                        }
                    }
                }
            }["PlayersPage.useEffect.loadPersistedData"];
            loadPersistedData();
        }
    }["PlayersPage.useEffect"], []);
    // Save data whenever players change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayersPage.useEffect": ()=>{
            localStorage.setItem("players-data", JSON.stringify(players));
        }
    }["PlayersPage.useEffect"], [
        players
    ]);
    const [showCreateForm, setShowCreateForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPlayer, setEditingPlayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newPlayer, setNewPlayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        rank: 0,
        points: 0,
        skillLevel: "beginner"
    });
    const handleCreatePlayer = ()=>{
        // Check for duplicate name
        const duplicateName = players.find((player)=>player.name.toLowerCase() === newPlayer.name.toLowerCase());
        if (duplicateName) {
            alert(`Player with name "${newPlayer.name}" already exists!`);
            return;
        }
        const player = {
            id: Date.now().toString(),
            name: newPlayer.name,
            email: "",
            phone: "",
            skillLevel: newPlayer.skillLevel,
            rating: newPlayer.rank,
            tournamentsPlayed: 0,
            wins: 0,
            status: "active"
        };
        setPlayers([
            ...players,
            player
        ]);
        setNewPlayer({
            name: "",
            rank: 0,
            points: 0,
            skillLevel: "beginner"
        });
        setShowCreateForm(false);
    };
    const handleEditPlayer = (player)=>{
        console.log("Editing player:", player);
        setEditingPlayer(player);
        setNewPlayer({
            name: player.name,
            rank: player.rating,
            points: 100 + parseInt(player.id) * 10,
            skillLevel: player.skillLevel
        });
        setShowCreateForm(true);
    };
    const handleUpdatePlayer = ()=>{
        if (editingPlayer) {
            // Check for duplicate name (excluding the current player being edited)
            const duplicateName = players.find((player)=>player.name.toLowerCase() === newPlayer.name.toLowerCase() && player.id !== editingPlayer.id);
            if (duplicateName) {
                alert(`Player with name "${newPlayer.name}" already exists!`);
                return;
            }
            const updatedPlayers = players.map((player)=>player.id === editingPlayer.id ? {
                    ...player,
                    name: newPlayer.name,
                    rating: newPlayer.rank,
                    skillLevel: newPlayer.skillLevel
                } : player);
            setPlayers(updatedPlayers);
            setEditingPlayer(null);
            setNewPlayer({
                name: "",
                rank: 0,
                points: 0,
                skillLevel: "beginner"
            });
            setShowCreateForm(false);
        }
    };
    const handleCancelEdit = ()=>{
        setEditingPlayer(null);
        setNewPlayer({
            name: "",
            rank: 0,
            points: 0,
            skillLevel: "beginner"
        });
        setShowCreateForm(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 bg-gray-50 min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end items-center mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowCreateForm(true),
                        className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors",
                        children: "➕ Add Player"
                    }, void 0, false, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 501,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                showCreateForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg p-6 w-full max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold mb-4",
                                children: editingPlayer ? "Edit Player" : "Add New Player"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 514,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-2",
                                children: [
                                    "Debug: ",
                                    JSON.stringify(newPlayer)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 517,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Player Photo"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 522,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                accept: "image/*",
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 525,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 521,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Player Name"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newPlayer.name,
                                                onChange: (e)=>{
                                                    console.log("Name changing to:", e.target.value);
                                                    setNewPlayer({
                                                        ...newPlayer,
                                                        name: e.target.value
                                                    });
                                                },
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                                placeholder: "Enter player name"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Rank"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 547,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: newPlayer.rank,
                                                onChange: (e)=>{
                                                    setNewPlayer({
                                                        ...newPlayer,
                                                        rank: parseInt(e.target.value) || 0
                                                    });
                                                },
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                                placeholder: "Enter rank"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 550,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 546,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Points"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 564,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: newPlayer.points,
                                                onChange: (e)=>{
                                                    setNewPlayer({
                                                        ...newPlayer,
                                                        points: parseInt(e.target.value) || 0
                                                    });
                                                },
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                                placeholder: "Enter points"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 567,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 563,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Skill Level"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 581,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newPlayer.skillLevel,
                                                onChange: (e)=>setNewPlayer({
                                                        ...newPlayer,
                                                        skillLevel: e.target.value
                                                    }),
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "beginner",
                                                        children: "Beginner"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "intermediate",
                                                        children: "Intermediate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "advanced",
                                                        children: "Advanced"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "expert",
                                                        children: "Expert"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 584,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 580,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 520,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end space-x-3 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCancelEdit,
                                        className: "px-4 py-2 text-gray-600 hover:text-gray-800",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 602,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: editingPlayer ? handleUpdatePlayer : handleCreatePlayer,
                                        className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg",
                                        children: editingPlayer ? "Update Player" : "Add Player"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 608,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 601,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                        lineNumber: 513,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 512,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-lg overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 px-4 py-3 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Players 1-25"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 625,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Rank"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 634,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 637,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Players Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20",
                                                            children: "Points"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 643,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 632,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "bg-white divide-y divide-gray-200",
                                                children: players.slice(0, 25).map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: `hover:bg-gray-50 cursor-pointer ${i < 8 ? "bg-yellow-100" : ""}`,
                                                        onClick: ()=>handleEditPlayer(player),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg font-medium text-gray-900 w-16",
                                                                children: [
                                                                    "#",
                                                                    i + 1
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center w-16",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-sm mx-auto",
                                                                    children: "👤"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 661,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 660,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-lg text-gray-900",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg text-gray-900 w-20",
                                                                children: 100 + (i + 1) * 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 668,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, player.id, true, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 648,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 630,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 624,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-lg overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 px-4 py-3 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Players 26-50"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 681,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 680,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Rank"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 689,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 692,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Players Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 695,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20",
                                                            children: "Points"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 698,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 687,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "bg-white divide-y divide-gray-200",
                                                children: players.slice(25, 50).map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-gray-50 cursor-pointer",
                                                        onClick: ()=>handleEditPlayer(player),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg font-medium text-gray-900 w-16",
                                                                children: [
                                                                    "#",
                                                                    i + 26
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 710,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center w-16",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-sm mx-auto",
                                                                    children: "👤"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 714,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 713,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-lg text-gray-900",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 718,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg text-gray-900 w-20",
                                                                children: 100 + (i + 26) * 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 721,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, player.id, true, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 705,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 703,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 686,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 685,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 679,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-lg overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 px-4 py-3 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Players 51-75"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 734,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 733,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Rank"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 742,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 745,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Players Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 748,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20",
                                                            children: "Points"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 751,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                    lineNumber: 741,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 740,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "bg-white divide-y divide-gray-200",
                                                children: players.slice(50, 75).map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-gray-50 cursor-pointer",
                                                        onClick: ()=>handleEditPlayer(player),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg font-medium text-gray-900 w-16",
                                                                children: [
                                                                    "#",
                                                                    i + 51
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center w-16",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-sm mx-auto",
                                                                    children: "👤"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 767,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 766,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-lg text-gray-900",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 771,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg text-gray-900 w-20",
                                                                children: 100 + (i + 51) * 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 774,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, player.id, true, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 756,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 739,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 738,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 732,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 622,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
            lineNumber: 500,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
        lineNumber: 499,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PlayersPage, "Regj8MaCznRf3m1iAZWzxMPI0OY=");
_c = PlayersPage;
const __TURBOPACK__default__export__ = PlayersPage;
var _c;
__turbopack_context__.k.register(_c, "PlayersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=LocalDev_billiards_barako_src_app_players_page_tsx_81a860fd._.js.map