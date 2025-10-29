module.exports = [
"[project]/LocalDev/billiards/barako/src/app/players/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/LocalDev/billiards/barako/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const PlayersPage = ()=>{
    const { isManager } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showLoginPrompt, setShowLoginPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load players from Firestore on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadPlayers = async ()=>{
            try {
                setLoading(true);
                const playersCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "players");
                const playersSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(playersCollection);
                const playersList = playersSnapshot.docs.map((doc)=>{
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        points: data.points || 0
                    };
                });
                // Sort players by points in descending order (higher points = better rank)
                const sortedPlayers = playersList.sort((a, b)=>b.points - a.points);
                setPlayers(sortedPlayers);
            } catch (error) {
                console.error("Error loading players:", error);
            } finally{
                setLoading(false);
            }
        };
        loadPlayers();
    }, []);
    const [showCreateForm, setShowCreateForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPlayer, setEditingPlayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newPlayer, setNewPlayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        points: "",
        skillLevel: "beginner",
        photo: null
    });
    const [photoPreview, setPhotoPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCreatePlayer = async ()=>{
        // Check for duplicate name
        const duplicateName = players.find((player)=>player.name.toLowerCase() === newPlayer.name.toLowerCase());
        if (duplicateName) {
            alert(`Player with name "${newPlayer.name}" already exists!`);
            return;
        }
        try {
            setLoading(true);
            const playerData = {
                name: newPlayer.name,
                email: "",
                phone: "",
                skillLevel: newPlayer.skillLevel,
                rating: 0,
                points: Number(newPlayer.points) || 0,
                tournamentsPlayed: 0,
                wins: 0,
                status: "active",
                photoURL: photoPreview || ""
            };
            // Add to Firestore
            const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "players"), playerData);
            // Update local state with new player including Firestore ID
            const newPlayerWithId = {
                id: docRef.id,
                ...playerData,
                status: "active"
            };
            // Re-sort players after adding (by points descending)
            const updatedPlayers = [
                ...players,
                newPlayerWithId
            ].sort((a, b)=>b.points - a.points);
            setPlayers(updatedPlayers);
            setNewPlayer({
                name: "",
                points: "",
                skillLevel: "beginner",
                photo: null
            });
            setPhotoPreview(null);
            setShowCreateForm(false);
        } catch (error) {
            console.error("Error creating player:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            alert(`Failed to create player: ${errorMessage}\n\nCheck the console for more details.`);
        } finally{
            setLoading(false);
        }
    };
    const handleEditPlayer = (player)=>{
        if (!isManager) {
            setShowLoginPrompt(true);
            return;
        }
        console.log("Editing player:", player);
        setEditingPlayer(player);
        setNewPlayer({
            name: player.name,
            points: player.points?.toString() || "",
            skillLevel: player.skillLevel,
            photo: null
        });
        // Show existing photo if available
        setPhotoPreview(player.photoURL || null);
        setShowCreateForm(true);
    };
    const handleUpdatePlayer = async ()=>{
        if (editingPlayer) {
            // Check for duplicate name (excluding the current player being edited)
            const duplicateName = players.find((player)=>player.name.toLowerCase() === newPlayer.name.toLowerCase() && player.id !== editingPlayer.id);
            if (duplicateName) {
                alert(`Player with name "${newPlayer.name}" already exists!`);
                return;
            }
            try {
                setLoading(true);
                // Update in Firestore
                const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "players", editingPlayer.id);
                const updateData = {
                    name: newPlayer.name,
                    points: Number(newPlayer.points) || 0,
                    skillLevel: newPlayer.skillLevel
                };
                // Update photoURL - either new photo or remove existing photo
                if (photoPreview) {
                    updateData.photoURL = photoPreview;
                } else {
                    updateData.photoURL = ""; // Remove photo by setting empty string
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(playerRef, updateData);
                // Update local state
                const updatedPlayers = players.map((player)=>player.id === editingPlayer.id ? {
                        ...player,
                        name: newPlayer.name,
                        points: Number(newPlayer.points) || 0,
                        skillLevel: newPlayer.skillLevel,
                        photoURL: photoPreview || ""
                    } : player);
                // Re-sort players after updating (by points descending)
                const sortedPlayers = updatedPlayers.sort((a, b)=>b.points - a.points);
                setPlayers(sortedPlayers);
                setEditingPlayer(null);
                setNewPlayer({
                    name: "",
                    points: "",
                    skillLevel: "beginner",
                    photo: null
                });
                setPhotoPreview(null);
                setShowCreateForm(false);
            } catch (error) {
                console.error("Error updating player:", error);
                alert("Failed to update player. Please try again.");
            } finally{
                setLoading(false);
            }
        }
    };
    const handleCancelEdit = ()=>{
        setEditingPlayer(null);
        setNewPlayer({
            name: "",
            points: "",
            skillLevel: "beginner",
            photo: null
        });
        setPhotoPreview(null);
        setShowCreateForm(false);
    };
    const handlePhotoChange = (e)=>{
        const file = e.target.files?.[0] || null;
        setNewPlayer({
            ...newPlayer,
            photo: file
        });
        // Create compressed preview URL
        if (file) {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                const img = new Image();
                img.onload = ()=>{
                    // Create canvas for compression
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    // Resize to max 400x400 (good for profile photos)
                    const maxSize = 400;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > maxSize) {
                            height = height * maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = width * maxSize / height;
                            height = maxSize;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    // Draw and compress
                    ctx?.drawImage(img, 0, 0, width, height);
                    // Convert to compressed data URL (JPEG at 0.7 quality)
                    const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
                    setPhotoPreview(compressedDataUrl);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };
    const handleAddPlayerClick = ()=>{
        if (!isManager) {
            setShowLoginPrompt(true);
            return;
        }
        setShowCreateForm(true);
    };
    const handleDeletePlayer = async ()=>{
        if (!editingPlayer) return;
        const confirmDelete = window.confirm(`Are you sure you want to delete "${editingPlayer.name}"? This action cannot be undone.`);
        if (!confirmDelete) return;
        try {
            setLoading(true);
            // Delete from Firestore
            const { deleteDoc } = await __turbopack_context__.A("[project]/LocalDev/billiards/barako/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript, async loader)");
            const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "players", editingPlayer.id);
            await deleteDoc(playerRef);
            // Update local state
            const updatedPlayers = players.filter((p)=>p.id !== editingPlayer.id);
            setPlayers(updatedPlayers);
            setEditingPlayer(null);
            setNewPlayer({
                name: "",
                points: "",
                skillLevel: "beginner",
                photo: null
            });
            setPhotoPreview(null);
            setShowCreateForm(false);
            alert("Player deleted successfully!");
        } catch (error) {
            console.error("Error deleting player:", error);
            alert("Failed to delete player. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 bg-gray-50 min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-gray-900",
                                children: "Players"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 346,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleAddPlayerClick,
                            disabled: loading,
                            className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center font-bold transition-colors disabled:opacity-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-bold text-2xl mr-2",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Add Player"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 345,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                loading && players.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-4xl mb-4",
                            children: "⏳"
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 361,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Loading players..."
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 362,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 360,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                showLoginPrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg p-6 w-full max-w-md mx-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-6xl mb-4",
                                    children: "🔒"
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold mb-2 text-gray-900",
                                    children: "Manager Login Required"
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-6",
                                    children: "Only logged-in managers can add or edit players. Please login to continue."
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-3 justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowLoginPrompt(false);
                                                window.location.href = "/tournament"; // Redirect to tournament page where login button is
                                            },
                                            className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors",
                                            children: "Go to Login"
                                        }, void 0, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowLoginPrompt(false),
                                            className: "bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors",
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 379,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 370,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                        lineNumber: 369,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 368,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                showCreateForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold mb-4 text-gray-900",
                                children: editingPlayer ? "Edit Player" : "Add New Player"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 405,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            photoPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative inline-block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: photoPreview,
                                                alt: "Player profile",
                                                className: "w-24 h-24 object-cover rounded-full border-4 border-blue-500 mx-auto"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 414,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setNewPlayer({
                                                        ...newPlayer,
                                                        photo: null
                                                    });
                                                    setPhotoPreview(null);
                                                },
                                                className: "absolute top-0 right-0 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 shadow-lg",
                                                title: "Remove photo",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 419,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 412,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-2",
                                        children: "Profile Photo"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 431,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 411,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Player Photo (Optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 437,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handlePhotoChange,
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 440,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-1",
                                                children: photoPreview ? "Photo added - see preview above" : "Photo will be saved to Firebase Storage"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 436,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Player Name"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                lineNumber: 456,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 452,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Points ⭐"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: newPlayer.points,
                                                onChange: (e)=>{
                                                    setNewPlayer({
                                                        ...newPlayer,
                                                        points: e.target.value
                                                    });
                                                },
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                                placeholder: "Enter tournament points"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 471,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-1",
                                                children: "Ranking is determined by points (higher = better)"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 483,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Skill Level"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 488,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newPlayer.skillLevel,
                                                onChange: (e)=>setNewPlayer({
                                                        ...newPlayer,
                                                        skillLevel: e.target.value
                                                    }),
                                                className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "beginner",
                                                        children: "Beginner"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "intermediate",
                                                        children: "Intermediate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "advanced",
                                                        children: "Advanced"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "expert",
                                                        children: "Expert"
                                                    }, void 0, false, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 491,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 487,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 435,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: editingPlayer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleDeletePlayer,
                                            disabled: loading,
                                            className: "bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2 font-bold",
                                            children: "🗑️ Delete"
                                        }, void 0, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                            lineNumber: 515,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleCancelEdit,
                                                className: "px-2 py-2 text-gray-600 hover:text-gray-800 font-bold",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 525,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: editingPlayer ? handleUpdatePlayer : handleCreatePlayer,
                                                disabled: loading,
                                                className: "bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2 font-bold",
                                                children: editingPlayer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-bold",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Update"
                                                    ]
                                                }, void 0, true) : "Add Player"
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 531,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 524,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                lineNumber: 512,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                        lineNumber: 404,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 403,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-lg overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 px-4 py-3 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Players 1-25"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 557,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Rank"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 566,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Players"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20",
                                                            children: "Points"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 575,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 564,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "bg-white divide-y divide-gray-200",
                                                children: players.slice(0, 25).map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: `transition-colors ${isManager ? "hover:bg-blue-50 cursor-pointer" : ""}`,
                                                        onClick: ()=>handleEditPlayer(player),
                                                        title: isManager ? "Click to edit" : "",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg font-medium text-gray-900 w-16",
                                                                children: [
                                                                    "#",
                                                                    i + 1
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 590,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center w-16",
                                                                children: player.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-8 h-8 mx-auto",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: player.photoURL,
                                                                        alt: player.name,
                                                                        className: "w-full h-full object-cover rounded-full border-2 border-blue-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                        lineNumber: 597,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 595,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-sm mx-auto",
                                                                    children: "👤"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 604,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 593,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-lg text-gray-900",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 609,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg text-gray-900 w-20",
                                                                children: player.points
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 612,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, player.id, true, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 582,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 563,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 562,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 556,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-lg overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 px-4 py-3 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Players 26-50"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 624,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Rank"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Players"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20",
                                                            children: "Points"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 642,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 631,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "bg-white divide-y divide-gray-200",
                                                children: players.slice(25, 50).map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: `transition-colors ${isManager ? "hover:bg-blue-50 cursor-pointer" : ""}`,
                                                        onClick: ()=>handleEditPlayer(player),
                                                        title: isManager ? "Click to edit" : "",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg font-medium text-gray-900 w-16",
                                                                children: [
                                                                    "#",
                                                                    i + 26
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center w-16",
                                                                children: player.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-8 h-8 mx-auto",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: player.photoURL,
                                                                        alt: player.name,
                                                                        className: "w-full h-full object-cover rounded-full border-2 border-green-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                        lineNumber: 664,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 662,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-sm mx-auto",
                                                                    children: "👤"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 660,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-lg text-gray-900",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg text-gray-900 w-20",
                                                                children: player.points
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 679,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, player.id, true, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 647,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 629,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 623,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-lg overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 px-4 py-3 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Players 51-75"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 692,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 691,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Rank"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 700,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-16",
                                                            children: "Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 703,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-2 text-left text-base font-medium text-gray-500 uppercase tracking-wider",
                                                            children: "Players"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-2 py-2 text-center text-base font-medium text-gray-500 uppercase tracking-wider w-20",
                                                            children: "Points"
                                                        }, void 0, false, {
                                                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                    lineNumber: 699,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 698,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "bg-white divide-y divide-gray-200",
                                                children: players.slice(50, 75).map((player, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: `transition-colors ${isManager ? "hover:bg-blue-50 cursor-pointer" : ""}`,
                                                        onClick: ()=>handleEditPlayer(player),
                                                        title: isManager ? "Click to edit" : "",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg font-medium text-gray-900 w-16",
                                                                children: [
                                                                    "#",
                                                                    i + 51
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center w-16",
                                                                children: player.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-8 h-8 mx-auto",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: player.photoURL,
                                                                        alt: player.name,
                                                                        className: "w-full h-full object-cover rounded-full border-2 border-purple-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                        lineNumber: 731,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 729,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-sm mx-auto",
                                                                    children: "👤"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                    lineNumber: 738,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 727,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-2 text-lg text-gray-900",
                                                                children: player.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 743,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-2 py-2 text-center text-lg text-gray-900 w-20",
                                                                children: player.points
                                                            }, void 0, false, {
                                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                                lineNumber: 746,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, player.id, true, {
                                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                                lineNumber: 714,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                        lineNumber: 697,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                                    lineNumber: 696,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 690,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 554,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                !loading && players.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4",
                            children: "👥"
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 759,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-medium text-gray-900 mb-2",
                            children: "No players yet"
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 760,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: 'Click "Add Player" to create your first player'
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                            lineNumber: 763,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
                    lineNumber: 758,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
            lineNumber: 344,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/LocalDev/billiards/barako/src/app/players/page.tsx",
        lineNumber: 343,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = PlayersPage;
}),
];

//# sourceMappingURL=LocalDev_billiards_barako_src_app_players_page_tsx_f5c214e8._.js.map