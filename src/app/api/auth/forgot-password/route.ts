import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { HTTP_STATUS } from "@/enums/enums";
import { sendEmail } from "@/helpers/Email";
import User from "@/models/users.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;

        const user = await User.findOne({ email: email });
        if (!user) return NextResponse.json({ error: "No user found" }, { status: HTTP_STATUS.BAD_REQUEST });

        await sendEmail({
            email,
            emailType: "RESET_PASSWORD_USER",
            userId: user._id,
        });
        return NextResponse.json({ message: "Reset Password Email Sent.", success: true });
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
    }
}
