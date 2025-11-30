# 🗺️ Costa Rica Landslide Risk Map

A **modular React application** using MapLibre GL JS to display 3 landslide risk layers side-by-side.

**Perfect for React beginners** - Each file is small, focused, and well-commented!

## 📋 Overview

This app displays three maps side-by-side showing different aspects of landslide risk:

1. **Population Density (Severity)** - Shows where people live (WorldPop 2020)
2. **Landslide Probability (Slope)** - Shows areas prone to landslides (terrain analysis)
3. **Total Risk** - Combines both factors (Population × Slope)

## 🚀 Quick Start

```bash
# Start a local web server
cd /Users/jinzhaowang/titiler-deploy
python3 -m http.server 8081

# Open in browser
open http://localhost:8081
```

## 📁 Project Structure (Modular & Clean!)

```
titiler-deploy/
├── index.html                          ← Start here (35 lines)
├── QUICK_START.md                      ← Read this first!
├── PROJECT_STRUCTURE.md                ← Detailed guide
└── src/
    ├── App.js                         ← Main layout (40 lines)
    ├── styles.js                      ← All CSS (180 lines)
    ├── config/
    │   ├── layers.js                  ← WHERE LAYERS COME FROM ⭐
    │   └── layers-explained.js        ← Detailed explanation
    └── components/
        ├── Legend.js                  ← Shows color meanings (30 lines)
        ├── LayerControls.js           ← Opacity slider (40 lines)
        └── MapComponent.js            ← Map logic (115 lines)
```

## 🎯 Where Do Layers Come From?

**Short answer**: Open `src/config/layers.js`

**Full flow**:
```
Your Jupyter Notebook (ee_api_colab_setup.ipynb)
    ↓ Calculates 3 layers using Earth Engine
Google Cloud Storage (gs://macho-raster/risk_layers/cr_2020.tif)
    ↓ Served by
TiTiler (https://titiler-service-774201305430.us-central1.run.app)
    ↓ Defined in
src/config/layers.js  ← YOU ARE HERE
    ↓ Loaded by
src/components/MapComponent.js
    ↓ Displayed in
Your Browser
```

## 🎯 For React Beginners: Understanding the Code

### Structure of the HTML File

The `landslide-risk-map.html` file is organized into these sections:

```
├── HTML Head (libraries and styles)
├── Body with <div id="root">
└── React Application (in <script type="text/babel">)
    ├── Configuration (LAYERS_CONFIG)
    ├── Components
    │   ├── Legend - Shows color meanings
    │   ├── LayerControls - Opacity slider
    │   ├── MapComponent - Individual map
    │   └── App - Main container
    └── Render call
```

### 🧩 Components Explained

#### 1. **LAYERS_CONFIG** (Lines ~90-140)
This is your data configuration object. Think of it as a recipe book:
```javascript
const LAYERS_CONFIG = {
    population: { /* settings for population map */ },
    probability: { /* settings for probability map */ },
    risk: { /* settings for risk map */ }
}
```

Each layer has:
- `id`: Unique name for the layer
- `title`: What users see as the header
- `description`: Brief explanation
- `tileUrl`: Where to get the map tiles from (your TiTiler service)
- `legend`: Array of colors and labels
- `defaultOpacity`: How transparent the layer starts (0 = invisible, 1 = solid)

#### 2. **Legend Component** (Lines ~150-165)
A simple component that shows what colors mean:
```javascript
function Legend({ items }) {
    // Takes an array of {color, label} objects
    // Returns colored boxes with labels
}
```

**Props (inputs)**:
- `items`: Array of legend entries

#### 3. **LayerControls Component** (Lines ~168-185)
Creates the opacity slider:
```javascript
function LayerControls({ opacity, onOpacityChange }) {
    // Shows current opacity percentage
    // Provides slider to adjust it
}
```

**Props**:
- `opacity`: Current opacity value (0-1)
- `onOpacityChange`: Function to call when user moves slider

#### 4. **MapComponent** (Lines ~188-270)
The heart of the app - creates a single map:
```javascript
function MapComponent({ config }) {
    // Sets up MapLibre map
    // Loads base map (OpenStreetMap)
    // Adds your data layer on top
    // Manages opacity changes
}
```

**Key concepts**:
- `useRef`: Creates a reference to the map container DOM element and map instance
- `useState`: Manages opacity value that can change
- `useEffect`: Runs code when component loads or updates
  - First `useEffect`: Creates the map (runs once)
  - Second `useEffect`: Updates opacity when slider moves

**Props**:
- `config`: One of the objects from LAYERS_CONFIG

#### 5. **App Component** (Lines ~273-287)
The main container that brings everything together:
```javascript
function App() {
    return (
        <header>Title</header>
        <div>
            <MapComponent for population />
            <MapComponent for probability />
            <MapComponent for risk />
        </div>
    )
}
```

### 🔄 How React Works Here

1. **Component Reusability**: We define `MapComponent` once, but use it 3 times with different configurations
2. **Props**: Data flows from parent to child (App → MapComponent → LayerControls)
3. **State**: Each map manages its own opacity independently
4. **Effects**: Maps initialize once, then respond to opacity changes

### 🎨 How the Styling Works

CSS is organized by component:
- `.app-container`: Main layout (flexbox column)
- `.maps-container`: Grid layout for 3 maps (changes to 1-2 columns on smaller screens)
- `.map-card`: Individual map styling
- `.legend`: Positioned in bottom-right of each map
- `.controls`: Positioned in top-left of each map

### 📡 How Data Flows

```
TiTiler Service (Cloud Run)
    ↓
MapLibre GL JS (loads tiles)
    ↓
MapComponent (displays)
    ↓
User sees map!
```

When opacity changes:
```
User moves slider
    ↓
onOpacityChange called
    ↓
setOpacity updates state
    ↓
useEffect detects change
    ↓
Map paint property updates
    ↓
Layer becomes more/less transparent
```

## 🚀 How to Use

### Option 1: Open directly in browser
```bash
open /Users/jinzhaowang/titiler-deploy/landslide-risk-map.html
```

### Option 2: Use a local server (recommended)
```bash
cd /Users/jinzhaowang/titiler-deploy
python3 -m http.server 8080
```
Then visit: http://localhost:8080/landslide-risk-map.html

## 🛠️ Customization Guide

### Change map center/zoom:
```javascript
const MAP_CENTER = [-84.15911, 9.93404]; // [longitude, latitude]
const MAP_ZOOM = 11;
```

### Change colors in legend:
```javascript
legend: [
    { color: 'blue', label: 'Low' },
    { color: 'red', label: 'High' }
]
```

### Adjust default transparency:
```javascript
defaultOpacity: 0.7  // 0 = invisible, 1 = solid
```

### Add more controls:
In the `LayerControls` component, add more input elements:
```javascript
<input type="checkbox" onChange={handleVisibilityChange} />
```

## 📦 Libraries Used

- **React 18**: UI framework (manages components and state)
- **MapLibre GL JS 3.6.2**: Map rendering (free, open-source alternative to Mapbox)
- **Babel Standalone**: Transforms JSX syntax in the browser

## 🔗 Data Sources

- **Population**: WorldPop 2020 for Costa Rica
- **Elevation**: NASA NASADEM
- **Processing**: Google Earth Engine
- **Serving**: TiTiler on Google Cloud Run

## 🎓 Next Steps to Learn

1. **Try changing colors** in LAYERS_CONFIG
2. **Add a new control** like a visibility toggle
3. **Experiment with CSS** to change the layout
4. **Add click events** to show popup information
5. **Create a proper React app** with `create-react-app` or Vite

## 📚 Resources

- [React Documentation](https://react.dev/learn)
- [MapLibre GL JS Docs](https://maplibre.org/maplibre-gl-js/docs/)
- [TiTiler Documentation](https://developmentseed.org/titiler/)
- [Google Earth Engine](https://earthengine.google.com/)

## 🐛 Troubleshooting

**Maps not loading?**
- Check browser console (F12) for errors
- Verify TiTiler service is running: https://titiler-service-774201305430.us-central1.run.app/
- Ensure GCS bucket is publicly readable

**Tiles not appearing?**
- Your Earth Engine export task must be completed
- Check the file exists: `gcloud storage ls gs://macho-raster/risk_layers/`

**Want to use different data?**
- Export new COG from Earth Engine to your bucket
- Update `tileUrl` in LAYERS_CONFIG to point to the new file

---

**Made with ❤️ for learning React and geospatial visualization**
