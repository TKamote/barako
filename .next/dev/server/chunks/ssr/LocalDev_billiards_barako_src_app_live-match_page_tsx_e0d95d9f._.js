module.exports = [
"[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$contexts$2f$LiveContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/src/contexts/LiveContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/src/lib/firebase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const BilliardsBall = ({ number, isMobile = false, isPocketed = false, onClick })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: !isPocketed ? onClick : undefined,
        className: `${isMobile ? "w-8 h-8" : "w-12 h-12"} flex items-center justify-center transition-all ${isPocketed ? "opacity-0 cursor-default" : "cursor-pointer hover:scale-110"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            src: `/ballicons/ball-${number}.png`,
            alt: `Ball ${number}`,
            width: isMobile ? 32 : 48,
            height: isMobile ? 32 : 48,
            className: "object-contain"
        }, void 0, false, {
            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
            lineNumber: 39,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const LiveMatchPage = ()=>{
    const { isLive, setIsLive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$contexts$2f$LiveContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLive"])();
    const { isManager } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // Player state
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [player1, setPlayer1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [player2, setPlayer2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPlayer1Modal, setShowPlayer1Modal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPlayer2Modal, setShowPlayer2Modal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Score state
    const [player1Score, setPlayer1Score] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [player2Score, setPlayer2Score] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentTurn, setCurrentTurn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Ball state
    const [pocketedBalls, setPocketedBalls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    // Double-press R for reset tracking
    const lastResetPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const RESET_TIMEOUT = 500; // 500ms window for double-press
    // Array of ball numbers 1-10
    const ballNumbers = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ];
    // Get player photo URL (returns null if no photo)
    const getPlayer1Photo = ()=>{
        return player1?.photoURL || null;
    };
    const getPlayer2Photo = ()=>{
        return player2?.photoURL || null;
    };
    // Get player name or default
    const getPlayer1Name = ()=>{
        if (player1?.name) return player1.name;
        return "Dave";
    };
    const getPlayer2Name = ()=>{
        if (player2?.name) return player2.name;
        return "Joel";
    };
    // Fetch players from Firestore
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchPlayers = async ()=>{
            try {
                const playersCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "players");
                const playersSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(playersCollection);
                const playersList = playersSnapshot.docs.map((doc)=>{
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name || "",
                        photoURL: data.photoURL || "",
                        points: data.points || 0
                    };
                });
                // Sort by points descending
                const sortedPlayers = playersList.sort((a, b)=>b.points - a.points);
                setPlayers(sortedPlayers);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };
        fetchPlayers();
    }, []);
    // Load persisted match data from Firestore
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadMatchData = async ()=>{
            try {
                const matchDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "current_match", "live");
                const matchDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(matchDocRef);
                if (matchDoc.exists()) {
                    const matchData = matchDoc.data();
                    // Restore player 1
                    if (matchData.player1Id) {
                        if (players.length > 0) {
                            const p1 = players.find((p)=>p.id === matchData.player1Id);
                            if (p1) {
                                setPlayer1(p1);
                            } else if (matchData.player1Name) {
                                setPlayer1({
                                    id: matchData.player1Id,
                                    name: matchData.player1Name,
                                    photoURL: matchData.player1PhotoURL || "",
                                    points: 0
                                });
                            }
                        } else if (matchData.player1Name) {
                            setPlayer1({
                                id: matchData.player1Id,
                                name: matchData.player1Name,
                                photoURL: matchData.player1PhotoURL || "",
                                points: 0
                            });
                        }
                    }
                    // Restore player 2
                    if (matchData.player2Id) {
                        if (players.length > 0) {
                            const p2 = players.find((p)=>p.id === matchData.player2Id);
                            if (p2) {
                                setPlayer2(p2);
                            } else if (matchData.player2Name) {
                                setPlayer2({
                                    id: matchData.player2Id,
                                    name: matchData.player2Name,
                                    photoURL: matchData.player2PhotoURL || "",
                                    points: 0
                                });
                            }
                        } else if (matchData.player2Name) {
                            setPlayer2({
                                id: matchData.player2Id,
                                name: matchData.player2Name,
                                photoURL: matchData.player2PhotoURL || "",
                                points: 0
                            });
                        }
                    }
                    // Restore scores
                    if (matchData.player1Score !== undefined) {
                        setPlayer1Score(matchData.player1Score);
                    }
                    if (matchData.player2Score !== undefined) {
                        setPlayer2Score(matchData.player2Score);
                    }
                    // Restore pocketed balls
                    if (matchData.pocketedBalls && Array.isArray(matchData.pocketedBalls)) {
                        setPocketedBalls(new Set(matchData.pocketedBalls));
                    }
                    // Restore turn
                    if (matchData.currentTurn) {
                        setCurrentTurn(matchData.currentTurn);
                    }
                }
            } catch (error) {
                console.error("Error loading match data:", error);
            } finally{
                setLoading(false);
            }
        };
        loadMatchData();
    }, [
        players
    ]);
    // Update player objects when players array loads
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (players.length > 0 && (player1?.id || player2?.id)) {
            if (player1?.id) {
                const freshP1 = players.find((p)=>p.id === player1.id);
                if (freshP1) {
                    if (!player1.photoURL || freshP1.photoURL !== player1.photoURL) {
                        setPlayer1(freshP1);
                    }
                }
            }
            if (player2?.id) {
                const freshP2 = players.find((p)=>p.id === player2.id);
                if (freshP2) {
                    if (!player2.photoURL || freshP2.photoURL !== player2.photoURL) {
                        setPlayer2(freshP2);
                    }
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        players
    ]);
    // Save match data to Firestore
    const saveMatchData = async ()=>{
        try {
            const matchDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "current_match", "live");
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(matchDocRef, {
                player1Id: player1?.id || null,
                player2Id: player2?.id || null,
                player1Name: player1?.name || "Dave",
                player2Name: player2?.name || "Joel",
                player1PhotoURL: player1?.photoURL || "",
                player2PhotoURL: player2?.photoURL || "",
                player1Score,
                player2Score,
                currentTurn,
                pocketedBalls: Array.from(pocketedBalls),
                updatedAt: new Date().toISOString()
            }, {
                merge: true
            });
        } catch (error) {
            console.error("Error saving match data:", error);
        }
    };
    // Handle player selection
    const handlePlayer1Select = async (selectedPlayer)=>{
        setPlayer1(selectedPlayer);
        try {
            const matchDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "current_match", "live");
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(matchDocRef, {
                player1Id: selectedPlayer.id,
                player1Name: selectedPlayer.name,
                player1PhotoURL: selectedPlayer.photoURL || "",
                updatedAt: new Date().toISOString()
            }, {
                merge: true
            });
        } catch (error) {
            console.error("Error saving player 1:", error);
        }
    };
    const handlePlayer2Select = async (selectedPlayer)=>{
        setPlayer2(selectedPlayer);
        try {
            const matchDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "current_match", "live");
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(matchDocRef, {
                player2Id: selectedPlayer.id,
                player2Name: selectedPlayer.name,
                player2PhotoURL: selectedPlayer.photoURL || "",
                updatedAt: new Date().toISOString()
            }, {
                merge: true
            });
        } catch (error) {
            console.error("Error saving player 2:", error);
        }
    };
    // Save scores when they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading) {
            saveMatchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        player1Score,
        player2Score,
        currentTurn,
        loading,
        player1,
        player2,
        pocketedBalls
    ]);
    // Handle ball click - removes/pockets the ball
    const handleBallClick = (ballNumber)=>{
        setPocketedBalls((prev)=>{
            const newSet = new Set(prev);
            newSet.add(ballNumber);
            return newSet;
        });
    };
    // Reset all balls for a new game
    const handleResetBalls = ()=>{
        setPocketedBalls(new Set());
    };
    // Keyboard shortcuts handler
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyPress = (e)=>{
            // Ignore if user is typing in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            // Handle Tab key separately (before lowercasing)
            if (e.key === "Tab") {
                e.preventDefault();
                setCurrentTurn((prev)=>{
                    if (prev === "player1") return "player2";
                    return "player1"; // Handles both "player2" and null
                });
                return;
            }
            const key = e.key.toLowerCase();
            switch(key){
                case "q":
                    // Increment Player 1 score
                    setPlayer1Score((prev)=>prev + 1);
                    break;
                case "a":
                    // Decrement Player 1 score (prevent negative)
                    setPlayer1Score((prev)=>Math.max(0, prev - 1));
                    break;
                case "e":
                    // Increment Player 2 score
                    setPlayer2Score((prev)=>prev + 1);
                    break;
                case "d":
                    // Decrement Player 2 score (prevent negative)
                    setPlayer2Score((prev)=>Math.max(0, prev - 1));
                    break;
                case "z":
                    // Z → Reset indicator to no turn
                    e.preventDefault();
                    setCurrentTurn(null);
                    break;
                case "r":
                    // Double-press R to reset scores
                    e.preventDefault();
                    const now = Date.now();
                    if (now - lastResetPress.current < RESET_TIMEOUT) {
                        // Double-press detected - reset scores
                        setPlayer1Score(0);
                        setPlayer2Score(0);
                        setCurrentTurn(null); // Reset turn indicator
                        lastResetPress.current = 0; // Reset counter
                    } else {
                        // First press - record timestamp
                        lastResetPress.current = now;
                    }
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return ()=>window.removeEventListener("keydown", handleKeyPress);
    }, []);
    // Determine if player selection should be enabled
    const canSelectPlayers = isManager && !isLive;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-transparent relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start p-2 sm:p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:hidden items-start space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsLive(!isLive),
                                className: `px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 ${isLive ? "bg-red-600 hover:bg-red-700 text-white animate-pulse-live inline-flex items-center" : "bg-green-600 hover:bg-green-700 text-white"}`,
                                children: isLive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-1",
                                            children: "🔴"
                                        }, void 0, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "LIVE"
                                    ]
                                }, void 0, true) : "GO LIVE"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 404,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-800 rounded-full px-2 py-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col space-y-1",
                                    children: ballNumbers.map((ballNumber)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BilliardsBall, {
                                            number: ballNumber,
                                            isMobile: true,
                                            isPocketed: pocketedBalls.has(ballNumber),
                                            onClick: ()=>handleBallClick(ballNumber)
                                        }, ballNumber, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                            lineNumber: 426,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleResetBalls,
                                className: "text-gray-400 hover:text-gray-600 transition-colors opacity-60 hover:opacity-100 text-xs mt-1",
                                title: "Reset all balls",
                                children: "Reset Balls"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex sm:flex-col sm:items-end sm:space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsLive(!isLive),
                                className: `px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${isLive ? "bg-red-600 hover:bg-red-700 text-white animate-pulse-live inline-flex items-center" : "bg-green-600 hover:bg-green-700 text-white"}`,
                                children: isLive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-2",
                                            children: "🔴"
                                        }, void 0, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                            lineNumber: 459,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "LIVE"
                                    ]
                                }, void 0, true) : "GO LIVE"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-800 rounded-full px-2 py-2",
                                style: {
                                    marginRight: "20px",
                                    marginTop: "50px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col space-y-2",
                                    children: ballNumbers.map((ballNumber)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BilliardsBall, {
                                            number: ballNumber,
                                            isPocketed: pocketedBalls.has(ballNumber),
                                            onClick: ()=>handleBallClick(ballNumber)
                                        }, ballNumber, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 468,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleResetBalls,
                                className: "text-gray-400 hover:text-gray-600 transition-colors opacity-60 hover:opacity-100 text-sm mt-2",
                                style: {
                                    marginRight: "20px"
                                },
                                title: "Reset all balls",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-5 w-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    strokeWidth: 2,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                        lineNumber: 498,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                    lineNumber: 490,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 484,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-2 sm:bottom-4 left-0 right-0 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-linear-to-r from-purple-900 via-purple-800 to-purple-900 rounded-xl py-2 px-4 sm:py-4 sm:px-12 shadow-2xl max-w-4xl w-full mx-2 sm:mx-8 relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-linear-to-r from-yellow-400/10 via-transparent to-yellow-400/10"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 512,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sm:hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>canSelectPlayers && setShowPlayer1Modal(true),
                                                    disabled: !canSelectPlayers,
                                                    className: `flex items-center space-x-2 ${canSelectPlayers ? "cursor-pointer hover:opacity-80" : "cursor-default"} transition-opacity`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-3xl",
                                                            children: getPlayer1Photo() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: getPlayer1Photo(),
                                                                alt: getPlayer1Name(),
                                                                width: 32,
                                                                height: 32,
                                                                className: "w-8 h-8 rounded-full object-cover",
                                                                unoptimized: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)) : "👨"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 526,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-bold text-white",
                                                            children: getPlayer1Name()
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-2xl font-bold text-white",
                                                                    children: player1Score
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                    lineNumber: 547,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-2xl font-bold text-white",
                                                                    children: "-"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                    lineNumber: 550,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-2xl font-bold text-white",
                                                                    children: player2Score
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                    lineNumber: 551,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-semibold text-white mt-1",
                                                            children: "Race to 9"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>canSelectPlayers && setShowPlayer2Modal(true),
                                                    disabled: !canSelectPlayers,
                                                    className: `flex items-center space-x-2 ${canSelectPlayers ? "cursor-pointer hover:opacity-80" : "cursor-default"} transition-opacity`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-bold text-white",
                                                            children: getPlayer2Name()
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-3xl",
                                                            children: getPlayer2Photo() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: getPlayer2Photo(),
                                                                alt: getPlayer2Name(),
                                                                width: 32,
                                                                height: 32,
                                                                className: "w-8 h-8 rounded-full object-cover",
                                                                unoptimized: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                lineNumber: 574,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)) : "👩"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                            lineNumber: 516,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:block",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>canSelectPlayers && setShowPlayer1Modal(true),
                                                    disabled: !canSelectPlayers,
                                                    className: `flex items-center space-x-4 ${canSelectPlayers ? "cursor-pointer hover:opacity-80" : "cursor-default"} transition-opacity ${currentTurn === "player1" ? "ring-4 ring-yellow-400/50 rounded-lg p-2" : ""}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-6xl",
                                                            children: getPlayer1Photo() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: getPlayer1Photo(),
                                                                alt: getPlayer1Name(),
                                                                width: 64,
                                                                height: 64,
                                                                className: "w-16 h-16 rounded-full object-cover",
                                                                unoptimized: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                lineNumber: 608,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)) : "👨"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-4xl font-bold text-white",
                                                            children: getPlayer1Name()
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 620,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                    lineNumber: 593,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-8",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-4xl font-bold text-white",
                                                                    children: player1Score
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                    lineNumber: 627,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-4xl font-bold text-white",
                                                                    children: "-"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                    lineNumber: 630,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-4xl font-bold text-white",
                                                                    children: player2Score
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                    lineNumber: 631,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 626,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-semibold text-white mt-1",
                                                            children: "Race to 9"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 635,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                    lineNumber: 625,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>canSelectPlayers && setShowPlayer2Modal(true),
                                                    disabled: !canSelectPlayers,
                                                    className: `flex items-center space-x-4 ${canSelectPlayers ? "cursor-pointer hover:opacity-80" : "cursor-default"} transition-opacity ${currentTurn === "player2" ? "ring-4 ring-yellow-400/50 rounded-lg p-2" : ""}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-4xl font-bold text-white",
                                                            children: getPlayer2Name()
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 653,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-6xl",
                                                            children: getPlayer2Photo() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: getPlayer2Photo(),
                                                                alt: getPlayer2Name(),
                                                                width: 64,
                                                                height: 64,
                                                                className: "w-16 h-16 rounded-full object-cover",
                                                                unoptimized: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                                lineNumber: 658,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)) : "👩"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                            lineNumber: 592,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                        lineNumber: 591,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                        lineNumber: 511,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                    lineNumber: 510,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-1 left-2 right-2 sm:left-4 sm:right-4 z-30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/80 text-white text-xs p-1 sm:p-2 rounded text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden sm:block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "OBS Integration:"
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                    lineNumber: 682,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Use Browser Source with URL:",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    className: "bg-gray-700 px-1 rounded",
                                    children: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "localhost:3000/live-match"
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                    lineNumber: 683,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                "| Size: 1920x1080 | FPS: 60"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                            lineNumber: 681,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sm:hidden text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "OBS:"
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                                    lineNumber: 691,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Browser Source | 1920x1080 | 60fps"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                            lineNumber: 690,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                    lineNumber: 680,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                lineNumber: 679,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed z-50 hidden sm:block",
                style: {
                    bottom: "5px",
                    left: "50px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: "/favicon.png",
                    alt: "Barako Logo",
                    width: 130,
                    height: 130,
                    style: {
                        filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
                        borderRadius: "10px"
                    }
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                    lineNumber: 704,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                lineNumber: 697,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 sm:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: "/favicon.png",
                    alt: "Barako Logo",
                    width: 156,
                    height: 156,
                    style: {
                        filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))",
                        borderRadius: "10px"
                    }
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                    lineNumber: 718,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
                lineNumber: 717,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/LocalDev/billiards/barako/src/app/live-match/page.tsx",
        lineNumber: 398,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LiveMatchPage;
}),
];

//# sourceMappingURL=LocalDev_billiards_barako_src_app_live-match_page_tsx_e0d95d9f._.js.map