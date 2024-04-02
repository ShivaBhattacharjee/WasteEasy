import mongoose from "mongoose";

const wasteDumped = new mongoose.Schema({
    wasteNameByAi: {
        type: String,
    },
    wasteType: {
        type: String,
    },
    wastePoints: {
        type: Number,
        default: 0,
    },
    day: {
        type: Date,
        default: Date.now,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isWorker: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg",
    },
    userDescription: {
        type: String,
        default: "Hello there! I'm using AnimeTrix.",
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    totalPointsEarned: {
        type: Number,
        default: 0,
    },
    wasteDumped: {
        type: [wasteDumped],
        default: [],
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
