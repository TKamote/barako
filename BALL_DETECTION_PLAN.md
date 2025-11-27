# Billiard Ball Detection Implementation Plan

## 🎯 Simplified Approach

**Key Decision: Client-Side Detection (Recommended)**
- Run TensorFlow.js directly in the browser
- Add a hidden video input that captures camera/stream
- Process frames at 1-2 FPS to avoid performance issues
- Update existing `pocketedBalls` state automatically

## 📋 Actionable Steps

### Phase 1: Setup & Dependencies

1. **Install TensorFlow.js**
   ```bash
   npm install @tensorflow/tfjs @tensorflow/tfjs-core
   ```

2. **Get Pre-trained Model**
   - Use Roboflow to train/export YOLOv8 model
   - Export as TensorFlow.js format
   - Place model files in `/public/models/ball-detection/`
   - Files needed: `model.json` and `weights.bin` (or sharded weights)

### Phase 2: Create Detection Component

**File: `src/components/BallDetection.tsx`**

Features:
- Hidden `<video>` element (or visible for testing)
- Load TensorFlow.js model on mount
- Capture frames every 500-1000ms
- Run inference on each frame
- Track ball visibility across frames
- Callback to update parent state

**Key Logic:**
```typescript
// Track visible balls per frame
const visibleBalls = new Set<number>();

// If ball disappears for 3+ consecutive frames → mark as pocketed
// If ball reappears → unmark as pocketed
```

### Phase 3: Integration

**Modify: `src/app/live-match/page.tsx`**

1. Add state for auto-detection toggle
2. Import and render `BallDetection` component
3. Pass `pocketedBalls` setter as callback
4. Add UI toggle: "Auto-Detect Balls" switch

### Phase 4: Video Input Options

**Option A: Camera Input (Easiest)**
- Use `getUserMedia()` to access webcam
- Works if camera is positioned to see table

**Option B: Video File Input (Testing)**
- Upload video file for testing
- Process frames from video element

**Option C: Screen Share (Advanced)**
- Use `getDisplayMedia()` to capture OBS window
- More complex but closer to production setup

## 🔧 Technical Details

### Model Requirements
- **Classes**: 1, 2, 3, 4, 5, 6, 7, 8, 9, cue (10 classes total)
- **Input Size**: 640x640 (standard YOLOv8)
- **Confidence Threshold**: 0.5 (adjustable)

### Performance Optimization
- **Throttle Detection**: Only run every 500-1000ms
- **Skip Frames**: Process every Nth frame if needed
- **GPU Acceleration**: TensorFlow.js will use WebGL if available
- **Model Quantization**: Use quantized model for faster inference

### State Management
```typescript
// Track ball visibility history
const ballVisibilityHistory = new Map<number, boolean[]>();

// If ball not seen for 3 frames → pocketed
// If ball seen again → not pocketed
```

## 🎨 UI Additions

1. **Toggle Switch** (top of live-match page)
   - "Auto-Detect Balls" toggle
   - Only visible to managers
   - When off, manual mode works as before

2. **Detection Status Indicator** (optional)
   - Show "Detecting..." when processing
   - Show detected ball count
   - Show confidence levels (debug mode)

3. **Manual Override**
   - Always allow manual ball toggling
   - Auto-detection updates don't override manual changes immediately
   - Add "Sync" button to reconcile differences

## 🚀 Implementation Order

1. ✅ Install dependencies
2. ✅ Create basic `BallDetection` component (skeleton)
3. ✅ Add video input (camera or file)
4. ✅ Load and test model loading
5. ✅ Implement frame capture
6. ✅ Add detection inference
7. ✅ Implement ball tracking logic
8. ✅ Integrate with `pocketedBalls` state
9. ✅ Add toggle UI
10. ✅ Test and refine

## ⚠️ Important Considerations

1. **Model Training**: You'll need to train the YOLOv8 model first
   - Collect images of balls on table
   - Label with Roboflow
   - Train and export to TensorFlow.js

2. **Camera Position**: Detection quality depends on camera angle
   - Overhead view works best
   - Side angles may miss some balls

3. **Lighting**: Consistent lighting improves accuracy

4. **False Positives**: Start with high confidence threshold (0.7)
   - Adjust based on testing
   - Manual override always available

5. **Performance**: Test on target devices
   - Mobile may struggle with real-time detection
   - Consider reducing frame rate or model size

## 🔄 Alternative: Backend Service (Future)

If client-side is too slow or unreliable:
- Create Node.js service with TensorFlow.js
- Process video stream server-side
- Send results via WebSocket or Firebase Realtime Database
- More complex but better performance

## 📝 Next Steps

1. Decide on video input method (camera vs file vs screen share)
2. Train/obtain YOLOv8 model
3. Start with Phase 1 (dependencies)
4. Build incrementally, test each phase

