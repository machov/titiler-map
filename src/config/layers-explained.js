/**
 * ============================================================================
 * WHERE DO THE LAYERS COME FROM?
 * ============================================================================
 * 
 * This is THE most important file to understand your data!
 * 
 * STEP-BY-STEP EXPLANATION:
 * 
 * 1. You ran code in your Jupyter notebook (ee_api_colab_setup.ipynb)
 *    ├─ Loaded population data from WorldPop
 *    ├─ Calculated slope from elevation data
 *    └─ Combined them to create risk maps
 * 
 * 2. Google Earth Engine exported the result
 *    └─ Saved to: gs://macho-raster/risk_layers/cr_2020.tif
 * 
 * 3. TiTiler serves this file as web map tiles
 *    └─ URL: https://titiler-service-774201305430.us-central1.run.app
 * 
 * 4. This file (layers.js) tells MapLibre where to get the tiles
 *    └─ You're reading it now!
 * 
 * 5. MapComponent.js loads the tiles into the map
 *    └─ Your browser displays them
 * 
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION - Where your data lives
// ============================================================================

/**
 * Your TiTiler service (deployed on Google Cloud Run)
 * This converts your GeoTIFF into map tiles that browsers can display
 */
const TITILER_BASE_URL = 'https://titiler-service-774201305430.us-central1.run.app';

/**
 * Your exported data file (publicly accessible on Google Cloud Storage)
 * This is the result from your Jupyter notebook Earth Engine export
 */
const GCS_BUCKET_URL = 'https://storage.googleapis.com/macho-raster/risk_layers/cr_2020.tif';

/**
 * Build the tile URL template
 * The {z}/{x}/{y} are placeholders that MapLibre replaces with actual tile coordinates
 * 
 * Example final URL:
 * https://titiler-service-774201305430.us-central1.run.app/cog/tiles/WebMercatorQuad/12/1234/5678?url=https://storage.googleapis.com/macho-raster/risk_layers/cr_2020.tif
 */
const buildTileUrl = () => {
    return `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=${GCS_BUCKET_URL}`;
};

// ============================================================================
// LAYER DEFINITIONS - What each map shows
// ============================================================================

/**
 * LAYERS_CONFIG - This object defines all 3 maps
 * 
 * Each layer has:
 * - id: Unique identifier for MapLibre
 * - title: What users see as the map title
 * - description: Brief explanation
 * - tileUrl: Where to get the map tiles (from TiTiler)
 * - legend: Array of colors and what they mean
 * - defaultOpacity: How transparent the layer starts (0 = invisible, 1 = solid)
 */
export const LAYERS_CONFIG = {
    /**
     * LAYER 1: POPULATION DENSITY (SEVERITY)
     * 
     * What it shows:
     * - Where people live in Costa Rica
     * - Higher population = higher potential impact if landslide occurs
     * 
     * Data source:
     * - WorldPop 2020 dataset
     * - Filtered for Costa Rica ('CRI')
     * 
     * From your notebook code:
     * ```python
     * dataset = ee.ImageCollection('WorldPop/POP')
     * filtered = dataset.filter(ee.Filter.eq('year', 2020))
     * pop_cr = filtered.first().select('population').clip(aoi)
     * ```
     */
    population: {
        id: 'population-density',
        title: 'Population Density (Severity)',
        description: 'WorldPop 2020 data for Costa Rica',
        tileUrl: buildTileUrl(),
        
        // Colors from your notebook: ['24126c', '1fff4f', 'd4ff50']
        legend: [
            { color: '#24126c', label: 'Very Low' },
            { color: '#1fff4f', label: 'Medium' },
            { color: '#d4ff50', label: 'High' }
        ],
        defaultOpacity: 0.7
    },
    
    /**
     * LAYER 2: ELEVATION
     * 
     * What it shows:
     * - Terrain elevation from NASA NASADEM
     * - Higher elevation shown in warmer colors
     * 
     * Data source:
     * - NASA NASADEM elevation data
     * 
     * From your notebook code:
     * ```python
     * elevation = ee.Image('NASA/NASADEM_HGT/001').select('elevation')
     * ```
     */
    elevation: {
        id: 'elevation',
        title: 'Elevation',
        description: 'NASA NASADEM elevation data',
        tileUrl: buildTileUrl(),
        
        // Simple traffic light colors for elevation
        legend: [
            { color: 'green', label: 'Low' },
            { color: 'yellow', label: 'Medium' },
            { color: 'red', label: 'High' }
        ],
        defaultOpacity: 0.7
    },
    
    /**
     * LAYER 3: TOTAL RISK
     * 
     * What it shows:
     * - COMBINED risk = Population × Landslide Probability
     * - Shows where landslides would have the most impact
     * 
     * Formula from your notebook:
     * ```python
     * normalized_pop = pop_cr.divide(1000).min(1)  # Scale 0-1
     * landslide_probability = slope_image.divide(45).min(1)  # Scale 0-1
     * risk_image = normalized_pop.multiply(landslide_probability)
     * ```
     * 
     * Interpretation:
     * - High population + High slope = HIGH RISK (red/darkred)
     * - High population + Low slope = Medium risk
     * - Low population + High slope = Medium risk
     * - Low population + Low slope = Low risk (white/blue)
     */
    risk: {
        id: 'total-risk',
        title: 'Total Landslide Risk',
        description: 'Combined risk: Population × Slope',
        tileUrl: buildTileUrl(),
        
        // Colors from your notebook: ['white', 'blue', 'orange', 'red', 'darkred']
        legend: [
            { color: 'white', label: 'Minimal' },
            { color: 'blue', label: 'Low' },
            { color: 'orange', label: 'Medium' },
            { color: 'red', label: 'High' },
            { color: 'darkred', label: 'Critical' }
        ],
        defaultOpacity: 0.8
    }
};

// ============================================================================
// MAP SETTINGS - Starting view
// ============================================================================

/**
 * Map center coordinates
 * From your notebook: ee.Geometry.Point([-84.15911, 9.93404])
 * This is in Costa Rica (San Jose & Escazu area)
 */
export const MAP_CENTER = [-84.15911, 9.93404]; // [longitude, latitude]

/**
 * Initial zoom level
 * 11 = City level view
 * Increase for closer view, decrease for broader view
 */
export const MAP_ZOOM = 11;

// ============================================================================
// IMPORTANT NOTES
// ============================================================================

/**
 * Q: Why do all 3 maps look the same?
 * A: Currently, all layers use the same GeoTIFF file (cr_2020.tif) which was
 *    exported with visualization already applied (RGB image). The file shows
 *    the final risk visualization.
 * 
 * Q: How do I show different data for each map?
 * A: You need to export 3 separate files from Earth Engine:
 *    1. Export population layer as population_2020.tif
 *    2. Export probability layer as probability_2020.tif
 *    3. Export risk layer as risk_2020.tif
 *    Then update the tileUrl for each layer above.
 * 
 * Q: Can I use different color schemes?
 * A: Yes! Just change the legend colors above. You can also tell TiTiler
 *    to apply colors by adding parameters to the URL:
 *    `${TITILER_BASE_URL}/cog/tiles/{z}/{x}/{y}?url=${GCS_BUCKET_URL}&colormap=viridis`
 * 
 * Q: Where is this data coming from again?
 * A: Jupyter Notebook → Earth Engine → GCS → TiTiler → Your Browser
 */
