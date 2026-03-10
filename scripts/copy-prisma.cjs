const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src/generated/prisma');
const destDir = path.join(rootDir, '.prisma/client');

console.log('=== Copy Prisma Script ===');
console.log('Root dir:', rootDir);
console.log('Source dir:', srcDir);
console.log('Dest dir:', destDir);
console.log('Source exists:', fs.existsSync(srcDir));

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

// Create .prisma/client if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy all files from src/generated/prisma to .prisma/client
copyRecursive(srcDir, destDir);

// Verify
const engineFiles = fs.readdirSync(destDir).filter(f => f.includes('libquery_engine'));
console.log('Engine files copied:', engineFiles);

console.log('Done copying Prisma client files');
