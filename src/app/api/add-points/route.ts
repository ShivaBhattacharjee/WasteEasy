import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { getDataFromJwt } from "@/helpers/jwtData";
import User from "@/models/users.model";
import { Error } from "@/types/ErrorTypes";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { wastepoints, wasteNameByAi, pointsEarned, isRecyleable, wasteType, latitude, longitude, service, discount, CouponCode } = reqBody;
        const userId = getDataFromJwt(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!(pointsEarned || wasteNameByAi || wasteType || latitude || longitude)) {
            return NextResponse.json({ error: "All body params required" });
        }
        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 400 });
        }
        console.log(user);

        user.totalPointsEarned += wastepoints;
        const wasteData = user.wasteDumped.push({
            wasteNameByAi: wasteNameByAi,
            wasteType: wasteType,
            wastePoints: wastepoints,
            latitude: latitude,
            longitude: longitude,
            isRecyleable: isRecyleable,
        });
        console.log("Waste Data", wasteData);
        user.coupons.push({
            discount: discount,
            service: service,
            code: CouponCode,
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
