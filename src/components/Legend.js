/**
 * LEGEND COMPONENT
 * 
 * Shows what each color means on the map
 * 
 * Props:
 *   - items: Array of {color, label} objects
 * 
 * Example:
 *   <Legend items={[
 *     { color: 'red', label: 'High Risk' },
 *     { color: 'green', label: 'Low Risk' }
 *   ]} />
 */

function Legend({ items }) {
    return (
        <div className="legend">
            <h4>Legend</h4>
            {items.map((item, index) => (
                <div key={index} className="legend-item">
                    <div 
                        className="legend-color" 
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="legend-label">{item.label}</span>
                </div>
            ))}
        </div>
    );
}
