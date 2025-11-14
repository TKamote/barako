"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type GameMode = "9-ball" | "10-ball" | "15-ball";

interface LiveContextType {
  isLive: boolean;
  setIsLive: (isLive: boolean) => void;
  gameMode: GameMode;
  setGameMode: (gameMode: GameMode) => void;
}

const LiveContext = createContext<LiveContextType | undefined>(undefined);

export const LiveProvider = ({ children }: { children: ReactNode }) => {
  const [isLive, setIsLive] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("9-ball");

  // Listen to both match documents to determine if either is live
  useEffect(() => {
    let liveMatchIsLive = false;
    let apaMatchIsLive = false;

    const updateGlobalIsLive = () => {
      setIsLive(liveMatchIsLive || apaMatchIsLive);
    };

    const liveMatchRef = doc(db, "current_match", "live");
    const apaMatchRef = doc(db, "current_match", "apa");

    const liveMatchUnsubscribe = onSnapshot(liveMatchRef, (doc) => {
      const data = doc.data();
      liveMatchIsLive = data?.isLive === true;
      updateGlobalIsLive();
    }, (error) => {
      // If document doesn't exist or error, treat as not live
      liveMatchIsLive = false;
      updateGlobalIsLive();
    });

    const apaMatchUnsubscribe = onSnapshot(apaMatchRef, (doc) => {
      const data = doc.data();
      apaMatchIsLive = data?.isLive === true;
      updateGlobalIsLive();
    }, (error) => {
      // If document doesn't exist or error, treat as not live
      apaMatchIsLive = false;
      updateGlobalIsLive();
    });

    return () => {
      liveMatchUnsubscribe();
      apaMatchUnsubscribe();
    };
  }, []);

  return (
    <LiveContext.Provider value={{ isLive, setIsLive, gameMode, setGameMode }}>
      {children}
    </LiveContext.Provider>
  );
};

export const useLive = () => {
  const context = useContext(LiveContext);
  if (context === undefined) {
    throw new Error("useLive must be used within a LiveProvider");
  }
  return context;
};
