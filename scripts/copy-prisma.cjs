const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const nodeModulesPrisma = path.join(rootDir, 'node_modules/.prisma/client');
const destDir = path.join(rootDir, '.prisma/client');

console.log('=== Copy Prisma Engine ===');
console.log('Source:', nodeModulesPrisma);
console.log('Dest:', destDir);

// Create .prisma/client if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Check if source exists
if (!fs.existsSync(nodeModulesPrisma)) {
    console.log('Source not found, running prisma generate...');
    // The postinstall will run prisma generate first
    process.exit(0);
}

// Copy all files from node_modules/.prisma/client to .prisma/client
function copyRecursive(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(child => {
            copyRecursive(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

copyRecursive(nodeModulesPrisma, destDir);

// Verify
const engineFiles = fs.readdirSync(destDir).filter(f => f.includes('libquery_engine'));
console.log('Engine files:', engineFiles);
console.log('Done!');
