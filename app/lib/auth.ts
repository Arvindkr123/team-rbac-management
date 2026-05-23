import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Role, User } from "../types";
import { cookies, headers } from "next/headers";
import {prisma}  from "./db";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}
export async function verifyPassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
}
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET as string, {
        expiresIn: '7d'
    })
}
export function verifyToken(token: string): { userId: string } {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
}

export function checkUserPermission(user:User, requiredRole:Role) : boolean {
    const roleHierarcy = {
        [Role.GUEST]:0,
        [Role.USER]:1,
        [Role.MANAGER]:2,
        [Role.ADMIN]:3,
    }
    return roleHierarcy[user.role] > roleHierarcy[requiredRole];
}

export async function getCurrentUser() {
    try {
        let token: string | undefined;

        // First check cookies
        const cookieStore = await cookies();
        token = cookieStore.get("token")?.value;

        // Then check Authorization header
        if (!token) {
            const headersList = await headers();
            const authorization = headersList.get("authorization");
            if (authorization?.startsWith("Bearer ")) {
                token = authorization.split(" ")[1];
            }
        }

        if (!token) {
            console.log("No token found");
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string;
        };

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });

        return user;
    } catch (error) {
        console.log("getCurrentUser error", error);
        return null;
    }
}