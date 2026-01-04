# 🗺️ Costa Rica Landslide Risk Analysis

## Overview

This project visualizes landslide risk in San José, Costa Rica by combining population density data with terrain slope analysis.

---

## 🎯 Risk Calculation Methodology

### Fundamental Formula

```
TOTAL RISK = SEVERITY × PROBABILITY
```

Where:
- **SEVERITY** = Population Density (impact if landslide occurs)
- **PROBABILITY** = Landslide Susceptibility (based on terrain slope)
- **RISK** = Combined threat level (0 to 1 scale)

### Data Normalization

1. **Population Normalization (SEVERITY)**
   ```
   normalized_population = min(population_density / 200, 1.0)
   ```
   - Range: 0 (uninhabited) → 1 (maximum density)
   - Threshold: 200 people per pixel

2. **Slope-Based Probability (SUSCEPTIBILITY)**
   ```
   landslide_probability = min(slope_degrees / 45°, 1.0)
   ```
   - Range: 0 (flat) → 1 (very steep)
   - Reference: 45° = critical slope angle

3. **Final Risk Score**
   ```
   total_risk = normalized_population × landslide_probability
   ```
   - Range: 0 (no risk) → 1 (critical risk)

---

## 🌊 Why River Valleys Show Highest Risk

### The Convergence of Two Critical Factors

The darkest red areas on our risk map concentrate around rivers and valleys in San José. This pattern reveals a fundamental truth about urban development and natural hazards:

### 🏘️ Factor 1: High Population Concentration

**Why people settle in river valleys:**

1. **Water Access**
   - Rivers provide essential drinking water
   - Irrigation for agriculture
   - Industrial water supply

2. **Fertile Agricultural Land**
   - Valley floors accumulate nutrient-rich sediments
   - Ideal for farming and food production
   - Historically attracted settlements

3. **Transportation Routes**
   - Rivers served as natural highways for trade
   - Easier terrain for roads and infrastructure
   - Connected communities

4. **Flat Building Sites**
   - Valley bottoms are easier and cheaper to develop
   - Less grading and foundation work required
   - More suitable for large-scale construction

5. **Historical Development**
   - San José grew along the río Virilla and río Torres valleys
   - Urban expansion followed these natural corridors
   - Infrastructure concentrated in these areas

**Result:** Dense population clusters in valley floors and lower slopes

---

### ⛰️ Factor 2: Steep Valley Slopes

**Why valleys create dangerous terrain:**

1. **V-Shaped Valley Formation**
   - Rivers cut deep channels through mountains over millennia
   - Creates steep hillsides on both sides of the river
   - Erosion continuously steepens slopes

2. **Ongoing Erosion**
   - Water undermines hillside stability
   - Removes supporting material from slope bases
   - Weakens soil cohesion

3. **Gravity's Role**
   - Steep slopes (>30°) experience high gravitational stress
   - Material constantly pulled downward
   - Natural instability increases with slope angle

4. **Urban Expansion Pressure**
   - As cities grow, flat land becomes scarce and expensive
   - Poor communities forced onto marginal hillside land
   - Construction removes stabilizing vegetation
   - Infrastructure adds weight to unstable slopes

5. **Topographic Reality**
   - Costa Rica's volcanic mountains create naturally steep terrain
   - San José sits in a valley with slopes exceeding 30-45°
   - Limited flat land for growing population

**Result:** Steep, unstable slopes immediately adjacent to populated areas

---

### ⚠️ The Perfect Storm = Maximum Risk

**Mathematical Result:**
```
High Population (0.8-1.0) × Steep Slopes (0.7-1.0) = Critical Risk (0.56-1.0)
```

**Real-World Translation:**

When dense populations occupy steep valley slopes, the multiplication effect creates the **highest possible risk scores** (dark red areas approaching 1.0 on our map).

**Specific Example: San José Metropolitan Area**

Informal settlements often expand onto the steep hillsides flanking the río Virilla and río Torres. These areas show as **critical risk (dark red)** because they combine:

- ✅ **High Severity:** 500-1000+ people per km² (normalized: 0.8-1.0)
- ✅ **High Probability:** Slopes of 30-45° (normalized: 0.67-1.0)
- ✅ **Erosion Factor:** Proximity to rivers increases instability
- ✅ **Infrastructure Stress:** Roads and buildings destabilize slopes

**Risk Score Calculation Example:**
```
Population: 800 people/km² → 800/200 = 1.0 (capped severity)
Slope: 35° → 35/45 = 0.78 (high probability)
Total Risk = 1.0 × 0.78 = 0.78 (HIGH to CRITICAL)
```

---

## 📊 Risk Map Interpretation

### Color Scale

| Color | Risk Level | Score Range | Interpretation |
|-------|-----------|-------------|----------------|
| ⚪ White | Minimal | 0.0 - 0.1 | Uninhabited or flat terrain |
| 🔵 Blue | Low | 0.1 - 0.3 | Sparse population or gentle slopes |
| 🟠 Orange | Moderate | 0.3 - 0.5 | Moderate population and slopes |
| 🔴 Red | High | 0.5 - 0.7 | Dense population on steep terrain |
| 🔴 Dark Red | Critical | 0.7 - 1.0 | Maximum risk - immediate concern |

### What the Map Shows

- **Dark Red Concentrations:** River valleys with dense settlements on steep slopes
- **Blue Areas:** Either low population OR flat terrain (multiplication gives low result)
- **White Areas:** No population OR completely flat (one factor is zero = no risk)

---

## 🗂️ Data Sources

### Population Data
- **Source:** WorldPop 2020
- **Resolution:** 1km (resampled to 30m for analysis)
- **Coverage:** Costa Rica
- **URL:** https://www.worldpop.org/

### Elevation Data
- **Source:** Copernicus DEM 30m / NASA NASADEM
- **Resolution:** 30 meters
- **Coverage:** Global
- **Derived:** Slope calculated from elevation model

### Processing
- **Platform:** Google Earth Engine
- **Export Format:** Cloud Optimized GeoTIFF (COG)
- **Coordinate System:** EPSG:3857 (Web Mercator)

### Visualization
- **Server:** TiTiler (Cloud Run deployment)
- **Frontend:** MapLibre GL JS
- **Bucket:** Google Cloud Storage (gs://macho-raster/risk_layers/)

---

## 📍 Study Area

**Location:** San José, Costa Rica  
**Coordinates:** 9.9328°N, 84.0796°W  
**Elevation:** ~1,200m above sea level  
**Setting:** Central Valley (Valle Central)  
**Rivers:** Río Virilla, Río Torres, Río María Aguilar  

**Why This Location:**
- Capital and largest city of Costa Rica
- Population: ~340,000 (city), ~2.2M (metro area)
- Mountainous terrain with steep slopes
- Rapid urban expansion onto marginal hillside land
- Historical landslide incidents documented
- Representative of challenges facing many Central American cities

---

## 📁 Files

- `cr_2020.tif` - Risk assessment GeoTIFF (stored in GCS)
- `cr_2020_preview.png` - Fixed image export of the risk map
- `src/config/layers.js` - Layer configuration and methodology documentation
- `src/App.js` - Interactive visualization with explanation panel
- `index.html` - Main application entry point

---

## 🚀 Running the Application

1. Start a local web server:
   ```bash
   python3 -m http.server 8080
   ```

2. Open browser:
   ```
   http://localhost:8080
   ```

3. Click "ℹ️ How Risk is Calculated" to see the full methodology explanation

---

## 📖 Citation

If you use this analysis or visualization, please cite:

**Data Sources:**
- WorldPop (www.worldpop.org - School of Geography and Environmental Science, University of Southampton)
- Copernicus DEM (© European Space Agency)
- NASA NASADEM

**Methodology:**
- Risk = Severity × Probability (standard risk assessment formula)
- Normalization approach based on empirical thresholds

---

## ⚖️ Disclaimer

This risk assessment is intended for educational and planning purposes. It should not be used as the sole basis for critical safety decisions. Professional geotechnical assessment is required for site-specific hazard evaluation.

---

## 📧 Contact

For questions about the methodology or data processing, please refer to the documentation in `src/config/layers.js` or the interactive explanation panel in the web application.

---

**Generated:** January 2026  
**Version:** 1.0  
**Platform:** TiTiler + Google Earth Engine + MapLibre GL JS
