import { useState } from 'react';
import WebTool from '../../WebTool';
import './WordCharCount.css';

export default function WordCharCount() {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const charNoSpaceCount = text.replace(/\s/g, '').length;
  const lineCount = text === '' ? 0 : text.split('\n').length;

  return (
    <WebTool css="word-char-count-tool">
      <h3>Word & Character Counter</h3>
      <p>Paste or type text to count words, characters, and lines.</p>

      <div className="textarea-container">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          rows={10}
        />
        
        {text && (
          <button 
            className="tool-button clear-button" 
            onClick={() => setText('')}
          >
            Clear
          </button>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{wordCount}</div>
          <label>Word{wordCount === 1 ? '' : 's'}</label>
        </div>
        <div className="stat-card">
          <div className="stat-value">{charCount}</div>
          <label>Character{charCount === 1 ? '' : 's'}</label>
        </div>
        <div className="stat-card">
          <div className="stat-value">{charNoSpaceCount}</div>
          <label>Character{charNoSpaceCount === 1 ? '' : 's'} (without spaces)</label>
        </div>
        <div className="stat-card">
          <div className="stat-value">{lineCount}</div>
          <label>Line{lineCount === 1 ? '' : 's'}</label>
        </div>
      </div>
    </WebTool>
  );
}
