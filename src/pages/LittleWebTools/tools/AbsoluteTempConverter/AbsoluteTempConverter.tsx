import { useState } from 'react';

export default function AbsoluteTempConverter() {
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('F');

  // Conversion helpers
  function fahrenheitToCelsius(f: number) {
    return (f - 32) * 5 / 9;
  }

  function celsiusToFahrenheit(c: number) {
    return c * 9 / 5 + 32;
  }

  function celsiusToKelvin(c: number) {
    return c + 273.15;
  }

  function kelvinToCelsius(k: number) {
    return k - 273.15;
  }

  function kelvinToAbsolute(k: number) {
    const maxAbsolute = 1;
    const maxKelvin = 1.416808 * Math.pow(10, 32);
    return maxAbsolute * k / maxKelvin;
  }

  // Convert any temperature to all scales
  function convertToAllScales(degrees: number, fromScale: string) {
    let celsius: number;
    
    // First convert to Celsius as our common base
    if (fromScale === 'F') {
      celsius = fahrenheitToCelsius(degrees);
    } else if (fromScale === 'K') {
      celsius = kelvinToCelsius(degrees);
    } else {
      celsius = degrees; // Already in Celsius
    }
    
    const fahrenheit = celsiusToFahrenheit(celsius);
    const kelvin = celsiusToKelvin(celsius);
    const absolute = kelvinToAbsolute(kelvin);
    
    return {
      fahrenheit,
      celsius,
      kelvin,
      absolute
    };
  }

  function convertToAbsolute(degrees: number, scale: string) {
    const kelvin = scale === 'F' 
      ? celsiusToKelvin(fahrenheitToCelsius(degrees))
      : scale === 'C'
      ? celsiusToKelvin(degrees)
      : degrees;
    return kelvinToAbsolute(kelvin);
  }

  function absoluteToValuesText() {
    const absolute = 0.000000000000000000000000000002;
    const kelvin = absolute * 1.416808 * Math.pow(10, 32);
    const celcius = kelvin - 273.15;
    const fahrenheit = celcius * 9 / 5 + 32;

    return `Absolute zero is ${absolute} °A, ${kelvin} K, ${celcius} °C, or ${fahrenheit} °F.`;
  }


  // Make sure keypress only allows numbers, backspace, negative, arrow keys, and one decimal.
  function handleKeypress(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.key;
    if (key === 'Backspace') { return; }
    if (key === '-') { return; }
    if (key === 'ArrowUp') { return; }
    if (key === 'ArrowDown') { return; }
    if (key === 'ArrowLeft') { return; }
    if (key === 'ArrowRight') { return; }
    if (key === '.') {
      const input = event.currentTarget.value;
      if (input.includes('.')) {
        event.preventDefault();
      }
      return;
    }
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  function getAllConversions() {
    if (inputValue === '') {
      return null;
    }
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      return null;
    }
    return convertToAllScales(num, selectedUnit);
  }

  const conversions = getAllConversions();

  return (<>
    <div>
      <h3>Absolute Temperature Converter</h3>
      <p>
        The Absolute Temperature Scale (°A) is a hypothetical temperature scale where  
        absolute zero is 0 °A and the highest possible temperature is 1 °A. It is 
        based on the concept of a Planck Temperature.
        This scale is not used in practical applications
        but really serves as a comical display of the "absolute" range of temperatures.
      </p>
      <input
        type="number" 
        className="absolute-input" 
        step="0.5" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        onKeyDown={handleKeypress}
      />
      <select
        className="unit-select"
        value={selectedUnit}
        onChange={(e) => setSelectedUnit(e.target.value)}
      >
        <option value="F">°F</option>
        <option value="C">°C</option>
        <option value="K">K</option>
        {/* <option value="A">°A</option> */}
      </select>
    </div>
    
    {conversions ? (
      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px' }}>
        <h4 style={{ marginTop: 0 }}>Converted Temperatures:</h4>
        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '1rem' }}>
          <div>
            <strong>Fahrenheit:</strong> {conversions.fahrenheit.toFixed(2)} °F
            {selectedUnit === 'F' && ' (original)'}
          </div>
          <div>
            <strong>Celsius:</strong> {conversions.celsius.toFixed(2)} °C
            {selectedUnit === 'C' && ' (original)'}
          </div>
          <div>
            <strong>Kelvin:</strong> {conversions.kelvin.toFixed(2)} K
            {selectedUnit === 'K' && ' (original)'}
          </div>
          <div>
            <strong>Absolute:</strong> {conversions.absolute.toExponential(6)} °A
          </div>
        </div>
      </div>
    ) : (
      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', opacity: 0.6 }}>
        Type a number to see all temperature conversions
      </div>
    )}
    
    <div style={{ marginTop: '1.5rem' }}>
      <strong>Common temperatures:</strong> <br />
      Freezing 32°F: {convertToAbsolute(32, 'F').toExponential(4)} °A; <br />
      Cold 50°F: {convertToAbsolute(50, 'F').toExponential(4)} °A; <br />
      Room temp 70°F: {convertToAbsolute(70, 'F').toExponential(4)} °A; <br />
      Hot 90°F: {convertToAbsolute(90, 'F').toExponential(4)} °A; <br />
      Human body 98.6°F: {convertToAbsolute(98.6, 'F').toExponential(4)} °A; <br />
      Boiling 212°F: {convertToAbsolute(212, 'F').toExponential(4)} °A; <br />
    </div>
    <div>{absoluteToValuesText()}</div>
  </>);
}