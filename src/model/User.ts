import mongoose, { Schema, Document } from "mongoose";
/*
Schema is used so that, we do not have to write it again and again
Document is necessary when we use Typescript to define the elements
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
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessge: boolean;
    messages: Message[];
}
//Schema<Message> is for type safety
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
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, "Please Enter a Valid Password"] //We will check on this
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"]
    },
    verifyCodeExpiry: {
        type: Date
    },
    isAcceptingMessge: {
        type: Boolean,
        default: true
    },
    messages: [
        MessageSchema
    ]
})
// Check if the User model is already defined in Mongoose models. 
// If it is, use the existing model. This prevents redefining the model, 
// which can cause errors if the code is run multiple times (e.g., in serverless functions).
// If the User model is not defined, define a new model using the UserSchema.
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;