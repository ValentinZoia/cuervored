# MongoDB + Prisma 6.x + Next.js + Vercel

Guía completa para configurar Prisma con MongoDB en producción (Vercel).

## 1. Schema.prisma

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Tus modelos...
```

**Notas:**
- NO usar `output` custom ni `engineType = "library"` - esos causan problemas en Vercel
- `rhel-openssl-3.0.x` es el binary target para Vercel (Linux RHEL)
- `native` es para desarrollo local

## 2. lib/prisma.ts

```typescript
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

process.on("beforeExit", (): void => {
    prisma.$disconnect();
});

export default prisma;
```

**Importante:** Usar `@prisma/client` (el output por defecto), NO un path custom como `@/generated/prisma`.

## 3. Imports en el código

```typescript
// ✅ Correcto - usa el paquete por defecto
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

// ❌ Evitar - path custom causa problemas en producción
import { Prisma } from "@/generated/prisma/client";
```

## 4. .gitignore

```gitignore
# Prisma - EXCEPTO .prisma para producción
/prisma/generated
# .prisma  <-- SI necesitás commitearlo (opcional, ver abajo)
/generated
```

## 5. Scripts en package.json

```json
{
  "scripts": {
    "postinstall": "prisma generate && node scripts/copy-prisma.cjs",
    "vercel-build": "node scripts/copy-prisma.cjs && next build"
  }
}
```

## 6. Script copy-prisma.cjs

Crea `scripts/copy-prisma.cjs` (necesario porque Vercel no copia automáticamente los binaries):

```javascript
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
```

## 7. Por qué esto funciona

- **Problema original:** Prisma genera el query engine en `node_modules/.prisma/client`, pero Next.js en producción no copia automáticamente esos binaries a la raíz `.prisma/client` donde Prisma los busca en runtime.

- **Solución:** El script copia los engines de `node_modules/.prisma/client` a `.prisma/client` (raíz) después de `prisma generate`.

- **Alternativa:** Podrías commitear la carpeta `.prisma` completa (~35MB), pero el script es más limpio.

## 8. Errores comunes y soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `Could not locate Query Engine` | Binary no encontrado | Usar el script copy-prisma.cjs |
| `engineType='library'` causa errores | Bundler no maneja librerías nativas | Quitar `engineType = "library"` del schema |
| Funciona local pero no producción | Binary target incorrecto | Agregar `rhel-openssl-3.0.x` a binaryTargets |

## 9. next.config.js

No es necesario agregar `serverExternalPackages` para Prisma porque Next.js ya lo incluye automáticamente en su lista de paquetes que no se bundelean.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // tus imágenes...
        ],
    },
};

module.exports = nextConfig;
```

## 10. Verificación

Después de configurar, verificá en local:

```bash
# Limpia y regenera todo
rm -rf .prisma node_modules/.prisma
npm install
npx prisma generate
node scripts/copy-prisma.cjs

# Verifica que existan los engines
ls -la .prisma/client/*.so.node

# Testea el build
npm run build
```

En Vercel deberías ver en los logs de build:

```
=== Copy Prisma Engine ===
Source: /vercel/path0/node_modules/.prisma/client
Dest: /vercel/path0/.prisma/client
Engine files in .prisma/client: [ 'libquery_engine-rhel-openssl-3.0.x.so.node' ]
Done!
```
