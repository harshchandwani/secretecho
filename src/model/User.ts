import mongoose, { Schema, Document } from "mongoose";
/*
Schema is used so that, we do not have to write it again and again
Document is necessary when we use Typescript
*/
export interface Message extends Document {
    content: string;
    createdAt: Date
}
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: string;
    isVerified: boolean;
    isAcceptingMessge: boolean;
    message: Message[];
}
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, "Please Enter a Valid Password"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"]
    },
    verifyCodeExpiry: {
        type: String,
        required: [true, "Verify Code Expiry is required"]
    },
    isAcceptingMessge: {
        type: Boolean,
        required: [true, "Accepting Message is required"]
    },
    message: {
        type: Message[],
        required: [true, "Verify Code is required"]
    }
})