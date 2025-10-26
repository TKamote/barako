(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/LocalDev/billiards/barako/src/app/standby/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const StandbyPage = ()=>{
    _s();
    const [selectedStartTime, setSelectedStartTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("15:00"); // 3:00 PM
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // seconds
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Generate start time options (12:00 PM to 8:00 PM in 30-minute intervals)
    const timeOptions = [];
    for(let hour = 12; hour <= 20; hour++){
        for(let minutes = 0; minutes < 60; minutes += 30){
            const timeString = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
            const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            });
            timeOptions.push({
                value: timeString,
                label: displayTime
            });
        }
    }
    // Load persisted state on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StandbyPage.useEffect": ()=>{
            const loadPersistedState = {
                "StandbyPage.useEffect.loadPersistedState": ()=>{
                    const savedStartTime = localStorage.getItem("standby-start-time");
                    const savedIsRunning = localStorage.getItem("standby-is-running");
                    const savedTimeLeft = localStorage.getItem("standby-time-left");
                    const savedStartTimestamp = localStorage.getItem("standby-start-timestamp");
                    if (savedStartTime) {
                        setSelectedStartTime(savedStartTime);
                    }
                    if (savedIsRunning === "true" && savedTimeLeft && savedStartTimestamp) {
                        const startTimestamp = parseInt(savedStartTimestamp);
                        const now = Date.now();
                        const elapsed = Math.floor((now - startTimestamp) / 1000);
                        const remaining = parseInt(savedTimeLeft) - elapsed;
                        if (remaining > 0) {
                            setTimeLeft(remaining);
                            setIsRunning(true);
                        } else {
                            setTimeLeft(0);
                            setIsRunning(false);
                            localStorage.removeItem("standby-start-time");
                            localStorage.removeItem("standby-is-running");
                            localStorage.removeItem("standby-time-left");
                            localStorage.removeItem("standby-start-timestamp");
                        }
                    }
                }
            }["StandbyPage.useEffect.loadPersistedState"];
            loadPersistedState();
        }
    }["StandbyPage.useEffect"], []);
    // Countdown timer effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StandbyPage.useEffect": ()=>{
            let interval;
            if (isRunning && timeLeft > 0) {
                interval = setInterval({
                    "StandbyPage.useEffect": ()=>{
                        setTimeLeft({
                            "StandbyPage.useEffect": (prev)=>{
                                if (prev <= 1) {
                                    setIsRunning(false);
                                    localStorage.removeItem("standby-start-time");
                                    localStorage.removeItem("standby-is-running");
                                    localStorage.removeItem("standby-time-left");
                                    localStorage.removeItem("standby-start-timestamp");
                                    return 0;
                                }
                                return prev - 1;
                            }
                        }["StandbyPage.useEffect"]);
                    }
                }["StandbyPage.useEffect"], 1000);
            }
            return ({
                "StandbyPage.useEffect": ()=>clearInterval(interval)
            })["StandbyPage.useEffect"];
        }
    }["StandbyPage.useEffect"], [
        isRunning,
        timeLeft
    ]);
    const startTimer = ()=>{
        // Calculate time until selected start time
        const now = new Date();
        const today = now.toDateString();
        const selectedDateTime = new Date(`${today} ${selectedStartTime}`);
        // If selected time has passed today, set for tomorrow
        if (selectedDateTime <= now) {
            selectedDateTime.setDate(selectedDateTime.getDate() + 1);
        }
        const timeUntilStart = Math.floor((selectedDateTime.getTime() - now.getTime()) / 1000);
        setTimeLeft(timeUntilStart);
        setIsRunning(true);
        // Save to localStorage
        localStorage.setItem("standby-start-time", selectedStartTime);
        localStorage.setItem("standby-is-running", "true");
        localStorage.setItem("standby-time-left", timeUntilStart.toString());
        localStorage.setItem("standby-start-timestamp", now.getTime().toString());
    };
    const stopTimer = ()=>{
        setIsRunning(false);
        localStorage.setItem("standby-is-running", "false");
    };
    const resetTimer = ()=>{
        setIsRunning(false);
        setTimeLeft(0);
        // Clear localStorage
        localStorage.removeItem("standby-start-time");
        localStorage.removeItem("standby-is-running");
        localStorage.removeItem("standby-time-left");
        localStorage.removeItem("standby-start-timestamp");
    };
    const formatTime = (seconds)=>{
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 bg-gray-50 min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold text-gray-900 mb-4",
                            children: "PBS 10-Ball @ Klassic Club"
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-1 bg-blue-600 mx-auto rounded"
                        }, void 0, false, {
                            fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg p-8 mb-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-gray-900 mb-6",
                                children: "Tournament Countdown"
                            }, void 0, false, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-6xl font-mono font-bold text-blue-600 mb-4",
                                        children: formatTime(timeLeft)
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    timeLeft === 0 && !isRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl text-gray-800",
                                        children: "Tournament Complete! 🏆"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-3",
                                        children: "Select Tournament Start Time:"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-w-xs mx-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedStartTime,
                                            onChange: (e)=>setSelectedStartTime(e.target.value),
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-medium text-gray-900",
                                            children: timeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: option.value,
                                                    children: option.label
                                                }, option.value, false, {
                                                    fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center space-x-4",
                                children: [
                                    !isRunning && timeLeft === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: startTimer,
                                        className: "bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors",
                                        children: "▶️ Start Tournament"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: stopTimer,
                                        className: "bg-orange-100 hover:bg-orange-200 text-orange-700 px-6 py-3 rounded-lg font-medium transition-colors",
                                        children: "⏸️ Pause"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !isRunning && timeLeft > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: startTimer,
                                        className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors",
                                        children: "▶️ Resume"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$LocalDev$2f$billiards$2f$barako$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: resetTimer,
                                        className: "bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-lg font-medium transition-colors",
                                        children: "🔄 Reset"
                                    }, void 0, false, {
                                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
            lineNumber: 144,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/LocalDev/billiards/barako/src/app/standby/page.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(StandbyPage, "55zIdrKxRMNXZkQD1Dx0ylLR5+E=");
_c = StandbyPage;
const __TURBOPACK__default__export__ = StandbyPage;
var _c;
__turbopack_context__.k.register(_c, "StandbyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=LocalDev_billiards_barako_src_app_standby_page_tsx_31ab5d69._.js.map