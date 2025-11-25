import './CommonTempsConvertGrid.css';

type Props = {
  convertToAbsolute: (degrees: number, scale: string) => number;
}
export default function CommonTempsConvertGrid({ convertToAbsolute}: Props) {
  return (
    <div className="common-temps">
      <h4>Common Temperatures:</h4>
      <div className="common-temps-grid">
        <div className="temp-row">
          <span className="temp-name">Freezing</span>
          <span className="temp-original">32°F</span>
          <span className="temp-value">{convertToAbsolute(32, 'F').toExponential(4)} °A</span>
        </div>
        <div className="temp-row">
          <span className="temp-name">Cold Day</span>
          <span className="temp-original">40°F</span>
          <span className="temp-value">{convertToAbsolute(50, 'F').toExponential(4)} °A</span>
        </div>
        <div className="temp-row">
          <span className="temp-name">Room Temp</span>
          <span className="temp-original">70°F</span>
          <span className="temp-value">{convertToAbsolute(70, 'F').toExponential(4)} °A</span>
        </div>
        <div className="temp-row">
          <span className="temp-name">Hot Day</span>
          <span className="temp-original">90°F</span>
          <span className="temp-value">{convertToAbsolute(90, 'F').toExponential(4)} °A</span>
        </div>
        <div className="temp-row">
          <span className="temp-name">Human Body</span>
          <span className="temp-original">98.6°F</span>
          <span className="temp-value">{convertToAbsolute(98.6, 'F').toExponential(4)} °A</span>
        </div>
        <div className="temp-row">
          <span className="temp-name">Boiling Water</span>
          <span className="temp-original">212°F</span>
          <span className="temp-value">{convertToAbsolute(212, 'F').toExponential(4)} °A</span>
        </div>
      </div>
    </div>
  )
}
