import './TempConversionResult.css';

type Props = {
  conversions: {
    absolute: number;
    fahrenheit: number;
    celsius: number;
    kelvin: number;
  } | null;
  selectedUnit: string;
};

export default function TempConversionResult({ conversions, selectedUnit }: Props) {
  return (<>
    {conversions ? (
      <div className="conversion-result">
        <h4>Converted Temperatures:</h4>
        <div className="conversion-grid">
          <div className="row">
            <label>Absolute:</label>
            {selectedUnit === 'A' && <span className="original-indicator">(original)</span>}
            <span className="value">{conversions.absolute.toExponential(5)} °A</span>
          </div>
          <div className="row">
            <label>Fahrenheit:</label>
            <span>
              {selectedUnit === 'F' && <span className="original-indicator">(original)</span>}
              <span className="value">{conversions.fahrenheit.toFixed(2)} °F</span>
            </span>
          </div>
          <div className="row">
            <label>Celsius:</label>
            <span>
              {selectedUnit === 'C' && <span className="original-indicator">(original)</span>}
              <span className="value">{conversions.celsius.toFixed(2)} °C</span>
            </span>
          </div>
          <div className="row">
            <label>Kelvin:</label>
            <span>
              {selectedUnit === 'K' && <span className="original-indicator">(original)</span>}
              <span className="value">{conversions.kelvin.toFixed(2)} K</span>
            </span>
          </div>
        </div>
      </div>
    ) : (
      <div className="conversion-result-placeholder">
        Type a number to see all temperature conversions
      </div>
    )}
  </>)
}