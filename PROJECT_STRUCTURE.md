# 📁 Project Structure Guide

## Where Everything Lives

```
titiler-deploy/
├── index.html                          ← START HERE (35 lines)
├── landslide-risk-map.html            ← Old version (backup)
└── src/
    ├── App.js                         ← Main app (40 lines)
    ├── styles.js                      ← All CSS styles (180 lines)
    ├── config/
    │   └── layers.js                  ← LAYER DATA SOURCE (90 lines)
    └── components/
        ├── Legend.js                  ← Legend display (30 lines)
        ├── LayerControls.js           ← Opacity slider (40 lines)
        └── MapComponent.js            ← Map logic (115 lines)
```

## 🎯 Where Do Layers Come From?

### Short Answer
**File**: `src/config/layers.js`
**Source**: Your TiTiler service on Google Cloud Run
**Original Data**: Exported from your Jupyter notebook using Google Earth Engine

### Detailed Flow

```
Jupyter Notebook (ee_api_colab_setup.ipynb)
    ↓
    Calculates 3 layers:
    1. Population Density (WorldPop)
    2. Landslide Probability (Slope)
    3. Total Risk (Pop × Slope)
    ↓
Google Earth Engine Export
    ↓
Google Cloud Storage (gs://macho-raster/risk_layers/cr_2020.tif)
    ↓
TiTiler Service (Cloud Run)
    URL: https://titiler-service-774201305430.us-central1.run.app
    ↓
src/config/layers.js (defines tile URLs)
    ↓
MapComponent.js (loads tiles)
    ↓
Your browser (displays maps)
```

## 📖 Read Files in This Order

1. **index.html** (35 lines)
   - Minimal setup
   - Loads libraries
   - Imports and renders App

2. **src/config/layers.js** (90 lines)
   - **START HERE to understand your data**
   - Defines 3 layers with URLs
   - Has comments explaining each layer

3. **src/App.js** (40 lines)
   - Simple layout
   - Creates 3 maps
   - Passes config to each map

4. **src/components/Legend.js** (30 lines)
   - Shows color meanings
   - Simplest component

5. **src/components/LayerControls.js** (40 lines)
   - Opacity slider
   - Easy to understand

6. **src/components/MapComponent.js** (115 lines)
   - Most complex
   - Sets up MapLibre
   - Uses React hooks

7. **src/styles.js** (180 lines)
   - Just CSS
   - Read last

## 🔍 Key Files Explained

### `src/config/layers.js` - WHERE LAYERS COME FROM
```javascript
// Your TiTiler service
const TITILER_BASE_URL = 'https://titiler-service-774201305430.us-central1.run.app';

// Your exported data
const GCS_BUCKET_URL = 'https://storage.googleapis.com/macho-raster/risk_layers/cr_2020.tif';

// Build tile URL
const buildTileUrl = () => {
    return `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=${GCS_BUCKET_URL}`;
};
```

**This is the connection between:**
- Your Jupyter notebook analysis → 
- Google Earth Engine export → 
- TiTiler serving → 
- Your web map display

### `src/App.js` - MAIN LAYOUT
```javascript
<MapComponent config={LAYERS_CONFIG.population} />    // Map 1
<MapComponent config={LAYERS_CONFIG.probability} />   // Map 2  
<MapComponent config={LAYERS_CONFIG.risk} />          // Map 3
```

Simple! Just creates 3 maps with different configs.

### `src/components/MapComponent.js` - MAP LOGIC
```javascript
useEffect(() => {
    // 1. Create map
    // 2. Add base layer (OpenStreetMap)
    // 3. Add your data layer from TiTiler
}, []); // Run once

useEffect(() => {
    // Update opacity when user moves slider
}, [opacity]); // Run when opacity changes
```

## 🎨 Customization Guide

### Change Layer Colors
**File**: `src/config/layers.js`
```javascript
legend: [
    { color: '#ff0000', label: 'High' },
    { color: '#00ff00', label: 'Low' }
]
```

### Change Starting Position
**File**: `src/config/layers.js`
```javascript
export const MAP_CENTER = [-84.15911, 9.93404]; // [lon, lat]
export const MAP_ZOOM = 11;
```

### Change Layout (1 row vs 2 rows)
**File**: `src/styles.js`
```javascript
.maps-container {
    grid-template-columns: repeat(3, 1fr); // Change to repeat(2, 1fr) for 2 columns
}
```

### Add New Layer
1. Export new data from Earth Engine
2. Add config in `src/config/layers.js`:
```javascript
myNewLayer: {
    id: 'my-new-layer',
    title: 'My New Layer',
    tileUrl: buildTileUrl(), // or custom URL
    legend: [...],
    defaultOpacity: 0.7
}
```
3. Add to `src/App.js`:
```javascript
<MapComponent config={LAYERS_CONFIG.myNewLayer} />
```

## 🚀 How to Run

```bash
# Option 1: Direct open (might not work due to CORS/modules)
open index.html

# Option 2: Local server (recommended)
cd /Users/jinzhaowang/titiler-deploy
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

## 🆚 Old vs New

| Feature | Old (landslide-risk-map.html) | New (Modular) |
|---------|------------------------------|---------------|
| **Lines** | 300 in one file | 35-115 per file |
| **Find layers** | Scroll through code | Open layers.js |
| **Change style** | Find CSS in middle | Open styles.js |
| **Add component** | Add to big file | Create new file |
| **Understand** | Read everything | Read piece by piece |

## 🎓 Learning Path

**Beginner**: Just want to change colors/text
→ Edit `src/config/layers.js`

**Intermediate**: Want to add controls
→ Edit `src/components/LayerControls.js`

**Advanced**: Want to add new features
→ Create new component in `src/components/`

## 📚 File Size Reference

- **index.html**: 35 lines (just setup)
- **App.js**: 40 lines (layout)
- **Legend.js**: 30 lines (simple display)
- **LayerControls.js**: 40 lines (slider)
- **MapComponent.js**: 115 lines (map logic)
- **layers.js**: 90 lines (DATA SOURCE ← Important!)
- **styles.js**: 180 lines (CSS)

**Total**: ~530 lines vs 300 lines, but **much** easier to understand!

## 💡 Pro Tips

1. **Looking for layer data?** → `src/config/layers.js`
2. **Want to change layout?** → `src/App.js`
3. **Confused by a component?** → Read its comment block at the top
4. **Need to change colors?** → `src/styles.js`
5. **All layers showing same data?** → That's expected - they're from the same export. To show different data, export separate files from Earth Engine and update `tileUrl` for each layer.
