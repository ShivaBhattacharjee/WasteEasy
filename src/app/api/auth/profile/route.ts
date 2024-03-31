import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { HTTP_STATUS } from "@/enums/enums";
import { getDataFromJwt } from "@/helpers/jwtData";
import User from "@/models/users.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const searchUser = searchParams.get("userId");

        let userId: number | string;

        if (searchUser) {
            userId = searchUser;
        } else {
            userId = getDataFromJwt(request);
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json(
                {
                    error: "Invalid userId format",
                },
                {
                    status: HTTP_STATUS.BAD_REQUEST,
                },
            );
        }

        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: HTTP_STATUS.NOT_FOUND,
                },
            );
        }
        return NextResponse.json({
            message: "User found",
            userData: user,
        });
    } catch (error: unknown) {
        const err = error as Error;
        return NextResponse.json(
            {
                error: err.message,
            },
            {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            },
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userId = getDataFromJwt(request);
        const { username, profilePicture, userDescription, state, city } = reqBody;
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: HTTP_STATUS.NOT_FOUND,
                },
            );
        }
        if (username) {
            user.username = username;
        }
        if (profilePicture) {
            user.profilePicture = profilePicture;
        }
        if (userDescription) {
            user.userDescription = userDescription;
        }
        if (state) {
            user.state = state;
        }
        if (city) {
            user.city = city;
        }
        await user.save();
        return NextResponse.json(
            {
                message: "User updated",
                userData: user,
            },
            {
                status: HTTP_STATUS.OK,
            },
        );
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json(
            {
                error: Error.message,
            },
            {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            },
        );
    }
}
