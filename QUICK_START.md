# 🗺️ Quick Start Guide

## ✅ Your App is Now Modular!

Instead of **1 file with 300 lines**, you now have **7 small files** that are easy to understand.

## 📂 What's Where

### 🎯 **Want to know WHERE LAYERS COME FROM?**
**Open this file**: `src/config/layers.js`

This file shows:
- Your TiTiler URL
- Your Google Cloud Storage bucket
- How tiles are loaded
- What each layer means

### 🎨 **Want to change colors or layout?**
**Open this file**: `src/styles.js`

### 🗺️ **Want to understand how maps work?**
**Open this file**: `src/components/MapComponent.js`

### 📱 **Want to see the overall structure?**
**Open this file**: `src/App.js` (only 40 lines!)

## 🚀 How to View Your App

**Option 1: Local Server** (Currently running on port 8081)
```bash
python3 -m http.server 8081
```
Then visit: http://localhost:8081

**Option 2: Direct File** (May not work due to ES6 modules)
```bash
open index.html
```

## 📊 File Sizes (Much Easier to Read!)

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | 35 | Setup (loads libraries) |
| `src/config/layers.js` | 90 | **LAYER DATA ← START HERE!** |
| `src/App.js` | 40 | Layout (creates 3 maps) |
| `src/components/Legend.js` | 30 | Shows color meanings |
| `src/components/LayerControls.js` | 40 | Opacity slider |
| `src/components/MapComponent.js` | 115 | Map logic |
| `src/styles.js` | 180 | CSS styles |

## 🎓 Understanding the Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│  YOUR JUPYTER NOTEBOOK (ee_api_colab_setup.ipynb)          │
│  - Calculates population density                            │
│  - Calculates landslide probability (slope)                 │
│  - Combines them into total risk                            │
└──────────────────────┬──────────────────────────────────────┘
                       │ Exports data
                       ↓
┌─────────────────────────────────────────────────────────────┐
│  GOOGLE EARTH ENGINE                                        │
│  - Processes and exports as Cloud Optimized GeoTIFF        │
└──────────────────────┬──────────────────────────────────────┘
                       │ Saves to
                       ↓
┌─────────────────────────────────────────────────────────────┐
│  GOOGLE CLOUD STORAGE                                       │
│  gs://macho-raster/risk_layers/cr_2020.tif                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ Served by
                       ↓
┌─────────────────────────────────────────────────────────────┐
│  TITILER (Cloud Run)                                        │
│  https://titiler-service-774201305430.us-central1.run.app  │
│  - Converts GeoTIFF to web tiles                           │
└──────────────────────┬──────────────────────────────────────┘
                       │ URL defined in
                       ↓
┌─────────────────────────────────────────────────────────────┐
│  src/config/layers.js  ← YOU ARE HERE                      │
│  - Defines tile URLs for all 3 layers                      │
│  - Sets colors, labels, opacity                            │
└──────────────────────┬──────────────────────────────────────┘
                       │ Passed to
                       ↓
┌─────────────────────────────────────────────────────────────┐
│  src/components/MapComponent.js                             │
│  - Uses MapLibre to load tiles                             │
│  - Displays them on the map                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ Rendered by
                       ↓
┌─────────────────────────────────────────────────────────────┐
│  YOUR BROWSER                                               │
│  - Shows 3 maps side-by-side                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔍 Component Relationships

```
App.js (Main Container)
│
├─→ MapComponent (Population)
│   ├─→ Legend (Shows population colors)
│   └─→ LayerControls (Opacity slider)
│
├─→ MapComponent (Probability)
│   ├─→ Legend (Shows probability colors)
│   └─→ LayerControls (Opacity slider)
│
└─→ MapComponent (Risk)
    ├─→ Legend (Shows risk colors)
    └─→ LayerControls (Opacity slider)
```

## 💡 Common Questions

### Q: Why are all 3 maps showing the same data?
**A**: Currently, all layers point to the same file (`cr_2020.tif`). This file was exported with visualization already applied (it's RGB). 

**To show different data**, you would need to:
1. Export 3 separate files from Earth Engine:
   - `population_2020.tif`
   - `probability_2020.tif`
   - `risk_2020.tif`
2. Update `tileUrl` in `src/config/layers.js` for each layer

### Q: How do I change the layer colors?
**A**: Edit the `legend` array in `src/config/layers.js`:
```javascript
legend: [
    { color: '#ff0000', label: 'High' },
    { color: '#00ff00', label: 'Low' }
]
```

### Q: Can I add more controls?
**A**: Yes! Edit `src/components/LayerControls.js` and add:
```javascript
<input type="checkbox" onChange={handleVisibilityChange} />
```

### Q: Where do I change the starting map position?
**A**: Edit these in `src/config/layers.js`:
```javascript
export const MAP_CENTER = [-84.15911, 9.93404];
export const MAP_ZOOM = 11;
```

## 📝 Next Steps

1. **Read**: `src/config/layers.js` - Understand your data source
2. **Experiment**: Change colors in the legend
3. **Customize**: Adjust opacity defaults
4. **Learn**: Read `src/components/MapComponent.js` to understand the map logic

## 🐛 Troubleshooting

**Maps not loading?**
- Open browser console (F12)
- Check for CORS errors
- Make sure server is running on port 8081

**Want to use the old single-file version?**
- It's backed up as `landslide-risk-map.html`
- Open it directly or with a server

## 📚 Files to Read (In Order)

1. ✅ **This file** - Overview
2. 📖 `PROJECT_STRUCTURE.md` - Detailed structure guide
3. 🎯 `src/config/layers.js` - **Where layers come from**
4. 📱 `src/App.js` - Simple layout
5. 🗺️ `src/components/MapComponent.js` - Map logic
6. 🎨 `src/styles.js` - Styling

---

**Your app is running at**: http://localhost:8081

**Old backup version**: `landslide-risk-map.html`
