#!/usr/bin/env node

/**
 * Auto-generate index.ts files for Lego Village building photo folders
 * This script scans each building folder in src/assets/lego-village/village photos/
 * and generates an index.ts file with all image imports and exports.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VILLAGE_PHOTOS_DIR = path.join(__dirname, '../src/assets/lego-village/village photos');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Convert folder name to valid variable name
function folderNameToVariableName(folderName) {
  return folderName
    .split(/[\s-]+/) // Split on spaces and hyphens
    .map((word, index) => {
      // Capitalize first letter of each word except the first
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('') + 'Images';
}

// Get all image files in a directory
function getImageFiles(dirPath) {
  try {
    return fs.readdirSync(dirPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .sort(); // Sort for consistent output
  } catch (error) {
    console.warn(`⚠️  Could not read directory: ${dirPath}`);
    return [];
  }
}

// Generate index.ts for a single building folder
function generateBuildingIndex(buildingPath, buildingName) {
  const imageFiles = getImageFiles(buildingPath);
  
  if (imageFiles.length === 0) {
    console.log(`ℹ️  No images in "${buildingName}" - skipping`);
    return;
  }

  const variableName = folderNameToVariableName(buildingName);

  // Generate imports
  const imports = imageFiles.map((filename, index) => {
    return `import img${index + 1} from './${filename}';`;
  }).join('\n');

  // Generate array of image references
  const imageRefs = imageFiles.map((_, index) => {
    return `  img${index + 1},`;
  }).join('\n');

  // Generate file content
  const fileContent = `// ${buildingName.charAt(0).toUpperCase() + buildingName.slice(1)} images
${imports}

export const ${variableName} = [
${imageRefs}
];

export default ${variableName};
`;

  // Write the index.ts file
  const indexPath = path.join(buildingPath, 'index.ts');
  fs.writeFileSync(indexPath, fileContent);
  console.log(`✅ Generated index.ts for "${buildingName}" (${imageFiles.length} images)`);
}

// Main function to process all building folders
function generateAllIndexes() {
  try {
    // Check if village photos directory exists
    if (!fs.existsSync(VILLAGE_PHOTOS_DIR)) {
      console.error(`❌ Directory not found: ${VILLAGE_PHOTOS_DIR}`);
      process.exit(1);
    }

    // Read all subdirectories (building folders)
    const buildingFolders = fs.readdirSync(VILLAGE_PHOTOS_DIR)
      .filter(item => {
        const itemPath = path.join(VILLAGE_PHOTOS_DIR, item);
        return fs.statSync(itemPath).isDirectory();
      })
      .sort();

    console.log(`\n🏠 Found ${buildingFolders.length} building folders`);
    console.log('━'.repeat(50));

    // Generate index.ts for each building
    buildingFolders.forEach(buildingName => {
      const buildingPath = path.join(VILLAGE_PHOTOS_DIR, buildingName);
      generateBuildingIndex(buildingPath, buildingName);
    });

    console.log('━'.repeat(50));
    console.log('✨ All index.ts files generated successfully!\n');
    
  } catch (error) {
    console.error('❌ Error generating index files:', error);
    process.exit(1);
  }
}

// Run the script
generateAllIndexes();
