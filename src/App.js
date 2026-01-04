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

const { useState } = React;

function App() {
    const [showInfo, setShowInfo] = useState(false);
    const [showFinalOutput, setShowFinalOutput] = useState(false);

    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <h1>🗺️ San Jose Landslide Risk Analysis</h1>
                <p>Side-by-side comparison of Population Density, Elevation, and Total Risk</p>
                <p style={{ fontSize: '12px', color: '#ffffff', marginTop: '5px' }}>
                    Part of <a href="https://30daymapchallenge.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>#30DayMapChallenge</a> - Raster category
                </p>
                <p style={{ fontSize: '12px', color: '#ffffff', marginTop: '5px' }}>
                    Follow me on <a href="https://github.com/machov" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>GitHub @machov</a>
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
                    <button 
                        className="info-button"
                        onClick={() => setShowInfo(!showInfo)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        {showInfo ? '✕ Hide Info' : 'ℹ️ How Risk is Calculated'}
                    </button>
                    <button 
                        className="output-button"
                        onClick={() => setShowFinalOutput(!showFinalOutput)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        {showFinalOutput ? '✕ Hide Output' : '🖼️ View Final Risk Map'}
                    </button>
                </div>
            </header>

            {/* Final Output Panel */}
            {showFinalOutput && (
                <div className="final-output-panel" style={{
                    backgroundColor: '#1a1a1a',
                    padding: '20px',
                    margin: '0 20px 20px 20px',
                    borderRadius: '8px',
                    border: '3px solid #f44336',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}>
                    <h2 style={{ marginTop: 0, color: '#ffffff', borderBottom: '3px solid #f44336', paddingBottom: '10px', textAlign: 'center' }}>
                        🎯 Final Risk Assessment Map - San José, Costa Rica
                    </h2>
                    
                    {/* Image Display */}
                    <div style={{ 
                        backgroundColor: '#ffffff', 
                        padding: '20px', 
                        borderRadius: '8px', 
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img 
                            src="./cr_2020_preview.png" 
                            alt="Costa Rica Landslide Risk Map" 
                            style={{ 
                                maxWidth: '100%', 
                                height: 'auto',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }}
                        />
                    </div>

                    {/* Explanation */}
                    <div style={{ color: '#ffffff', fontSize: '16px', lineHeight: '1.8' }}>
                        <div style={{ backgroundColor: '#2d2d2d', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '2px solid #ff6f00' }}>
                            <h3 style={{ margin: '0 0 15px 0', color: '#ff6f00', fontSize: '22px' }}>
                                🌊 Why River Valleys Show the Highest Risk (Dark Areas)
                            </h3>
                            <p style={{ margin: '10px 0', fontSize: '17px', fontWeight: 'bold', color: '#ffeb3b' }}>
                                The darkest red concentrations on this map are NOT random—they follow a clear pattern along rivers and valleys. Here's the science behind it:
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            {/* Factor 1 */}
                            <div style={{ backgroundColor: '#ff9800', padding: '20px', borderRadius: '8px', color: '#000' }}>
                                <h4 style={{ margin: '0 0 12px 0', fontSize: '20px', borderBottom: '2px solid #000', paddingBottom: '8px' }}>
                                    🏘️ FACTOR 1: Highest Population Density
                                </h4>
                                <p style={{ margin: '10px 0', fontWeight: 'bold' }}>Why people cluster in river valleys:</p>
                                <ul style={{ margin: '10px 0', paddingLeft: '20px', lineHeight: '1.6' }}>
                                    <li><strong>Water Access:</strong> Rivers provide drinking water, irrigation, and sanitation</li>
                                    <li><strong>Fertile Land:</strong> Valley floors have nutrient-rich soil perfect for agriculture</li>
                                    <li><strong>Transportation:</strong> Rivers = natural highways for trade and commerce</li>
                                    <li><strong>Flat Building Sites:</strong> Valley bottoms are easier and cheaper to develop</li>
                                    <li><strong>Historical Pattern:</strong> San José grew along río Virilla and río Torres valleys</li>
                                </ul>
                                <p style={{ margin: '15px 0 5px 0', padding: '10px', backgroundColor: '#fff3e0', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px' }}>
                                    📊 Result: Population density of 800-1000+ people/km² in valley areas
                                    <br/>→ Severity Score: <span style={{ color: '#d84315' }}>0.8-1.0 (MAXIMUM)</span>
                                </p>
                            </div>

                            {/* Factor 2 */}
                            <div style={{ backgroundColor: '#2196f3', padding: '20px', borderRadius: '8px', color: '#fff' }}>
                                <h4 style={{ margin: '0 0 12px 0', fontSize: '20px', borderBottom: '2px solid #fff', paddingBottom: '8px' }}>
                                    ⛰️ FACTOR 2: Steepest Slopes
                                </h4>
                                <p style={{ margin: '10px 0', fontWeight: 'bold' }}>Why valleys create dangerous terrain:</p>
                                <ul style={{ margin: '10px 0', paddingLeft: '20px', lineHeight: '1.6' }}>
                                    <li><strong>V-Shaped Valleys:</strong> Rivers cut deep channels creating steep walls on both sides</li>
                                    <li><strong>Continuous Erosion:</strong> Water undermines hillside stability year after year</li>
                                    <li><strong>Gravity Effect:</strong> Slopes &gt;30° experience extreme gravitational stress</li>
                                    <li><strong>Urban Pressure:</strong> As cities grow, poor families build on unstable hillsides</li>
                                    <li><strong>Costa Rica Geology:</strong> Volcanic mountains create naturally steep terrain</li>
                                </ul>
                                <p style={{ margin: '15px 0 5px 0', padding: '10px', backgroundColor: '#1565c0', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px' }}>
                                    📊 Result: Valley slopes of 30-45° or steeper
                                    <br/>→ Probability Score: <span style={{ color: '#ffeb3b' }}>0.7-1.0 (VERY HIGH)</span>
                                </p>
                            </div>
                        </div>

                        {/* The Perfect Storm */}
                        <div style={{ backgroundColor: '#b71c1c', padding: '20px', borderRadius: '8px', border: '3px solid #ff5252' }}>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '22px', color: '#ffeb3b', textAlign: 'center' }}>
                                ⚠️ THE MULTIPLICATION EFFECT = CRITICAL RISK
                            </h4>
                            <div style={{ backgroundColor: '#d32f2f', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
                                <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>
                                    RISK = SEVERITY × PROBABILITY
                                </p>
                                <p style={{ margin: '10px 0 0 0', fontSize: '18px', textAlign: 'center', color: '#ffeb3b' }}>
                                    1.0 (max population) × 0.8 (steep slope) = <span style={{ fontSize: '24px' }}>0.8</span> CRITICAL
                                </p>
                            </div>
                            <p style={{ margin: '15px 0', fontSize: '16px', lineHeight: '1.7' }}>
                                <strong>What You See on the Map:</strong> The darkest red (almost black) areas show where BOTH factors reach maximum values simultaneously. These are informal settlements (precarious neighborhoods) built on steep hillsides directly above rivers.
                            </p>
                            <div style={{ backgroundColor: '#ff5252', padding: '15px', borderRadius: '6px', color: '#000' }}>
                                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '17px' }}>Real-World Example: San José Hillside Settlements</p>
                                <ul style={{ margin: '5px 0', paddingLeft: '20px', lineHeight: '1.6' }}>
                                    <li><strong>Location:</strong> Steep slopes flanking río Virilla and río Torres</li>
                                    <li><strong>Population:</strong> Dense informal settlements (800-1000+ people/km²)</li>
                                    <li><strong>Terrain:</strong> Slopes exceeding 35° (approaching maximum)</li>
                                    <li><strong>Risk Score:</strong> 0.7-1.0 = <strong>CRITICAL - Immediate Attention Required</strong></li>
                                    <li><strong>Why They Settle There:</strong> Affordable/free land near jobs + water, despite danger</li>
                                </ul>
                            </div>
                        </div>

                        {/* Key Insight */}
                        <div style={{ backgroundColor: '#37474f', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '2px solid #80deea' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#80deea', fontSize: '18px' }}>💡 Key Insight</h4>
                            <p style={{ margin: '10px 0', fontSize: '16px', lineHeight: '1.7' }}>
                                This map proves that <strong style={{ color: '#ffeb3b' }}>geography is NOT destiny, but geography + poverty = disaster</strong>. 
                                The highest risk areas exist where economic pressure forces vulnerable populations onto inherently dangerous terrain. 
                                The rivers that historically attracted settlement now mark the zones of greatest hazard.
                            </p>
                        </div>

                        {/* Land Occupation Context */}
                        <div style={{ backgroundColor: '#424242', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '2px solid #ffa726' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#ffa726', fontSize: '18px' }}>🏚️ Land Occupation Context</h4>
                            <p style={{ margin: '10px 0', fontSize: '16px', lineHeight: '1.7' }}>
                                <strong style={{ color: '#ffeb3b' }}>Important:</strong> Many of the highest-risk areas (dark zones) correspond to <strong style={{ color: '#ff9800' }}>densely populated, low-income neighborhoods</strong> built on:
                            </p>
                            <ul style={{ margin: '10px 0', paddingLeft: '20px', fontSize: '15px', lineHeight: '1.7' }}>
                                <li><strong>Squatter lands</strong> - Informal settlements established without legal title</li>
                                <li><strong>Abandoned government land</strong> - Unused public parcels occupied over time</li>
                                <li><strong>Old landfill areas</strong> - Former waste disposal sites with unstable fill material</li>
                            </ul>
                            <p style={{ margin: '15px 0 0 0', fontSize: '15px', lineHeight: '1.7', fontStyle: 'italic', color: '#ffcc80' }}>
                                These communities face compounded risk: not only from natural slope instability, but also from inadequate infrastructure, 
                                lack of formal planning, and limited resources for disaster preparedness.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Information Panel */}
            {showInfo && (
                <div className="info-panel" style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    margin: '0 20px 20px 20px',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ marginTop: 0, color: '#2c3e50', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>
                        🎯 Risk Calculation Methodology
                    </h2>
                    
                    <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
                        <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '6px', marginBottom: '15px', border: '1px solid #4CAF50' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📐 Fundamental Formula</h3>
                            <p style={{ fontSize: '20px', textAlign: 'center', margin: '10px 0', fontWeight: 'bold', color: '#1b5e20' }}>
                                TOTAL RISK = SEVERITY × PROBABILITY
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '6px', border: '1px solid #ff9800' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#e65100' }}>🏘️ SEVERITY</h4>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>What:</strong> Population Density</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Meaning:</strong> Impact if landslide occurs</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Range:</strong> 0 (uninhabited) → 1 (high density)</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Formula:</strong> <code>min(population / 200, 1)</code></p>
                            </div>

                            <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '6px', border: '1px solid #2196f3' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#0d47a1' }}>⛰️ PROBABILITY</h4>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>What:</strong> Landslide Susceptibility</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Meaning:</strong> Likelihood based on slope</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Range:</strong> 0 (flat) → 1 (very steep)</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Formula:</strong> <code>min(slope° / 45°, 1)</code></p>
                            </div>

                            <div style={{ backgroundColor: '#ffebee', padding: '15px', borderRadius: '6px', border: '1px solid #f44336' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#b71c1c' }}>⚠️ RISK</h4>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>What:</strong> Combined Threat</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Meaning:</strong> Overall risk level</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Range:</strong> 0 (no risk) → 1 (critical)</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Formula:</strong> <code>severity × probability</code></p>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fce4ec', padding: '15px', borderRadius: '6px', marginBottom: '15px', border: '1px solid #e91e63' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>💡 Why This Formula?</h3>
                            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                <li><strong>No People = No Risk:</strong> Even on steep terrain, if nobody lives there, risk is 0</li>
                                <li><strong>Flat Terrain = No Risk:</strong> Even with high population, flat areas have no landslide risk</li>
                                <li><strong>Both Needed:</strong> Risk only exists where people live AND terrain is steep</li>
                                <li><strong>Multiplication Effect:</strong> Highest risk where high population meets steep slopes</li>
                            </ul>
                        </div>

                        <div style={{ backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '6px', border: '1px solid #9c27b0' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#4a148c' }}>📊 Data Sources</h3>
                            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                <li><strong>Population:</strong> WorldPop 2020 (1km resolution)</li>
                                <li><strong>Elevation:</strong> Copernicus DEM 30m / NASA NASADEM</li>
                                <li><strong>Processing:</strong> Google Earth Engine</li>
                                <li><strong>Visualization:</strong> TiTiler (Cloud Optimized GeoTIFFs)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Three Maps */}
            <div className="maps-container">
                {/* Map 1: Population Density */}
                <MapComponent config={LAYERS_CONFIG.population} />
                
                {/* Map 2: Elevation */}
                <MapComponent config={LAYERS_CONFIG.elevation} />
                
                {/* Map 3: Total Risk */}
                <MapComponent config={LAYERS_CONFIG.risk} />
            </div>
        </div>
    );
}
