import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number:"9098320501",
            password:"hello"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}