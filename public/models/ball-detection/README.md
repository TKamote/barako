# Ball Detection Model Directory

## 📁 Purpose

This directory is where you'll place your trained YOLOv8 model files after exporting from Roboflow.

## 📋 Required Files

Once you've trained and exported your model from Roboflow as TensorFlow.js format, place these files here:

- `model.json` - Model architecture file
- `weights.bin` (or `weights_1.bin`, `weights_2.bin`, etc. if sharded) - Model weights

## 📝 Example Structure

```
public/
  models/
    ball-detection/
      model.json          ← Place your model.json here
      weights.bin         ← Place your weights file(s) here
      (or weights_1.bin, weights_2.bin, etc. if sharded)
```

## 🔧 How to Add Your Model

1. Train your YOLOv8 model in Roboflow (see `YOLOV8_TRAINING_GUIDE.md`)
2. Export as **TensorFlow.js** format
3. Download the exported files
4. Copy `model.json` and `weights.bin` (or sharded weights) to this directory
5. Update `src/components/BallDetection.tsx` line ~50 to use the model:
   ```typescript
   const modelPath = "/models/ball-detection/model.json";
   const loadedModel = await tf.loadGraphModel(modelPath);
   ```

## ⚠️ Note

Currently, the BallDetection component uses placeholder detection. Once you add your model files here and update the code, it will use the real model for detection.

## 📚 Related Files

- `YOLOV8_TRAINING_GUIDE.md` - Step-by-step guide to train your model
- `BALL_DETECTION_PLAN.md` - Overall implementation plan
- `src/components/BallDetection.tsx` - Detection component (needs model path update)

