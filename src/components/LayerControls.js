/**
 * LAYER CONTROLS COMPONENT
 * 
 * Provides UI controls for adjusting the map layer
 * Currently just has an opacity slider, but you could add more controls like:
 * - Visibility toggle
 * - Color scheme selector
 * - Layer info button
 * 
 * Props:
 *   - opacity: Current opacity value (0-1)
 *   - onOpacityChange: Function to call when opacity changes
 * 
 * Example:
 *   <LayerControls 
 *     opacity={0.7} 
 *     onOpacityChange={(newOpacity) => console.log(newOpacity)}
 *   />
 */

function LayerControls({ opacity, onOpacityChange }) {
    return (
        <div className="controls">
            <div className="control-group">
                <label className="control-label">
                    Opacity: {Math.round(opacity * 100)}%
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacity * 100}
                    onChange={(e) => onOpacityChange(e.target.value / 100)}
                    className="control-input"
                />
            </div>
        </div>
    );
}
