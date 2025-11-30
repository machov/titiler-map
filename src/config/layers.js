/**
 * LAYER CONFIGURATIONS
 * 
 * This file defines all three layers from your Jupyter notebook:
 * 1. Population Density - Where people live (from WorldPop)
 * 2. Landslide Probability - Based on slope/terrain
 * 3. Total Risk - Combination of both
 * 
 * Each layer comes from your TiTiler service which serves the 
 * Cloud Optimized GeoTIFF you exported from Google Earth Engine
 */

// Your TiTiler service URL (deployed on Google Cloud Run)
const TITILER_BASE_URL = 'https://titiler-service-774201305430.us-central1.run.app';

// Your GCS bucket with the exported data
const GCS_BUCKET_URL = 'https://storage.googleapis.com/macho-raster/risk_layers/cr_2020.tif';

// Build the tile URL for MapLibre
const buildTileUrl = () => {
    return `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=${GCS_BUCKET_URL}`;
};

// Layer configurations
const LAYERS_CONFIG = {
    // Layer 1: Population Density (Severity)
    // This shows WHERE people live - high population = high potential impact
    population: {
        id: 'population-density',
        title: 'Population Density (Severity)',
        description: 'WorldPop 2020 data for Costa Rica',
        tileUrl: buildTileUrl(),
        legend: [
            { color: '#24126c', label: 'Very Low' },
            { color: '#1fff4f', label: 'Medium' },
            { color: '#d4ff50', label: 'High' }
        ],
        defaultOpacity: 0.7
    },
    
    // Layer 2: Elevation
    // This shows the terrain elevation from NASA NASADEM
    elevation: {
        id: 'elevation',
        title: 'Elevation',
        description: 'NASA NASADEM elevation data',
        tileUrl: buildTileUrl(),
        legend: [
            { color: 'green', label: 'Low' },
            { color: 'yellow', label: 'Medium' },
            { color: 'red', label: 'High' }
        ],
        defaultOpacity: 0.7
    },
    
    // Layer 3: Total Risk
    // This COMBINES population + probability = overall risk
    // Formula from notebook: normalized_pop × landslide_probability
    risk: {
        id: 'total-risk',
        title: 'Total Landslide Risk',
        description: 'Combined risk: Population × Slope',
        tileUrl: buildTileUrl(),
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

// Map starting position (Costa Rica study area from your notebook)
const MAP_CENTER = [-84.15911, 9.93404];
const MAP_ZOOM = 11;
