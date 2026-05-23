import { Prisma, Role } from "@/app/generated/prisma/client";
import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({
                error: "You are not authorized to access the use information"
            }, {
                status: 401
            })
        }
        const searchParams = request.nextUrl.searchParams;
        const teamId = searchParams.get('teamId');
        const role = searchParams.get('role')?.toUpperCase();
        const where: Prisma.UserWhereInput = {};
        if (user.role === Role.ADMIN) {

        } else if (user.role === Role.MANAGER) {
            where.OR = [
                {
                    teamId: user.teamId
                },
                {
                    role: user.role
                }
            ]
        } else {
            where.teamId = user.teamId;
            where.role = { not: Role.ADMIN }
        }

        if (teamId) {
            where.teamId = teamId;
        }
        if (role && Object.values(Role).includes(role as Role)) {
            where.role = role as Role;
        }

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                team: {
                    select: { id: true, name: true }
                },
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(users);
    } catch (error) {
        console.log("error from get user", error);
        return NextResponse.json({
            error: "Internal server error, something went wrong"
        }, {
            status: 500
        })
    }
}