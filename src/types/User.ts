export type User = {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    role: string | null;
    image: string | null;
    provider: string | null;
    createdAt: Date;
    updatedAt: Date;
}