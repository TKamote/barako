"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type GameMode = "9-ball" | "10-ball" | "15-ball";

interface LiveContextType {
  liveMatchIsLive: boolean;
  apaMatchIsLive: boolean;
  gameMode: GameMode;
  setGameMode: (gameMode: GameMode) => void;
}

const LiveContext = createContext<LiveContextType | undefined>(undefined);

export const LiveProvider = ({ children }: { children: ReactNode }) => {
  const [liveMatchIsLive, setLiveMatchIsLive] = useState(false);
  const [apaMatchIsLive, setApaMatchIsLive] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("9-ball");

  // Listen to both match documents to determine if either is live
  useEffect(() => {
    const liveMatchRef = doc(db, "current_match", "live");
    const apaMatchRef = doc(db, "current_match", "apa");

    const liveMatchUnsubscribe = onSnapshot(liveMatchRef, (doc) => {
      const data = doc.data();
      setLiveMatchIsLive(data?.isLive === true);
    }, (error) => {
      setLiveMatchIsLive(false);
    });

    const apaMatchUnsubscribe = onSnapshot(apaMatchRef, (doc) => {
      const data = doc.data();
      setApaMatchIsLive(data?.isLive === true);
    }, (error) => {
      setApaMatchIsLive(false);
    });

    return () => {
      liveMatchUnsubscribe();
      apaMatchUnsubscribe();
    };
  }, []);

  return (
    <LiveContext.Provider value={{ liveMatchIsLive, apaMatchIsLive, gameMode, setGameMode }}>
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
