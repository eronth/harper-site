import { useState } from 'react';
import WebTool from '../../WebTool';
import './AbsoluteTempConverter.css';
import MMath from '../../../../components/Math/MMath';
import MOp from '../../../../components/Math/MOp';
import MNum from '../../../../components/Math/MNum';
import MSuper from '../../../../components/Math/MSuper';
import CommonTempsConvertGrid from './CommonTempsConvertGrid/CommonTempsConvertGrid';
import TempConversionResult from './TempConversionResult/TempConversionResult';

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
    const { absolute, kelvin, celsius, fahrenheit } = convertToAllScales(0, 'K');

    return `Absolute zero is ${absolute} °A, ${kelvin} K, ${celsius} °C, or ${fahrenheit.toFixed(2)} °F.`;
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

  const plankTemp = <span style={{ whiteSpace: 'nowrap' }}>
    <MMath noWrap>
      <MNum>1.416</MNum>
      <MOp>×</MOp>
      <MSuper base={<MNum>10</MNum>} super={<MNum>32</MNum>} />
    </MMath>
    &nbsp;Kelvin
  </span>

  return (
    <WebTool css="absolute-temp-converter">
      <div>
        <h3>Absolute Temperature Converter</h3>
        <p>
          The Absolute Temperature Scale (°A) is a hypothetical temperature scale where  
          absolute zero is 0&nbsp;°A and the highest possible temperature is normalized to 1&nbsp;°A. It is 
          based on the concept of a Planck Temperature ({plankTemp}), a temperature
          beyond which the laws of physics as we know them cease to be useful.
          This scale is not used in practical applications
          but really serves as a comical display of the "absolute" range of temperatures.
        </p>
      </div>
      
      <div className="temperature-input-container">
        <input
          type="number" 
          className="temp-input value-input" 
          step="0.5" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={handleKeypress}
          placeholder="Temp"
        />
        <select
          className="unit-select value-input"
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          <option value="F">°F</option>
          <option value="C">°C</option>
          <option value="K">K</option>
        </select>
      </div>
    
      <TempConversionResult
        conversions={conversions}
        selectedUnit={selectedUnit}
      />
    
      <CommonTempsConvertGrid
        convertToAbsolute={convertToAbsolute}
      />
      
      <div className="absolute-info">
        {absoluteToValuesText()}
      </div>
    </WebTool>
  );
}