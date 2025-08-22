
const parseManaCostToBracketVersion = (manaCost: string): string => {
  if (!manaCost) return '';

  // If the string already contains braces, assume it's in the correct format
  if (manaCost.includes('{')) { return manaCost; }

  manaCost = replaceNumerals(manaCost);
  manaCost = replaceLetters(manaCost);
  manaCost = cleanupManaCost(manaCost);
  manaCost = correctOrderSpecialManaSymbols(manaCost);
  return manaCost;
}

const replaceNumerals = (manaCost: string): string => {
  // Replace multi-digit numbers with braced format
  return manaCost.replace(/\d+/g, (match) => `{${match.toLowerCase()}}`);
};

const replaceLetters = (manaCost: string): string => {
  // Replace single-letter mana symbols with braced format
  return manaCost.replace(/([WRBUGCXYZP])/g, (match) => `{${match}}`);
};

const cleanupManaCost = (manaCost: string): string => {
  // Remove any duplicate braces and ensure consistent formatting
  return (
    manaCost
      // Replace paren with brackets.
      .replace(/\(/g, '{').replace(/\)/g, '}')
      // Replace bracketed hybrid mana symbols with slash-separated format.
      .replace(/\}\/\{/g, '/')
      // Remove duplicate brackets.
      .replace(/\{\{/g, '{').replace(/\}\}/g, '}')
  );
};

const correctOrderSpecialManaSymbols = (manaCost: string): string => {
  // Correct the order of special mana symbols if needed.
  // For example, replace "G/R" with "R/G" to maintain a consistent order.
  // Greens
  manaCost = manaCost.replace(/W\/G/, 'G/W');
  manaCost = manaCost.replace(/U\/G/, 'G/U');
  // Reds
  manaCost = manaCost.replace(/G\/R/, 'R/G');
  manaCost = manaCost.replace(/W\/R/, 'R/W');
  // Blues
  manaCost = manaCost.replace(/B\/U/, 'U/B');
  manaCost = manaCost.replace(/R\/U/, 'U/R');
  // Blacks
  manaCost = manaCost.replace(/R\/B/, 'B/R');
  manaCost = manaCost.replace(/G\/B/, 'B/G');
  // Whites
  manaCost = manaCost.replace(/U\/W/, 'W/U');
  manaCost = manaCost.replace(/B\/W/, 'W/B');
  // Phyrexian
  manaCost = manaCost.replace(/W\/P/, 'P/W');
  manaCost = manaCost.replace(/R\/P/, 'P/R');
  manaCost = manaCost.replace(/U\/P/, 'P/U');
  manaCost = manaCost.replace(/B\/P/, 'P/B');
  manaCost = manaCost.replace(/G\/P/, 'P/G');
  return manaCost;
};


// Helper function to convert mana cost string to mana symbols
const renderManaCost = (manaCost: string) => {
  if (!manaCost) return null;
  
  // Parse mana cost string like "3RWB", "{3}{R}{W}{B}", or "{12}{R/W}{B}"
  const processedCost = parseManaCostToBracketVersion(manaCost);
  
  // Parse braced format: {3}{R}{W}{B} or {12}{R/W}{B}
  const symbolMatches = processedCost.match(/\{([^}]+)\}/g);
  
  if (!symbolMatches) return null;
  
  const symbols = symbolMatches.map((match, index) => {
    const content = match.slice(1, -1); // Remove braces
    const lowerContent = content.toLowerCase();

    
    let className = '';
    
    // Handle different mana symbols
    if (/^\d+$/.test(content)) {
      // Pure number (including multi-digit)
      className = `ms num ms-${content}`;
    } else if (['w', 'u', 'b', 'r', 'g', 'c'].includes(lowerContent)) {
      // Single color
      className = `ms ms-${lowerContent}`;
    } else if (['x', 'y', 'z'].includes(lowerContent)) {
      // X, Y, Z costs
      className = `ms ms-${lowerContent}`;
    } else if (content.includes('/')) {
      if (lowerContent.includes('p')) {
        const splitColors = content.toLowerCase().replace(/[()]/g, '').split('/');
        className = `ms ms-ci ms-h h${splitColors[1]}`;
      } else {
        // Split mana cost like "R/W", "U/B", etc.
        const splitColors = content.toLowerCase().replace(/[()]/g, '').split('/');
        
        className = `ms ms-ci ms-ci-${splitColors[0]}${splitColors[1]}`;
        // if (splitColors.length === 2 && 
        //     splitColors.every(color => ['w', 'u', 'b', 'r', 'g', 'c'].includes(color))) {
        //   // Create hybrid mana symbol class
        //   className = `ms ms-${splitColors.join('')}`;
        // } else {
        //   return content; // Return as text if not recognized
        // }
      }
    } else {
      return content; // Return as text if not recognized
    }
    
    return <i key={index} className={className} title={content} />;
  });
  
  return <span className="mana-cost">{symbols}</span>;
};

export {
  renderManaCost
};
