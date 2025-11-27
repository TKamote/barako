# Experimental Live Match Page - Ball Detection

## 🎯 Overview

This is an experimental version of the live-match page (`/live-match-experimental`) that includes automatic billiard ball detection using TensorFlow.js and computer vision.

## ✨ Features Added

1. **Auto-Detection Toggle**: Manager-only toggle to enable/disable automatic ball detection
2. **BallDetection Component**: Handles video input, model loading, and detection logic
3. **Camera Integration**: Accesses device camera for real-time video feed
4. **Placeholder Detection**: Currently uses placeholder logic (random ball detection) until model is trained
5. **Ball Tracking**: Tracks ball visibility across frames to determine pocketed balls

## 🚀 How to Use

1. Navigate to `/live-match-experimental`
2. Click "Auto-Detect" toggle (manager only)
3. Grant camera permissions when prompted
4. Detection will run automatically every 500ms (2 FPS)
5. Pocketed balls will update automatically based on detection

## 📁 Files Created/Modified

### New Files
- `src/components/BallDetection.tsx` - Detection component
- `src/app/live-match-experimental/page.tsx` - Experimental page
- `YOLOV8_TRAINING_GUIDE.md` - Guide for training the model
- `BALL_DETECTION_PLAN.md` - Implementation plan

### Modified Files
- `package.json` - Added TensorFlow.js dependencies

## 🔧 Current Status

### ✅ Completed
- [x] TensorFlow.js dependencies installed
- [x] BallDetection component created
- [x] Video input (camera) integration
- [x] Frame capture logic
- [x] Placeholder detection (for testing)
- [x] Auto-detection toggle UI
- [x] Integration with existing ball state

### ⏳ Pending
- [ ] Train YOLOv8 model (see `YOLOV8_TRAINING_GUIDE.md`)
- [ ] Replace placeholder with real model inference
- [ ] Fine-tune detection parameters
- [ ] Add visual feedback for detected balls
- [ ] Performance optimization

## 🎓 Next Steps

1. **Train Model** (Follow `YOLOV8_TRAINING_GUIDE.md`):
   - Collect 100-500 images of billiard balls
   - Label with Roboflow
   - Train YOLOv8 model
   - Export as TensorFlow.js format

2. **Replace Placeholder**:
   - Place model files in `/public/models/ball-detection/`
   - Update `BallDetection.tsx` line ~50 to load real model
   - Implement actual inference logic

3. **Test & Refine**:
   - Test with real camera feed
   - Adjust confidence thresholds
   - Fine-tune frame rate
   - Optimize for performance

## 🔍 How It Works

1. **Video Input**: Component accesses device camera via `getUserMedia()`
2. **Frame Capture**: Captures frames every 500ms from video element
3. **Detection**: Runs model inference on each frame (placeholder currently)
4. **Tracking**: Maintains visibility history for each ball across frames
5. **State Update**: Calculates pocketed balls = all balls - visible balls
6. **UI Update**: Updates `pocketedBalls` state which reflects in UI

## ⚙️ Configuration

### Detection Settings (in `BallDetection.tsx`)
- `DETECTION_INTERVAL`: 500ms (2 FPS) - Adjust for performance
- `FRAMES_TO_CONFIRM`: 3 frames - Ball must be missing for 3 frames to be considered pocketed
- `CONFIDENCE_THRESHOLD`: Will be set once model is trained (recommended: 0.5-0.7)

### Model Path (to be updated)
Currently placeholder. Once model is trained:
```typescript
const modelPath = "/models/ball-detection/model.json";
```

## 🐛 Known Issues / Limitations

1. **Placeholder Mode**: Currently uses random ball detection for testing
2. **Camera Access**: Requires HTTPS or localhost for camera access
3. **Performance**: May be slow on mobile devices (optimization needed)
4. **Model Not Trained**: Real detection won't work until model is trained

## 💡 Tips

- Test on desktop first (better performance)
- Use good lighting for better detection
- Overhead camera angle works best
- Manual override always available (click balls or use keyboard)

## 📝 Notes

- This is experimental - original `/live-match` page is unchanged
- All detection logic is isolated to this experimental page
- Safe to experiment without affecting production code

