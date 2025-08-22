#!/usr/bin/env node

/**
 * Watch MTG cards directory and auto-regenerate index when files change
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MTG_CARDS_DIR = path.join(__dirname, '../src/assets/mtg-cards');

console.log('🔍 Watching MTG cards directory for changes...');
console.log(`📁 Directory: ${MTG_CARDS_DIR}`);
console.log('💡 Add .jpg files to automatically update the index!');
console.log('⌨️  Press Ctrl+C to stop watching\n');

// Function to run the generate script
function regenerateIndex() {
  console.log('🔄 Regenerating MTG card index...');
  const child = spawn('node', ['scripts/generate-mtg-index.js'], { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Index updated successfully!\n');
    } else {
      console.log('❌ Error updating index\n');
    }
  });
}

// Watch the directory
fs.watch(MTG_CARDS_DIR, { recursive: false }, (eventType, filename) => {
  if (filename && filename.endsWith('.jpg')) {
    console.log(`📝 Detected ${eventType} for: ${filename}`);
    // Debounce: wait a bit in case multiple files are added at once
    setTimeout(regenerateIndex, 500);
  }
});
