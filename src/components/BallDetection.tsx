"use client";

import { useEffect, useRef, useState } from "react";

interface BallDetectionProps {
  enabled: boolean;
  onBallsDetected: (visibleBalls: Set<number>) => void;
  gameMode: "9-ball" | "10-ball" | "15-ball";
}

// Configuration
const ROBOFLOW_MODEL = "billiard-balls-kjqyt-espxp/1";
const ROBOFLOW_API_KEY = "MYV5aBkAt7dqZz1fASwR"; // User needs to replace this

/**
 * BallDetection Component
 * 
 * Handles video input and ball detection using Roboflow Hosted API.
 */
export default function BallDetection({
  enabled,
  onBallsDetected,
  gameMode,
}: BallDetectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasAutoSelectedRef = useRef(false);
  const ballVisibilityHistoryRef = useRef<Map<number, boolean[]>>(new Map());

  // Determine which balls to track based on game mode
  const getTrackedBalls = () => {
    switch (gameMode) {
      case "9-ball":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
      case "10-ball":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      case "15-ball":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      default:
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  };

  // Fetch available cameras and select the best one
  const updateDeviceList = async (currentId?: string) => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);

      // Try to find a preferred camera (iPhone, Back, OBS)
      // Only auto-switch ONCE to avoid overriding user choice later
      if (videoDevices.length > 0 && !hasAutoSelectedRef.current) {
        const preferredDevice = videoDevices.find((device) => {
          const label = device.label.toLowerCase();
          return (
            label.includes("iphone") ||
            label.includes("phone") ||
            label.includes("back") ||
            label.includes("obs") ||
            label.includes("camo") ||
            label.includes("continuity")
          );
        });

        if (preferredDevice) {
           console.log("Auto-switching to preferred camera:", preferredDevice.label);
           setSelectedDeviceId(preferredDevice.deviceId);
           hasAutoSelectedRef.current = true;
        } else {
           // If no preference found, just select the first one to ensure we have a valid ID
           if (!selectedDeviceId) {
             setSelectedDeviceId(videoDevices[0].deviceId);
             // Don't mark as auto-selected yet, maybe the labels were empty
             // and we'll find the iPhone on the next pass
             if (videoDevices[0].label) {
                hasAutoSelectedRef.current = true;
             }
           }
        }
      }
    } catch (err) {
      console.error("Error listing devices:", err);
    }
  };

  // Initial fetch (might have empty labels if no permission yet)
  useEffect(() => {
    updateDeviceList();
  }, []);

  // Start/stop video stream
  useEffect(() => {
    const startVideo = async () => {
      if (!videoRef.current || !enabled) return;

      try {
        const constraints: MediaStreamConstraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Handle play() promise to catch AbortError (common when switching cameras)
          videoRef.current.play().catch((e) => {
            if (e.name === "AbortError") {
              console.log("Video play aborted (likely due to camera switch)");
            } else {
              console.error("Error playing video:", e);
            }
          });
        }
        setError(null);

        // Once we have a stream (permissions granted), refresh device list to get labels
        // This helps find "iPhone" if it was previously hidden/unlabeled
        updateDeviceList();

      } catch (err) {
        console.error("❌ Error accessing camera:", err);
        
        // Fallback: If we tried a specific device and failed, try the default one
        if (selectedDeviceId) {
            console.log("Specific camera failed, reverting to default...");
            setSelectedDeviceId(""); // This will trigger the effect again with no deviceId constraint
            return;
        }
        
        setError("Camera access denied or unavailable");
      }
    };

    if (enabled) {
      startVideo();
    } else {
      // Stop video stream
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [enabled, selectedDeviceId]);

  // Detection function using Roboflow API
  const detectBalls = async (): Promise<Set<number>> => {
    if (!videoRef.current || !canvasRef.current) {
      return new Set();
    }

    // Check for API key
    if (ROBOFLOW_API_KEY === "YOUR_API_KEY_HERE" as string) {
      setError("Missing API Key. Please add it to BallDetection.tsx");
      return new Set();
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return new Set();

    // Set canvas size to 640x640 for faster processing and lower bandwidth
    // YOLO models are typically trained on 640x640 images
    canvas.width = 640;
    canvas.height = 640;

    // Draw video frame to canvas (scaled)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64
    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1];

    try {
      // Send to Roboflow API
      const response = await fetch(
        `https://detect.roboflow.com/${ROBOFLOW_MODEL}?api_key=${ROBOFLOW_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: base64Image,
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Process detections
      const visibleBalls = new Set<number>();
      const predictions = data.predictions || [];

      // Draw bounding boxes if debug mode is on
      if (showDebug && ctx) {
        // Clear previous drawings (re-draw image is enough, but we did that at start)
        // We need to redraw the image to clear previous boxes if we want a clean slate
        // But we already drew the image at the start of this function.
        // However, that image is now "clean".
        
        // Settings for drawing
        ctx.lineWidth = 4;
        ctx.font = "bold 20px Arial";

        predictions.forEach((pred: any) => {
           // Draw box
           // Roboflow returns x, y (center), width, height
           const x = pred.x - pred.width / 2;
           const y = pred.y - pred.height / 2;
           
           ctx.strokeStyle = "#00FF00"; // Green box
           ctx.fillStyle = "#00FF00";
           
           ctx.strokeRect(x, y, pred.width, pred.height);
           
           // Draw label
           ctx.fillText(`${pred.class} (${Math.round(pred.confidence * 100)}%)`, x, y - 10);
        });
      }

      // Map class names to ball numbers
      // Assumes classes are named like "ball-1", "1", "one", etc.
      predictions.forEach((pred: any) => {
        // Confidence threshold
        if (pred.confidence < 0.5) return;

        const className = pred.class.toLowerCase();
        let ballNumber = -1;

        // Try to extract number from class name
        // Examples: "ball-1", "1", "ball_1", "purple_4"
        if (className.includes("cue") || className.includes("white")) {
          // Ignore cue ball for counting
          return;
        }

        // Match number in string
        const match = className.match(/(\d+)/);
        if (match) {
          ballNumber = parseInt(match[1]);
        }

        // Valid ball number check
        if (ballNumber >= 1 && ballNumber <= 15) {
          visibleBalls.add(ballNumber);
        }
      });

      return visibleBalls;

    } catch (err) {
      console.error("Detection error:", err);
      // Don't set global error to avoid UI flicker, just log it
      return new Set(); // Return empty set on error
    }
  };

  // Track ball visibility across frames
  const updateBallVisibility = (visibleBalls: Set<number>) => {
    const trackedBalls = getTrackedBalls();
    const history = ballVisibilityHistoryRef.current;
    const FRAMES_TO_CONFIRM = 3; // Ball must be missing for 3 frames to be considered pocketed

    trackedBalls.forEach((ballNumber) => {
      const isVisible = visibleBalls.has(ballNumber);

      if (!history.has(ballNumber)) {
        history.set(ballNumber, []);
      }

      const ballHistory = history.get(ballNumber)!;
      ballHistory.push(isVisible);

      // Keep only last 5 frames of history
      if (ballHistory.length > 5) {
        ballHistory.shift();
      }
    });

    // Determine which balls are actually visible (seen in recent frames)
    const confirmedVisible = new Set<number>();
    trackedBalls.forEach((ballNumber) => {
      const ballHistory = history.get(ballNumber) || [];
      const recentVisible = ballHistory.slice(-FRAMES_TO_CONFIRM);
      
      // Ball is visible if seen in any of the last 3 frames
      if (recentVisible.some((v) => v)) {
        confirmedVisible.add(ballNumber);
      }
    });

    // Notify parent component of visible balls
    onBallsDetected(confirmedVisible);
  };

  // Run detection at intervals
  useEffect(() => {
    if (!enabled) {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
      setIsDetecting(false);
      return;
    }

    // Start detection loop
    // API Rate limit consideration: 1 FPS is safer for free tier
    const DETECTION_INTERVAL = 1000; 
    setIsDetecting(true);

    detectionIntervalRef.current = setInterval(async () => {
      try {
        const visibleBalls = await detectBalls();
        // Only update if we got valid results (not empty set due to error)
        // But empty set is valid if no balls are visible...
        // Logic handles this by tracking history
        updateBallVisibility(visibleBalls);
      } catch (err) {
        console.error("Error during detection cycle:", err);
      }
    }, DETECTION_INTERVAL);

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
      setIsDetecting(false);
    };
  }, [enabled, gameMode]);

  // Reset visibility history when game mode changes
  useEffect(() => {
    ballVisibilityHistoryRef.current.clear();
  }, [gameMode]);

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-black/80 p-4 rounded-lg text-white text-xs max-w-xs">
      <div className="font-bold mb-2">Ball Detection</div>
      
      {error && (
        <div className="text-red-400 mb-2 text-xs">{error}</div>
      )}
      
      {isDetecting && !error && (
        <div className="text-green-400 mb-2">🔴 Detecting (API)...</div>
      )}
      
      {!enabled && (
        <div className="text-gray-400 mb-2">Detection disabled</div>
      )}

      {/* Camera Selector */}
      {enabled && (
        <div className="mb-2 flex gap-1">
          <select
            className="w-full bg-gray-700 text-white text-xs p-1 rounded border border-gray-600"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${devices.indexOf(device) + 1}`}
              </option>
            ))}
          </select>
          <button 
            onClick={() => updateDeviceList()}
            className="bg-gray-700 hover:bg-gray-600 text-white px-2 rounded border border-gray-600"
            title="Refresh Camera List"
          >
            ↻
          </button>
        </div>
      )}

      {/* Debug Toggle */}
      {enabled && (
        <div className="mb-2 flex items-center">
          <input
            type="checkbox"
            id="debug-mode"
            checked={showDebug}
            onChange={(e) => setShowDebug(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="debug-mode" className="text-xs text-gray-300 cursor-pointer">
            Show Debug View
          </label>
        </div>
      )}

      {/* Hidden video and canvas elements */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="hidden"
      />
      {/* Canvas: Visible in debug mode, hidden otherwise */}
      <canvas 
        ref={canvasRef} 
        className={`${showDebug ? "block w-full h-auto mb-2 border border-green-500" : "hidden"}`}
      />

      {/* Debug info */}
      {enabled && (
        <div className="mt-2 text-xs text-gray-400">
          <div>Cameras ({devices.length}):</div>
          {devices.map((d, i) => (
            <div key={i} className={d.deviceId === selectedDeviceId ? "text-green-400" : ""}>
              - {d.label || "Unknown"}
            </div>
          ))}
          <br />
          Model: {ROBOFLOW_MODEL}
          <br />
          Game: {gameMode}
        </div>
      )}
    </div>
  );
}
