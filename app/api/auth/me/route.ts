import { getCurrentUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        console.log('user is ', user);
        if (!user) {
            return NextResponse.json({
                error: "You are not authenticated"
            }, {
                status: 401
            })
        }
        return NextResponse.json(user);
    } catch (error) {
        console.log("error from get user details", error);
        return NextResponse.json({
            error: "Internal server error, something went wrong"
        }, {
            status: 500
        })
    }
}