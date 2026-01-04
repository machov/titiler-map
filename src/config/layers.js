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

// Layer configurations
const LAYERS_CONFIG = {
    // Layer 1: Population Density
    // Uses your Earth Engine exported population data (all 43 cities)
    // VRT mosaics 324 tiles from Earth Engine export
    population: {
        id: 'population-density',
        title: 'Population Density (Severity)',
        description: 'Population 2020 - 30m resolution (all 43 cities)',
        // TEMPORARY: Using first tile only for testing
        // TODO: VRT approach needs TiTiler configuration changes
        tileUrl: `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://storage.googleapis.com/macho-raster/risk_layers/popimage_20200000000000-0000000000.tif&rescale=0,5000&colormap_name=viridis`,
        attribution: 'Processed via Google Earth Engine & TiTiler',
        legend: [
            { color: '#440154', label: 'Uninhabited (0 people)' },
            { color: '#3b528b', label: 'Rural (1-50 people/km²)' },
            { color: '#21918c', label: 'Low Density (50-200 people/km²)' },
            { color: '#5ec962', label: 'Medium (200-500 people/km²)' },
            { color: '#fde724', label: 'Urban (500-1000 people/km²)' },
            { color: '#ffff00', label: 'Dense Urban (1000+ people/km²)' }
        ],
        defaultOpacity: 0.7
    },
    
    // Layer 2: Landslide Probability (Susceptibility)
    // Uses your Earth Engine landslide probability calculation (all 43 cities)
    // VRT mosaics 324 tiles from Earth Engine export
    landslide_prob_bigcities_2020: {
        id: 'landslide_prob_bigcities_2020',
        title: 'Landslide Probability',
        description: 'Landslide susceptibility based on slope - 30m resolution (all 43 cities)',
        // TEMPORARY: Using first tile only for testing
        // TODO: VRT approach needs TiTiler configuration changes
        tileUrl: `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://storage.googleapis.com/macho-raster/risk_layers/landslide_prob_bigcities_20200000000000-0000000000.tif&rescale=0,1&colormap_name=terrain`,
        attribution: 'Processed via Google Earth Engine & TiTiler',
        legend: [
            { color: '#267300', label: 'Sea Level (0-200m)' },
            { color: '#a8c58d', label: 'Low (200-800m)' },
            { color: '#e1b87f', label: 'Medium (800-1500m)' },
            { color: '#bd925a', label: 'High (1500-2500m)' },
            { color: '#c9c9c9', label: 'Very High (2500-3500m)' },
            { color: '#feffff', label: 'Peak (3500m+)' }
        ],
        defaultOpacity: 0.7
    },
    
    // Layer 3: Total Risk (from your TiTiler export)
    // This COMBINES population + slope analysis from your notebook
    // Uses VRT file to mosaic all 324 tiles into a seamless layer
    risk: {
        id: 'total-risk',
        title: 'Total Landslide Risk',
        description: 'Combined risk: Population × Slope (all 43 cities)',
        // TEMPORARY: Using first tile only for testing  
        // TODO: VRT approach needs TiTiler configuration changes
        tileUrl: `${TITILER_BASE_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://storage.googleapis.com/macho-raster/risk_layers/bigcities_20200000000000-0000000000.tif&rescale=0,255&colormap_name=reds`,
        attribution: 'Processed via Google Earth Engine & TiTiler',
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

// Default map position (San Jose, Costa Rica)
const DEFAULT_MAP_CENTER = [-84.0796144, 9.9327707];
const DEFAULT_MAP_ZOOM = 11;

// Note: Variables are globally available in browser context (no export needed)
