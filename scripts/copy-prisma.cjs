const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const nodeModulesPrisma = path.join(rootDir, 'node_modules/.prisma/client');
const destDir = path.join(rootDir, '.prisma/client');

console.log('=== Copy Prisma Engine ===');
console.log('Source:', nodeModulesPrisma);
console.log('Dest:', destDir);

// Create destination directory
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Check if source exists
if (!fs.existsSync(nodeModulesPrisma)) {
    console.log('ERROR: Source not found! Prisma generate may have failed.');
    process.exit(1);
}

// Copy everything recursively
function copyRecursive(src, dest) {
    const exists = fs.existsSync(src);
    if (!exists) return;
    
    const stats = fs.statSync(src);
    const isDirectory = stats.isDirectory();

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
console.log('Engine files in .prisma/client:', engineFiles);
console.log('Done!');
