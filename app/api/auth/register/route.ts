import { hashPassword } from '@/app/lib/auth';
import prisma  from '@/app/lib/db';
import { Role } from '@/app/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, teamCode } = await request.json();
        if (!name || !email || !password) {
            return NextResponse.json({
                error: "Name, email & Password are the required fields"
            }, {
                status: 400
            })
        }

        // find existing user
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return NextResponse.json({
                error: "User with this email already exists"
            }, {
                status: 400
            })
        }

        let teamId: string | undefined;
        if (teamCode) {
            const team = await prisma.team.findUnique({
                where: {
                    code: teamCode
                }
            })
            if (!team) {
                return NextResponse.json({
                    error: "Please enter the valid Team code"
                }, {
                    status: 400
                })
            }
            teamId = team.id;
        }

        const hashedPassword = await hashPassword(password);
        // first user becomes admin and other user
        const userCount = await prisma.user.count();
        const role = userCount === 0 ? Role.ADMIN : Role.USER;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                teamId
            },
            include: {
                team:true
            }
        })



    } catch (error) {

    }
}