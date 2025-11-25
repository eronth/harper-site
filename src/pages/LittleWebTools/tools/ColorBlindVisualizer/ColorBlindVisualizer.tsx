import { useState, useRef, useEffect } from 'react';
import WebTool from '../../WebTool';
import './ColorBlindVisualizer.css';

type ColorBlindnessType = 
  | 'normal'
  | 'protanopia'     // Red-blind (no red cones)
  | 'protanomaly'    // Red-weak
  | 'deuteranopia'   // Green-blind (no green cones)
  | 'deuteranomaly'  // Green-weak
  | 'tritanopia'     // Blue-blind (no blue cones)
  | 'tritanomaly'    // Blue-weak
  | 'achromatopsia'  // Total color blindness
  | 'achromatomaly'; // Blue cone monochromacy

const COLOR_BLINDNESS_TYPES: { type: ColorBlindnessType; label: string; description: string }[] = [
  { type: 'normal', label: 'Normal Vision', description: 'No color blindness' },
  { type: 'protanopia', label: 'Protanopia', description: 'Red-blind (1% of males)' },
  { type: 'protanomaly', label: 'Protanomaly', description: 'Red-weak (1% of males)' },
  { type: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (1% of males)' },
  { type: 'deuteranomaly', label: 'Deuteranomaly', description: 'Green-weak (6% of males, most common)' },
  { type: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (rare)' },
  { type: 'tritanomaly', label: 'Tritanomaly', description: 'Blue-weak (rare)' },
  { type: 'achromatopsia', label: 'Achromatopsia', description: 'Total color blindness (very rare)' },
  { type: 'achromatomaly', label: 'Achromatomaly', description: 'Blue cone monochromacy (very rare)' },
];

// Color blindness transformation matrices based on research
// Source: http://www.daltonize.org/
const COLOR_MATRICES: Record<ColorBlindnessType, number[][]> = {
  normal: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  protanomaly: [
    [0.817, 0.183, 0],
    [0.333, 0.667, 0],
    [0, 0.125, 0.875],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  deuteranomaly: [
    [0.8, 0.2, 0],
    [0.258, 0.742, 0],
    [0, 0.142, 0.858],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
  tritanomaly: [
    [0.967, 0.033, 0],
    [0, 0.733, 0.267],
    [0, 0.183, 0.817],
  ],
  achromatopsia: [
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
  ],
  achromatomaly: [
    [0.618, 0.320, 0.062],
    [0.163, 0.775, 0.062],
    [0.163, 0.320, 0.516],
  ],
};

export default function ColorBlindVisualizer() {
  const [selectedType, setSelectedType] = useState<ColorBlindnessType>('deuteranomaly');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const filteredCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const applyColorBlindnessFilter = (
    imageData: ImageData,
    matrix: number[][]
  ): ImageData => {
    const data = imageData.data;
    const filtered = new ImageData(imageData.width, imageData.height);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;

      // Apply the color blindness matrix
      const newR = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
      const newG = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
      const newB = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];

      filtered.data[i] = Math.min(255, Math.max(0, newR * 255));
      filtered.data[i + 1] = Math.min(255, Math.max(0, newG * 255));
      filtered.data[i + 2] = Math.min(255, Math.max(0, newB * 255));
      filtered.data[i + 3] = data[i + 3]; // Keep alpha
    }

    return filtered;
  };

  useEffect(() => {
    if (!imageUrl || !originalCanvasRef.current || !filteredCanvasRef.current) return;

    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const originalCanvas = originalCanvasRef.current!;
      const filteredCanvas = filteredCanvasRef.current!;
      const originalCtx = originalCanvas.getContext('2d')!;
      const filteredCtx = filteredCanvas.getContext('2d')!;

      // Set canvas size to match image
      const maxWidth = 800;
      const maxHeight = 600;
      let width = img.width;
      let height = img.height;

      // Scale down if too large
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      originalCanvas.width = width;
      originalCanvas.height = height;
      filteredCanvas.width = width;
      filteredCanvas.height = height;

      // Draw original
      originalCtx.drawImage(img, 0, 0, width, height);

      // Get image data and apply filter
      const imageData = originalCtx.getImageData(0, 0, width, height);
      const matrix = COLOR_MATRICES[selectedType];
      const filtered = applyColorBlindnessFilter(imageData, matrix);

      // Draw filtered
      filteredCtx.putImageData(filtered, 0, 0);
      setIsProcessing(false);
    };

    img.src = imageUrl;

    return () => {
      img.onload = null;
    };
  }, [imageUrl, selectedType]);

  const clearImage = () => {
    setImageFile(null);
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadFilteredImage = () => {
    if (!filteredCanvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `colorblind-${selectedType}-${imageFile?.name || 'image.png'}`;
    link.href = filteredCanvasRef.current.toDataURL();
    link.click();
  };

  return (
    <WebTool css="colorblind-visualizer-tool">
      <h3>Color Blindness Visualizer</h3>
      <p>Upload an image to see how it appears to people with different types of color blindness.</p>

      <div className="type-selector">
        <label>Color Blindness Type:</label>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as ColorBlindnessType)}>
          {COLOR_BLINDNESS_TYPES.map(({ type, label, description }) => (
            <option key={type} value={type}>
              {label}  —  {description}
            </option>
          ))}
        </select>
      </div>

      {!imageUrl ? (
        <div
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-content">
            <div className="upload-icon">📷</div>
            <p className="upload-title">Click or drag to upload an image</p>
            <p className="upload-subtitle">Supports JPG, PNG, GIF, WebP</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="image-comparison">
          <div className="comparison-controls">
            <button className="tool-button clear-button" onClick={clearImage}>
              Clear Image
            </button>
            <button className="tool-button" onClick={downloadFilteredImage}>
              Download Filtered
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>

          {isProcessing && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>Processing image...</p>
            </div>
          )}

          <div className="canvas-grid">
            <div 
              className="canvas-container draggable"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <h4>Original Image (drag new image here)</h4>
              <canvas ref={originalCanvasRef}></canvas>
            </div>
            <div className="canvas-container">
              <h4>
                {COLOR_BLINDNESS_TYPES.find(t => t.type === selectedType)?.label || 'Filtered'} View
              </h4>
              <canvas ref={filteredCanvasRef}></canvas>
            </div>
          </div>
        </div>
      )}

      <div className="info-section">
        <h4>About Color Blindness</h4>
        <div className="info-grid">
          <div className="info-card">
            <h5>Red-Green Color Blindness</h5>
            <p>
              <strong>Protanopia & Protanomaly:</strong> Difficulty distinguishing red from green due to missing or 
              malfunctioning red cones. Red appears darker and more brown.
            </p>
            <p>
              <strong>Deuteranopia & Deuteranomaly:</strong> The most common form (6% of males). Difficulty 
              distinguishing red from green due to green cone deficiency.
            </p>
          </div>
          <div className="info-card">
            <h5>Blue-Yellow Color Blindness</h5>
            <p>
              <strong>Tritanopia & Tritanomaly:</strong> Rare condition affecting blue cone cells. Difficulty 
              distinguishing blue from green and yellow from violet.
            </p>
          </div>
          <div className="info-card">
            <h5>Complete Color Blindness</h5>
            <p>
              <strong>Achromatopsia:</strong> Very rare total color blindness. Vision is in grayscale only.
            </p>
            <p>
              <strong>Achromatomaly:</strong> Blue cone monochromacy. Extremely rare, limited color perception.
            </p>
          </div>
        </div>
      </div>
    </WebTool>
  );
}
