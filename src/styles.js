/**
 * STYLES
 * 
 * All CSS styles in one place for easy customization
 */

const styles = `
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: #f5f5f5;
    }

    #root {
        width: 100vw;
        height: 100vh;
    }

    /* App Container */
    .app-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    /* Header */
    .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .header h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .header p {
        font-size: 0.875rem;
        opacity: 0.9;
        margin-top: 0.25rem;
    }

    /* Maps Container */
    .maps-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        padding: 1rem;
        flex: 1;
        overflow: hidden;
    }

    /* Map Card */
    .map-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
    }

    .map-card-header {
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .map-card-header h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #1f2937;
    }

    .map-card-header p {
        font-size: 0.75rem;
        color: #6b7280;
        margin-top: 0.25rem;
    }

    .map-container {
        flex: 1;
        position: relative;
    }

    .map {
        width: 100%;
        height: 100%;
    }

    /* Legend */
    .legend {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background: white;
        padding: 0.75rem;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        font-size: 0.75rem;
        z-index: 1;
    }

    .legend h4 {
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #1f2937;
    }

    .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.25rem;
    }

    .legend-color {
        width: 20px;
        height: 12px;
        margin-right: 0.5rem;
        border-radius: 2px;
    }

    .legend-label {
        color: #4b5563;
    }

    /* Controls */
    .controls {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: white;
        padding: 0.75rem;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 1;
    }

    .control-group {
        margin-bottom: 0.75rem;
    }

    .control-group:last-child {
        margin-bottom: 0;
    }

    .control-label {
        font-size: 0.75rem;
        font-weight: 500;
        color: #374151;
        display: block;
        margin-bottom: 0.25rem;
    }

    .control-input {
        width: 100%;
    }

    /* Responsive */
    @media (max-width: 1024px) {
        .maps-container {
            grid-template-columns: 1fr;
        }
    }

    @media (min-width: 1025px) and (max-width: 1400px) {
        .maps-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;
