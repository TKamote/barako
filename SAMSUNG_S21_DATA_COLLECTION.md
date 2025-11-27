# Samsung S21 Data Collection Guide

## 🎯 Your Setup Plan

**Device:** Samsung S21  
**Camera App:** Use built-in camera (not Camo for collection)  
**Camo App:** Use later for testing/positioning only

## 📱 Step-by-Step: What to Do RIGHT NOW

### Phase 1: Collect Training Data (Do This First)

#### Option A: Record Videos (EASIEST - Recommended)
1. **Set up your S21:**
   - Open Camera app
   - Set to Video mode
   - Use highest quality (4K if available, or 1080p)
   - Hold phone steady or use a tripod/stand

2. **Record 5-10 videos (30 seconds to 2 minutes each):**
   - Video 1: Overhead view, all balls visible
   - Video 2: Side angle, balls in different positions
   - Video 3: Close-up of balls (1-5 balls in frame)
   - Video 4: Wide shot, entire table
   - Video 5: Different lighting (if possible)
   - Video 6: Balls being pocketed (if you can)
   - Video 7-10: Mix of above, different angles

3. **Transfer videos to your computer:**
   - Connect S21 via USB
   - Or upload to Google Drive/Dropbox
   - Or use Samsung Smart Switch

4. **Upload to Roboflow:**
   - Roboflow can extract frames from videos automatically
   - This gives you 100-500 images from just a few videos!

#### Option B: Take Photos (More Control)
1. **Take 100-200 photos:**
   - Mix of angles, lighting, ball positions
   - Try to get all 10 ball types (1-9 + cue) in various combinations
   - Include edge cases: overlapping balls, partially hidden, etc.

2. **Transfer photos to computer** (same methods as videos)

### Phase 2: Use Camo App (For Testing Only)

**After you have a trained model:**
- Use Camo app to connect S21 as webcam
- Test detection in real-time
- Adjust camera position for best results
- This is for **testing**, not training

## 🎬 Practical Workflow

### TODAY - Data Collection Session

1. **Set up at the billiard table:**
   ```
   - Position S21 on tripod/stand (or hold steady)
   - Good lighting (natural light is best)
   - Clear view of table
   ```

2. **Record videos (15-20 minutes total):**
   - Start recording
   - Move balls around manually
   - Change angles
   - Pocket some balls
   - Stop recording
   - Repeat 5-10 times

3. **Transfer to computer:**
   - Connect phone
   - Copy videos to a folder like `~/billiard-training-videos/`

### TOMORROW - Upload & Label

1. **Create Roboflow account** (5 minutes)
2. **Create new project** called "Billiard Ball Detection"
3. **Upload videos** - Roboflow extracts frames automatically
4. **Start labeling** - Draw boxes around balls (this takes time!)

## 📊 What YOLOv8 Actually Does (Simple Explanation)

Think of YOLOv8 like teaching a child to recognize balls:

1. **You show it pictures** (your videos/photos)
2. **You point and say** "This is ball-1, this is ball-2" (labeling)
3. **It learns patterns** (training) - "Ball-1 is yellow, round, this size"
4. **It can then find balls** in new pictures (detection)

The more variety you show it, the better it learns!

## 🎯 Classes You Need to Label

When labeling in Roboflow, create these 10 classes:
- `ball-1` (yellow)
- `ball-2` (blue)  
- `ball-3` (red)
- `ball-4` (purple)
- `ball-5` (orange)
- `ball-6` (green)
- `ball-7` (maroon/brown)
- `ball-8` (black)
- `ball-9` (yellow with stripe)
- `cue-ball` (white)

## ⚡ Quick Start (Minimum Viable)

**If you want to test quickly:**
1. Record 2-3 videos (1 minute each) - 10 minutes
2. Upload to Roboflow - 5 minutes
3. Extract frames - automatic
4. Label 20-30 images (just a few per ball type) - 1-2 hours
5. Train YOLOv8n (nano) - 30 minutes
6. Test! - See if it works
7. Add more data if needed

## 💡 Pro Tips

1. **Don't worry about perfect lighting** - Variety helps the model learn
2. **Include "bad" examples** - Partially hidden balls, shadows, etc.
3. **Label accurately** - Tight boxes around balls (not too big, not too small)
4. **Start small** - Test with 50 images first, then add more
5. **Iterate** - See where model fails, add more examples of those cases

## 🚫 Common Mistakes to Avoid

- ❌ Using Camo app for data collection (use it for testing only)
- ❌ Taking all photos from same angle
- ❌ Only showing perfect conditions
- ❌ Labeling too quickly (accuracy matters!)
- ❌ Starting with too many images (start small, iterate)

## ✅ What You Can Do RIGHT NOW

1. **Set up S21 at billiard table**
2. **Record 3-5 videos** (different angles)
3. **Transfer to computer**
4. **Create Roboflow account** (if you haven't)
5. **Upload videos** - Let Roboflow extract frames

That's it! You'll have training data ready in about 30 minutes.

## 📝 Next Steps After Data Collection

1. Upload videos/photos to Roboflow
2. Extract frames (if using videos)
3. Label images (draw boxes around balls)
4. Train model
5. Export as TensorFlow.js
6. Test in your app!

## 🎥 Camera Positioning Tips

**For training data:**
- Overhead view works best (if possible)
- Side angles are also good
- Mix of close-up and wide shots
- Consistent distance helps (but variety is good too)

**For testing (with Camo app later):**
- Position where you'll actually use it
- Overhead is ideal for detection
- Good lighting
- Stable position

## ❓ FAQ

**Q: How many images do I need?**  
A: Start with 100-200. More is better, but start small and iterate.

**Q: Can I use Camo app for training?**  
A: Not recommended. Use it for testing your trained model later.

**Q: How long does labeling take?**  
A: About 1-2 minutes per image. 100 images = 2-3 hours. But you can do it in sessions!

**Q: Do I need to label every ball in every image?**  
A: Yes, for best results. But you can start with fewer images and add more later.

**Q: What if I don't have all ball types?**  
A: That's okay! Label what you have. You can add more later or the model might still work.

