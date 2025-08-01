import { User } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            } & Partial<User>;
        }
    }
}