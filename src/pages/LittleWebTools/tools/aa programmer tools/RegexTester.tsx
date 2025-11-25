import { useState, useMemo } from 'react';
import WebTool from '../../WebTool';
import './RegexTester.css';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState({
    g: true,  // global
    i: false, // case insensitive
    m: false, // multiline
    s: false, // dotAll
    u: false, // unicode
    y: false, // sticky
  });

  const regexResult = useMemo(() => {
    if (!pattern) {
      return { valid: false, error: null, matches: [], testResult: false };
    }

    try {
      const flagString = Object.entries(flags)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('');
      
      const regex = new RegExp(pattern, flagString);
      const matches: Array<{ text: string; index: number; groups?: string[] }> = [];
      
      if (testString) {
        if (flags.g) {
          // Global flag: find all matches
          let match;
          while ((match = regex.exec(testString)) !== null) {
            matches.push({
              text: match[0],
              index: match.index,
              groups: match.slice(1),
            });
            // Prevent infinite loop on zero-width matches
            if (match.index === regex.lastIndex) {
              regex.lastIndex++;
            }
          }
        } else {
          // Non-global: find first match
          const match = regex.exec(testString);
          if (match) {
            matches.push({
              text: match[0],
              index: match.index,
              groups: match.slice(1),
            });
          }
        }
      }

      return {
        valid: true,
        error: null,
        matches,
        testResult: matches.length > 0,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid regex',
        matches: [],
        testResult: false,
      };
    }
  }, [pattern, testString, flags]);

  type HighlightSegmentPart = {
    text: string;
    isMatch: boolean;
  };
  const highlightMatches = (): (HighlightSegmentPart[]) => {
    if (!testString || regexResult.matches.length === 0) {
      return [{
        text: testString,
        isMatch: false,
      }];
    }

    const parts: HighlightSegmentPart[] = [];
    let lastIndex = 0;

    regexResult.matches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          text: testString.slice(lastIndex, match.index),
          isMatch: false,
        });
      }
      // Add matched text
      parts.push({
        text: match.text,
        isMatch: true,
      });
      lastIndex = match.index + match.text.length;
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      parts.push({
        text: testString.slice(lastIndex),
        isMatch: false,
      });
    }

    return parts;
  };

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <WebTool css="regex-tester-tool">
      <h3>Regex Tester</h3>
      <p>Test and debug regular expressions with live highlighting and match details.</p>

      <div className="regex-input-section">
        <label htmlFor="regex-pattern">Regular Expression Pattern</label>
        <div className="regex-input-wrapper">
          <span className="regex-delimiter">/</span>
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className={regexResult.valid === false && pattern ? 'invalid' : ''}
          />
          <span className="regex-delimiter">/</span>
          <div className="flags-display">
            {Object.entries(flags)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, enabled]) => enabled)
              .map(([flag]) => flag)
              .join('')}
          </div>
        </div>

        {regexResult.error && (
          <div className="error-message">{regexResult.error}</div>
        )}

        <div className="flags-section">
          <label>Flags:</label>
          <div className="flag-buttons">
            <button
              className={`flag-button ${flags.g ? 'active' : ''}`}
              onClick={() => toggleFlag('g')}
              title="Global - Find all matches"
            >
              g
            </button>
            <button
              className={`flag-button ${flags.i ? 'active' : ''}`}
              onClick={() => toggleFlag('i')}
              title="Case insensitive"
            >
              i
            </button>
            <button
              className={`flag-button ${flags.m ? 'active' : ''}`}
              onClick={() => toggleFlag('m')}
              title="Multiline - ^ and $ match line boundaries"
            >
              m
            </button>
            <button
              className={`flag-button ${flags.s ? 'active' : ''}`}
              onClick={() => toggleFlag('s')}
              title="Dot all - . matches newlines"
            >
              s
            </button>
            <button
              className={`flag-button ${flags.u ? 'active' : ''}`}
              onClick={() => toggleFlag('u')}
              title="Unicode"
            >
              u
            </button>
            <button
              className={`flag-button ${flags.y ? 'active' : ''}`}
              onClick={() => toggleFlag('y')}
              title="Sticky - Match from lastIndex"
            >
              y
            </button>
          </div>
        </div>
      </div>

      <div className="test-string-section">
        <label htmlFor="test-string">Test String</label>
        <div className="textarea-container">
          <textarea
            id="test-string"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            rows={8}
          />
          {testString && (
            <button
              className="tool-button clear-button"
              onClick={() => setTestString('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {testString && pattern && regexResult.valid && (
        <div className="results-section">
          <div className="match-summary">
            <h4>Results</h4>
            <div className={`match-status ${regexResult.testResult ? 'success' : 'no-match'}`}>
              {regexResult.testResult
                ? `✓ ${regexResult.matches.length} match${regexResult.matches.length === 1 ? '' : 'es'} found`
                : '✗ No matches found'}
            </div>
          </div>

          {regexResult.matches.length > 0 && (
            <>
              <div className="highlighted-text">
                <h5>Highlighted Matches</h5>
                <div className="highlight-box">
                  {highlightMatches().map((part, index) => (
                    <span
                      key={index}
                      className={part.isMatch ? 'highlight' : ''}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="matches-list">
                <h5>Match Details</h5>
                {regexResult.matches.map((match, index) => (
                  <div key={index} className="match-item">
                    <div className="match-header">
                      <span className="match-index">Match {index + 1}</span>
                      <span className="match-position">Position: {match.index}</span>
                    </div>
                    <div className="match-text">
                      <strong>Text:</strong> "{match.text}"
                    </div>
                    {match.groups && match.groups.length > 0 && match.groups.some(g => g !== undefined) && (
                      <div className="match-groups">
                        <strong>Groups:</strong>
                        <ul>
                          {match.groups.map((group, groupIndex) => (
                            group !== undefined && (
                              <li key={groupIndex}>
                                Group {groupIndex + 1}: "{group}"
                              </li>
                            )
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </WebTool>
  );
}
