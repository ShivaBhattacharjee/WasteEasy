import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helpers/jwtData";
import User from "@/models/users.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { isRecycleable } = reqBody;
        const userId = getDataFromJwt(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 400 });
        }
        console.log(user);

        user.totalPointsEarned += isRecycleable ? 12 : 5;

        await user.save();

        return NextResponse.json({
            message: "Updated Token successfully",
            success: true,
        });
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500 });
    }
}
