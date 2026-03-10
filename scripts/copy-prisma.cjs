const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const nodeModulesPrisma = path.join(rootDir, 'node_modules/.prisma/client');
const prismaClientDir = path.join(rootDir, 'node_modules/@prisma/client');

console.log('=== Copy Prisma Engine ===');
console.log('Source:', nodeModulesPrisma);
console.log('Dest:', prismaClientDir);

// Check if source exists
if (!fs.existsSync(nodeModulesPrisma)) {
    console.log('Source not found, running prisma generate first');
    process.exit(0);
}

// Copy engine files to @prisma/client
const engineFiles = fs.readdirSync(nodeModulesPrisma).filter(f => f.includes('libquery_engine'));
console.log('Engine files found:', engineFiles);

engineFiles.forEach(file => {
    const src = path.join(nodeModulesPrisma, file);
    const dest = path.join(prismaClientDir, file);
    fs.copyFileSync(src, dest);
    console.log('Copied:', file);
});

// Also ensure .prisma/client exists (for runtime)
const destDir = path.join(rootDir, '.prisma/client');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy everything to .prisma/client for runtime
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

const finalEngines = fs.readdirSync(prismaClientDir).filter(f => f.includes('libquery_engine'));
console.log('Engines in @prisma/client:', finalEngines);
console.log('Done!');
