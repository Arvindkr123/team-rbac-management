import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { Role, User } from "@/app/types";
import { prisma } from "@/prisma/seed";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, context: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await context.params;
        const currentUser = await getCurrentUser();
        if (!currentUser || !checkUserPermission(currentUser as User, Role.ADMIN)) {
            return NextResponse.json({
                message: "You are not authorized to assign team"
            }, { status: 401 })
        }
        if (userId === currentUser.id) {
            return NextResponse.json({
                message: "You can not change your own role"
            }, { status: 401 })
        }

        const { role } = await request.json()
        // validate role
        const validateRole = [Role.ADMIN, Role.MANAGER];
        if (!validateRole.includes(role)) {
            return NextResponse.json({
                message: "Invalid role, or you can not have more than one ADMIN role"
            }, { status: 401 })
        }
        // update user team assignment
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: role
            },
            include: {
                team: true
            }
        })

        return NextResponse.json({
            user: updatedUser,
            message: `user role updated to ${role} successfully`
        })

    } catch (error) {
        console.log("Role assignment error", error);
        if (error instanceof Error && error.message.includes("Record to update not found")) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 })
        }
        return NextResponse.json({
            error: "Internal server error, something went wrong"
        }, { status: 500 })
    }
}