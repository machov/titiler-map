/**
 * MAP COMPONENT
 * 
 * This is the main map display component. It:
 * 1. Creates a MapLibre map instance
 * 2. Loads OpenStreetMap as the base layer
 * 3. Adds your data layer from TiTiler on top
 * 4. Manages opacity changes
 * 
 * Props:
 *   - config: Layer configuration object from layers.js
 * 
 * How it works:
 * - useRef: Holds references to the DOM element and map instance
 * - useState: Tracks opacity value that can change
 * - useEffect #1: Runs once to initialize the map
 * - useEffect #2: Runs when opacity changes to update the map
 */

const { useState, useEffect, useRef } = React;

function MapComponent({ config }) {
    // References - these persist across re-renders
    const mapContainer = useRef(null);  // The <div> that holds the map
    const map = useRef(null);           // The MapLibre map instance
    
    // State - when this changes, component re-renders
    const [opacity, setOpacity] = useState(config.defaultOpacity);

    // Effect 1: Initialize map (runs once)
    useEffect(() => {
        if (map.current) return; // Already initialized

        // Create the map
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: {
                version: 8,
                sources: {
                    'osm': {
                        type: 'raster',
                        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                        tileSize: 256,
                        attribution: '© OpenStreetMap contributors'
                    }
                },
                layers: [{
                    id: 'osm',
                    type: 'raster',
                    source: 'osm'
                }]
            },
            center: MAP_CENTER,
            zoom: MAP_ZOOM
        });

        // Add navigation controls (zoom buttons)
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        // When map finishes loading, add your data layer
        map.current.on('load', () => {
            // Add the data source (tiles from TiTiler)
            map.current.addSource(config.id, {
                type: 'raster',
                tiles: [config.tileUrl],
                tileSize: 256
            });

            // Add the layer that displays the source
            map.current.addLayer({
                id: `${config.id}-layer`,
                type: 'raster',
                source: config.id,
                paint: {
                    'raster-opacity': config.defaultOpacity
                }
            });
        });

        // Cleanup when component unmounts
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []); // Empty array = run once

    // Effect 2: Update opacity when it changes
    useEffect(() => {
        if (map.current && map.current.getLayer(`${config.id}-layer`)) {
            map.current.setPaintProperty(
                `${config.id}-layer`,
                'raster-opacity',
                opacity
            );
        }
    }, [opacity, config.id]); // Run when opacity or config.id changes

    // Render the component
    return (
        <div className="map-card">
            <div className="map-card-header">
                <h3>{config.title}</h3>
                <p>{config.description}</p>
            </div>
            <div className="map-container">
                <div ref={mapContainer} className="map" />
                <Legend items={config.legend} />
                <LayerControls 
                    opacity={opacity} 
                    onOpacityChange={setOpacity} 
                />
            </div>
        </div>
    );
}
