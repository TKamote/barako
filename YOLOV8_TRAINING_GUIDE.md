# YOLOv8 Training Guide for Billiard Ball Detection

## 🎯 Overview

You'll use **Roboflow** - a web-based platform that makes training YOLOv8 models super easy. No separate applications needed - everything runs in your browser!

## 📋 Step-by-Step Process

### Step 1: Create Roboflow Account
1. Go to [roboflow.com](https://roboflow.com)
2. Sign up for a free account (generous free tier)
3. Create a new project

### Step 2: Upload Images
**What you need:**
- 100-500 images of billiard balls on a table
- Mix of different angles, lighting, ball positions
- Include images with balls pocketed/visible
- Variety: close-up, wide shots, different table conditions

**Tips:**
- Use your phone to take photos/videos
- Extract frames from videos (Roboflow can do this)
- Include edge cases: balls partially hidden, overlapping, etc.

### Step 3: Label Your Images
**Classes to create:**
1. `ball-1` (yellow)
2. `ball-2` (blue)
3. `ball-3` (red)
4. `ball-4` (purple)
5. `ball-5` (orange)
6. `ball-6` (green)
7. `ball-7` (maroon)
8. `ball-8` (black)
9. `ball-9` (yellow stripe)
10. `cue-ball` (white)

**Labeling process:**
- Roboflow has built-in labeling tool
- Draw bounding boxes around each ball
- Assign correct class to each box
- Can use keyboard shortcuts for speed

### Step 4: Preprocessing & Augmentation
**Roboflow will help you:**
- Resize images (640x640 recommended for YOLOv8)
- Apply augmentations (rotation, brightness, etc.) to increase dataset
- Split into train/validation/test sets (80/10/10)

### Step 5: Train Model
1. Select **YOLOv8** as model type
2. Choose model size:
   - **YOLOv8n** (nano) - fastest, less accurate
   - **YOLOv8s** (small) - balanced ⭐ **Recommended**
   - **YOLOv8m** (medium) - slower, more accurate
3. Click "Train" - Roboflow handles everything in the cloud
4. Training takes 1-4 hours depending on dataset size

### Step 6: Export to TensorFlow.js
1. Once training completes, go to "Export"
2. Select **"TensorFlow.js"** format
3. Download the model files:
   - `model.json`
   - `weights.bin` (or sharded weights)
4. Place in `/public/models/ball-detection/` in your project

## 🎨 Alternative: Use Pre-trained Model

If you don't have training data yet:
1. Search Roboflow Universe for existing billiard ball models
2. Or use a generic object detection model as placeholder
3. Fine-tune later with your specific images

## 📁 File Structure After Export

```
public/
  models/
    ball-detection/
      model.json          # Model architecture
      weights.bin         # Model weights (or weights_1.bin, weights_2.bin, etc.)
```

## 🔧 Model Configuration

**Input Size:** 640x640 pixels
**Output:** Bounding boxes with:
- Class ID (0-9 for balls, 10 for cue)
- Confidence score (0-1)
- Bounding box coordinates (x, y, width, height)

## 💡 Tips for Better Results

1. **More data = better model** - Aim for 200+ images minimum
2. **Variety matters** - Different lighting, angles, table conditions
3. **Label accurately** - Tight bounding boxes around balls
4. **Test frequently** - Export and test early versions
5. **Iterate** - Add more images based on where model fails

## 🚀 Quick Start (Minimal Dataset)

If you want to test quickly:
1. Take 20-30 photos with your phone
2. Upload to Roboflow
3. Label 5-10 images per ball class
4. Train with YOLOv8n (nano) - fastest
5. Export and test
6. Add more data and retrain as needed

## 📚 Resources

- [Roboflow Documentation](https://docs.roboflow.com)
- [YOLOv8 Paper](https://arxiv.org/abs/2304.00501)
- [Roboflow Universe](https://universe.roboflow.com) - Browse existing models

## ⚠️ Important Notes

- **Free tier limits:** Roboflow free tier has some limits but should be enough to start
- **Export format:** Make sure to export as TensorFlow.js (not PyTorch or ONNX)
- **Model size:** Larger models = better accuracy but slower inference
- **Quantization:** Consider quantized model for faster browser performance

