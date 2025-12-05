<div align='center'>

<img src='/public/readme-images/miniatura-cuervored.png' >

 <img src='/public/readme-images/CuervoRed-LOGO.png' width='80px' >
 
<!-- <img src='/public/CuervoRed-LOGO-192x192.png'  width='60px' > -->

# 🩵❤️ Cuervored | Social Network
>  Social platform connecting fans of San Lorenzo de Almagro

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/) [![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)](https://www.prisma.io/) [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/) [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com/) [![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.x-2D3748?logo=next.js)](https://next-auth.js.org/) [![React Query](https://img.shields.io/badge/React%20Query-5.x-FF4154?logo=react-query)](https://tanstack.com/query/latest) [![Zod](https://img.shields.io/badge/Zod-3.x-8E44AD?logo=zod)](https://zod.dev/)
  
</div>

## 🎯 What & Why
### What is Cuervored?
CuervoRed is a production-grade, full-stack social network tailored for San Lorenzo fans. It delivers a seamless, real-time experience for sharing posts, following users, tracking match attendance, and engaging with the community. Built with a modern, scalable architecture, it leverages the best of the React/Next.js ecosystem, robust authentication, and a flexible NoSQL backend.

### Why I Built This
As a San Lorenzo fan, I thought about how to connect all supporters in an app dedicated exclusively to the club — a place to follow other fans, post updates, comment, debate, and even discover who you’ve shared the stadium with. When San Lorenzo plays at home, you can ‘check in’ through the app to say you’re going to the match, and you can also see who else has checked in.


### The Challenge
Build a interactive social plataform with maintainable code. And the most important thing is learn, learn and learn.

## ⚡ Highlights
- 🟪 **Architecture**
  - Modular Next.js App Router structure
  - Prisma ORM with MongoDB Atlas
  - Server/Client component separation
  - Centralized API route handling
- 🟦 **Performance**
  - React Query for caching and background updates
  - Dynamic imports and memoized components
  - Optimized image uploads and transformations
- 🟨 **Security**
  - NextAuth.js with JWT, OAuth, and credentials
  - Route-level middleware for access control
  - Zod-powered validation everywhere
- 🟫 **Real-Time & UX**
  - Infinite scroll, skeleton loaders, and toasts
  - Responsive, accessible UI (Radix, Tailwind)
  - Optimistic UI for posts, likes, and comments
- ⬜ **Observability & Quality**
  - Error boundaries for posts and async data
  - ESLint, strict TypeScript, and modular hooks



## 👁️ Pages Preview

### '/auth/login'
<img src='/public/readme-images/login.png' >

### '/auth/register'
<img src='/public/readme-images/register.png' >

### '/'
<img src='/public/readme-images/home.png' >

### '/' - Post Modal
<img src='/public/readme-images/post-modal.png' >

### '/:username' - My profile
<img src='/public/readme-images/perfil.png' >

### '/:username' - Edit Profile
<img src='/public/readme-images/editar-perfil.png' >


### '/:username' - Other profile
<img src='/public/readme-images/perfil-de-otro.png' >

### '/matches'
<img src='/public/readme-images/matches.png' >

### '/settings'
<img src='/public/readme-images/config.png' >

### '/match-attendance/:matchId'
<img src='/public/readme-images/quienes-van.png' >

### '/search?q=:query'
<img src='/public/readme-images/search.png' >




## 🛠️ Technology Stack
### Core Framework

| Technology | Version | Purpose              | Key Packages                           |
| ---------- | ------- | -------------------- | -------------------------------------- |
| Next.js    | 14.x    | Full-stack framework | `next`, `next-auth`, `@next/bundle-analyzer` |
| TypeScript | 5.x     | Type safety          | `typescript`                             |

### API & Real-Time

| Technology  | Version | Purpose               | Key Packages          |
| ----------- | ------- | --------------------- | --------------------- |
| React Query | 5.x     | Data fetching/caching | `@tanstack/react-query` |
| Axios       | 1.x     | HTTP client           | `axios`                 |

### Database & Storage

| Technology | Version | Purpose         | Key Packages              |
| ---------- | ------- | --------------- | ------------------------- |
| Prisma     | 5.x     | ORM, migrations | `prisma`, `@prisma/client`    |
| MongoDB    | Atlas   | NoSQL database  | mongodb (Atlas)           |
| Cloudinary | -       | Image storage   | `browser-image-compression` |

### Security

| Technology  | Version | Purpose           | Key Packages                    |
| ----------- | ------- | ----------------- | ------------------------------- |
| NextAuth.js | 5.x     | Auth (OAuth, JWT) | `next-auth`, `@auth/prisma-adapter` |
| Zod         | 3.x     | Validation        | `zod`                             |
| bcryptjs    | 2.x     | Password hashing  | `bcryptjs`       |

### UX/UI

| Technology   | Version | Purpose           | Key Packages                        |
| ------------ | ------- | ----------------- | ----------------------------------- |
| Tailwind CSS | 3.x     | Utility-first CSS | tailwindcss, tailwind-merge         |
| Shadcn       |         | UI framework      | `@radix-ui/react-\*` , lucide-react |

## ⭐ Features
### Auth & User Management

- ✅ OAuth (GitHub, Google) and credentials login
- ✅ JWT session management
- ✅ Profile editing with avatar upload and bio
- ✅ Follow/unfollow users

### Social Feed & Posts

- ✅ Infinite scroll feed (For You, Following)
- ✅ Create, edit, and delete posts with image upload
- ✅ Like/unlike posts
- ✅ Comment on posts (with validation)
- ✅ Optimistic UI for likes/comments

### Match Attendance

- ✅ Track attendance for upcoming matches
- ✅ View who is attending each match
- ✅ Attendance expiration and status

### Search & Discovery

- ✅ User search with instant results
- ✅ Who to follow suggestions

### UI/UX & Quality

- ✅ Responsive, accessible design
- ✅ Skeleton loaders and toasts
- ✅ Error boundaries for async data
- ✅ Dark/light theme support


## 🚀 Quick Start
**Prerequisites**

- Node.js >= 18.x
- npm >= 9.x (or yarn/pnpm)
- MongoDB Atlas account
- Cloudinary account (for image uploads)

**Installation**

1. Clone the repository
   ```sh
   git clone https://github.com/valentinzoia/cuervored.git
   cd next-prisma-auth
   ```
2. Install dependencies
   ```sh
   npm install
   # or
   yarn install
   ```
3. Copy and configure environment variables
   ```sh
   cp .env.example .env.local
   # Fill in MongoDB, Cloudinary, NextAuth, and OAuth credentials
   ```
4. Run Prisma migrations and generate client
   ```sh
   npx prisma generate
   npx prisma migrate deploy
   ```
5. Start the development server
   ```sh
   npm run dev
   ```

**Optional: Docker Compose**

- Add your own `docker-compose.yml` for local MongoDB/Cloudinary emulation if needed.

## 📚 Project Structure
```
cuervored/
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app directory (routing, layouts, pages)
│   ├── components/   # UI and feature components (modular, domain-driven)
│   ├── data/         # Data fetching and API logic
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utilities, Prisma client, validation schemas
│   ├── routes/       # Route definitions and middleware
│   ├── types/        # TypeScript types and Prisma payloads
│   └── utils/        # Utility functions (image, date, etc.)
├── tailwind.config.ts
├── package.json
└── ...
```

- **app/**: Next.js App Router, layouts, and route handlers
- **components/**: Feature and UI components, grouped by domain
- **data/**: API/data access logic, separated from UI
- **lib/**: Prisma client, Zod schemas, and shared utilities
- **routes/**: Route config and middleware for access control
- **types/**: Centralized TypeScript types for strong typing


## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

- **Author:** Valentín Zoia
- **Email:** zoiavalentin.dev@gmail.com
- **LinkedIn:** [Profile](https://linkedin.com/in/valentinzoia)
- **Portfolio:** [Website](https://valentinzoia.vercel.app)

---

**Built with ❤️ and best practices**
