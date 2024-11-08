// src/types/Post.ts

export type Post = {
    id: string;
    content: string;
    createdAt: Date; // Prisma likely returns a Date object
    image?: string | null; // Puede ser opcional o nulo
    likes: string[]; // Un array de IDs de usuarios que le dieron "like"
    userId: string; // ID del usuario que creó el post
    user: {
      name: string | null; // Puede ser null si el nombre no está disponible
      image: string | null; // Puede ser null si el usuario no tiene imagen
    };
  };

  export interface PostsPage {
    posts: Post[];
    nextCursor: string | null;
  }