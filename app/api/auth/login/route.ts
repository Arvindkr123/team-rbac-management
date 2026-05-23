import { generateToken, hashPassword, verifyPassword } from '@/app/lib/auth';
import {prisma}  from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if ( !email || !password) {
            return NextResponse.json({
                error: "email & Password are the required fields"
            }, {
                status: 400
            })
        }

        // find existing user
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include:{
                team:true
            }
        })

        if (!user) {
            return NextResponse.json({
                error: "Invalid credentials"
            }, {
                status: 401
            })
        }
        const isValidPassword = await verifyPassword(password, user.password);
         if (!isValidPassword) {
            return NextResponse.json({
                error: "Invalid credentials"
            }, {
                status: 401
            })
        }
        // generate token
        const token = generateToken(user.id);
        const response =  NextResponse.json({
            user:{
                email:user.email,
                name:user.name,
                id:user.id,
                role:user.role,
                teamId:user.teamId,
                team:user.team,
                token,
            }
        })

        // set cookie
        response.cookies.set(
            "token",
            token,
            {
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                sameSite:'lax',
                maxAge:60*60*24*7,
                path: "/",
            }
        )
        return response;
    } catch (error) {
        console.error("login failed");
        return NextResponse.json({
            error:"Internal server error, Something went wrong"
        },{
            status:500
        }) 
    }
}