/**
 * MAIN APP COMPONENT
 * 
 * This is the top-level component that brings everything together.
 * It creates three maps side-by-side, one for each layer.
 * 
 * Data flow:
 * 1. Import layer configs from layers.js
 * 2. Pass each config to a MapComponent
 * 3. Each MapComponent renders independently
 */

function App() {
    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <h1>🗺️ Costa Rica Landslide Risk Analysis</h1>
                <p>Side-by-side comparison of Population Density, Landslide Probability, and Total Risk</p>
            </header>
            
            {/* Three Maps */}
            <div className="maps-container">
                {/* Map 1: Population Density */}
                <MapComponent config={LAYERS_CONFIG.population} />
                
                {/* Map 2: Landslide Probability */}
                <MapComponent config={LAYERS_CONFIG.landslide_prob_bigcities_2020} />
                
                {/* Map 3: Total Risk */}
                <MapComponent config={LAYERS_CONFIG.risk} />
            </div>
        </div>
    );
}
