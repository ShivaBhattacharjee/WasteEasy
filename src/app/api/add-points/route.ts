import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helpers/jwtData";
import User from "@/models/users.model";
import { Error } from "@/types/ErrorTypes";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { isRecycleable, wasteNameByAi, wasteType, latitude, longitude } = reqBody;
        const userId = getDataFromJwt(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!(isRecycleable || wasteNameByAi || wasteType || latitude || longitude)) {
            return NextResponse.json({ error: "All body params required" });
        }
        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 400 });
        }
        console.log(user);

        if (isRecycleable == "true") {
            user.totalPointsEarned += 12;
        } else {
            user.totalPointsEarned += 5;
        }
        user.wasteDumped.push({
            wasteNameByAi: wasteNameByAi,
            wasteType: wasteType,
            wastePoints: isRecycleable == "true" ? 12 : 5,
            latitude: latitude,
            longitude: longitude,
        });

        const data = await user.save();

        return NextResponse.json({
            message: "points credited",
            data: data,
            success: true,
        });
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: 500 });
    }
}
