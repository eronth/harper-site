import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Page from '../Page.tsx';
import './LittleWebTools.css';

// Tool modules
import AbsoluteTempConverter from './tools/AbsoluteTempConverter/AbsoluteTempConverter.tsx';
import WordCharCount from './tools/WordCharCount/WordCharCount.tsx';
import RegexTester from './tools/aa programmer tools/RegexTester.tsx';
import CronExpressionBuilder from './tools/aa programmer tools/CronExpressionBuilder.tsx';
import ColorBlindVisualizer from './tools/ColorBlindVisualizer/ColorBlindVisualizer.tsx';
import TimestampConverterTool from './tools/TimestampConverterTool/TimestampConverterTool.tsx';


const toolIds = {
  absoluteTempConverter: 'absolute-temp-converter',
  wordCharCount: 'word-char-count',
};
type ToolId = typeof toolIds[keyof typeof toolIds];
interface Tool {
  id: ToolId;
  name: string;
  description: string;
  component: React.ComponentType<unknown>;
};

const tools: Tool[] = [
  {
    id: toolIds.absoluteTempConverter,
    name: 'Absolute Temperature Converter',
    description: 'Convert from temps to my new absolute temp (°A) scale',
    component: AbsoluteTempConverter,
  },
  {
    id: toolIds.wordCharCount,
    name: 'Word & Character Counter',
    description: 'Count words and characters in your text',
    component: WordCharCount,
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with live highlighting and match details',
    component: RegexTester,
  },
  {
    id: 'chron-expression-builder',
    name: 'Chron Expression Builder',
    description: 'Build and validate Chron expressions for scheduling tasks',
    component: CronExpressionBuilder,
  },
  {
    id: 'color-blindness-visualizer',
    name: 'Color Blindness Visualizer',
    description: 'Simulate how images appear to people with different types of color blindness',
    component: ColorBlindVisualizer,
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between different timestamp formats and time zones',
    component: TimestampConverterTool,
  }
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
    <Page>
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
          {/* <aside className="tools-sidebar">
            <h3>Available Tools</h3>
            <nav className="tools-nav">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  className={`${selectedTool === tool.id ? 'active' : ''}`}
                  onClick={() => navigate(`/little-web-tools/${tool.id}`)}
                >
                  <label className="name">{tool.name}</label>
                  <span className="tool-nav-description">{tool.description}</span>
                </button>
              ))}
            </nav>
          </aside> */}

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
    </Page>
  );
}
