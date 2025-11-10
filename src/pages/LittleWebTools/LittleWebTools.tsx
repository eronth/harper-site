import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './LittleWebTools.css';

// Tool modules
import Base64Tool from './tools/Base64Tool.tsx';
import JsonFormatterTool from './tools/JsonFormatterTool.tsx';
import ColorConverterTool from './tools/ColorConverterTool.tsx';
import LoremIpsumTool from './tools/LoremIpsumTool.tsx';
import UuidGeneratorTool from './tools/UuidGeneratorTool.tsx';
import TimestampConverterTool from './tools/TimestampConverterTool/TimestampConverterTool.tsx';
import AbsoluteTempConverter from './tools/AbsoluteTempConverter/AbsoluteTempConverter.tsx';

type ToolId = 
  'base64' 
  | 'json-formatter' 
  | 'color-converter' 
  | 'lorem-ipsum' 
  | 'uuid-generator' 
  | 'timestamp-converter'
  | 'absolute-temp-converter';

interface Tool {
  id: ToolId;
  name: string;
  description: string;
  component: React.ComponentType<unknown>;
}

const tools: Tool[] = [
  {
    id: 'absolute-temp-converter',
    name: 'Absolute Temperature Converter',
    description: 'Convert from temps to my new absolute temp scale',
    component: AbsoluteTempConverter,
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode or decode Base64 strings',
    component: Base64Tool,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    component: JsonFormatterTool,
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, and HSL color formats',
    component: ColorConverterTool,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs',
    component: LoremIpsumTool,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUIDs',
    component: UuidGeneratorTool,
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates',
    component: TimestampConverterTool,
  },
];

export default function LittleWebTools() {
  const params = useParams();
  const navigate = useNavigate();
  const paramToolId = params.toolId as ToolId | undefined;

  const [selectedTool, setSelectedTool] = useState<ToolId | null>(null);

  // Keep component in sync with URL param
  useEffect(() => {
    if (paramToolId) {
      const found = tools.find((t) => t.id === paramToolId);
      if (found) setSelectedTool(found.id);
      else setSelectedTool(null);
    } else {
      setSelectedTool(null);
    }
  }, [paramToolId]);

  const ToolComponent = selectedTool ? tools.find((t) => t.id === selectedTool)?.component : null;

  return (
    <main className="page-content">
      <div className="content-section">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/little-web-tools">Little Web Tools</Link>
          {selectedTool && (
            <>
              <span> / </span>
              <span className="breadcrumb-current">{tools.find(t => t.id === selectedTool)?.name}</span>
            </>
          )}
        </nav>

        <h2>Little Web Tools</h2>
        <p>A collection of handy utilities for everyday web development tasks.</p>
        
        <div className="tools-container">
          {/* Tool Navigation */}
              <aside className="tools-sidebar">
            <h3>Available Tools</h3>
            <nav className="tools-nav">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  className={`tool-nav-button ${selectedTool === tool.id ? 'active' : ''}`}
                  onClick={() => navigate(`/little-web-tools/${tool.id}`)}
                >
                  <span className="tool-nav-name">{tool.name}</span>
                  <span className="tool-nav-description">{tool.description}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Tool Display Area */}
          <section className="tool-display">
            {!selectedTool && (
              <div className="tool-welcome">
                <h3>Select a Tool</h3>
                <p>Choose a tool from the left to get started.</p>
                <div className="tool-grid-preview">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      className="tool-preview-card"
                      onClick={() => navigate(`/little-web-tools/${tool.id}`)}
                    >
                      <h4>{tool.name}</h4>
                      <p>{tool.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {ToolComponent && (
              <div className="tool-active">
                <div style={{ marginBottom: '1rem' }}>
                  <Link to="/little-web-tools" className="tool-button" style={{ textDecoration: 'none' }}>← Back to tools</Link>
                </div>
                <ToolComponent />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
