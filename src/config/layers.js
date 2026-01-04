/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🗺️  LANDSLIDE RISK ASSESSMENT - LAYER CONFIGURATIONS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * RISK CALCULATION METHODOLOGY
 * ────────────────────────────────────────────────────────────────────────────
 * 
 * This visualization implements a fundamental risk assessment formula:
 * 
 *     🎯 TOTAL RISK = SEVERITY × PROBABILITY
 * 
 * Where:
 *   • SEVERITY (Population Density): The potential impact if a landslide occurs
 *     - Higher population = Higher severity
 *     - Normalized: 0 (uninhabited) to 1 (max density)
 *     
 *   • PROBABILITY (Landslide Susceptibility): The likelihood of a landslide
 *     - Based on terrain slope (steeper = higher probability)
 *     - Formula: min(slope_degrees / 45°, 1.0)
 *     - Normalized: 0 (flat) to 1 (very steep)
 *     
 *   • RISK: Combined measure (0 to 1 scale)
 *     - 0 = No risk (no people OR flat terrain)
 *     - 1 = Maximum risk (high population AND steep slopes)
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * DATA NORMALIZATION
 * ────────────────────────────────────────────────────────────────────────────
 * 
 * Population Normalization:
 *   normalized_pop = min(population / MAX_POP_VALUE, 1.0)
 *   where MAX_POP_VALUE = 200 people per pixel
 * 
 * Slope-Based Probability:
 *   landslide_probability = min(slope_degrees / 45°, 1.0)
 *   (Assumes 45° as maximum relevant slope angle)
 * 
 * Final Risk Score:
 *   total_risk = normalized_pop × landslide_probability
 * 
 * ────────────────────────────────────────────────────────────────────────────
 * DATA SOURCES
 * ────────────────────────────────────────────────────────────────────────────
 * 
 * 1. Population: WorldPop 2020 (1km resolution)
 * 2. Elevation: Copernicus DEM 30m / NASA NASADEM
 * 3. Processing: Google Earth Engine
 * 4. Serving: TiTiler (Cloud Optimized GeoTIFFs)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Your TiTiler service URL (deployed on Google Cloud Run)
const TITILER_BASE_URL = 'https://titiler-service-774201305430.us-central1.run.app';

// Layer configurations
const LAYERS_CONFIG = {
    // Layer 1: Population Density
    // Uses WorldPop 2020 Costa Rica data (1km resolution, ~82 people/pixel average)
    // Matches your Python: dataset.filter(ee.Filter.eq('year', 2020), ee.Filter.eq('country', 'CRI'))
    // Data shows max ~10,952 people per 1km² pixel
    population: {
        id: 'population-density',
        title: 'Population Density (Severity)',
        description: 'WorldPop 2020 - 30m resolution (people per pixel)',
        // Using TiTiler's ability to serve public datasets
        // WorldPop data is available as a public Cloud Optimized GeoTIFF
        // Rescale to 0-1000 to show more detail in populated areas
        tileUrl: `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://data.worldpop.org/GIS/Population/Global_2000_2020_1km_UNadj/2020/CRI/cri_ppp_2020_1km_Aggregated_UNadj.tif&rescale=0,1000&colormap_name=viridis`,
        attribution: 'WorldPop (www.worldpop.org)',
        legend: [
            { color: '#440154', label: 'Uninhabited (0 people)' },
            { color: '#3b528b', label: 'Rural (1-50 people/km²)' },
            { color: '#21918c', label: 'Low Density (50-200 people/km²)' },
            { color: '#5ec962', label: 'Medium (200-500 people/km²)' },
            { color: '#fde724', label: 'Urban (500-1000 people/km²)' },
            { color: '#ffff00', label: 'Dense Urban (1000+ people/km²)' }
        ],
        defaultOpacity: 0.8
    },
    
    // Layer 2: Elevation
    // Uses Copernicus DEM 30m elevation data (public dataset via AWS)
    // Similar to your Python: ee.Image('NASA/NASADEM_HGT/001').select('elevation')
    // Copernicus DEM is the successor to SRTM with better accuracy
    elevation: {
        id: 'elevation',
        title: 'Elevation',
        description: 'Copernicus DEM 30m (meters above sea level) for reference',
        // Using public Copernicus DEM from AWS Open Data
        // This tile covers N09-N10, W085-W084 (Costa Rica area)
        tileUrl: `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N09_00_W085_00_DEM/Copernicus_DSM_COG_10_N09_00_W085_00_DEM.tif&rescale=0,3500&colormap_name=terrain`,
        attribution: 'Copernicus DEM © European Space Agency',
        legend: [
            { color: '#267300', label: 'Sea Level (0-200m)' },
            { color: '#a8c58d', label: 'Low (200-800m)' },
            { color: '#e1b87f', label: 'Medium (800-1500m)' },
            { color: '#bd925a', label: 'High (1500-2500m)' },
            { color: '#c9c9c9', label: 'Very High (2500-3500m)' },
            { color: '#feffff', label: 'Peak (3500m+)' }
        ],
        defaultOpacity: 0.8
    },
    
    // Layer 3: Total Risk (from your TiTiler export)
    // This COMBINES population + slope analysis from your notebook
    risk: {
        id: 'total-risk',
        title: 'Total Landslide Risk',
        description: 'Combined risk: Population × Slope',
        // Updated to match Earth Engine export: fileNamePrefix='risk_layers/bigcities_2020'
        tileUrl: `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://storage.googleapis.com/macho-raster/risk_layers/cr_2020.tif`,
        attribution: 'Processed via Google Earth Engine & TiTiler',
        legend: [
            { color: 'white', label: 'Minimal' },
            { color: 'blue', label: 'Low' },
            { color: 'orange', label: 'Medium' },
            { color: 'red', label: 'High' },
            { color: 'darkred', label: 'Critical' }
        ],
        defaultOpacity: 0.9
    }
};

// Default map position (Escazú/San José, Costa Rica - centered on urban core)
const DEFAULT_MAP_CENTER = [-84.1400, 9.9200];  // Closer to Escazú area
const DEFAULT_MAP_ZOOM = 12;  // Zoomed in closer

// Aliases for backward compatibility
const MAP_CENTER = DEFAULT_MAP_CENTER;
const MAP_ZOOM = DEFAULT_MAP_ZOOM;

// Note: Variables are globally available in browser context (no export needed)
