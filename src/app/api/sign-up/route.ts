import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            },
                {
                    status: 400
                })
        }
        const existingUserbyEmail = await UserModel.findOne({ email });

        // Generate a random 6-digit verification code as a string
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Example: If Math.random() returns 0.6789, the verifyCode would be "711010"

        if (existingUserbyEmail) {
            if (existingUserbyEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already Exists with the Email."
                }, { status: 400 })
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserbyEmail.password = hashedPassword;
                existingUserbyEmail.verifyCode = verifyCode;
                existingUserbyEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserbyEmail.save();
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            //Set Expiry hours for verify code
            const expiryDate = new Date();
            //here date is an object and we have refernce to an object, so it does not matter, wheather expiryDate is a const or var, we can change the innner
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = await new UserModel({
                username: username,
                email: email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessge: true,
                messages: [],
            })

            await newUser.save();
        }

        //send Verification Email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "User registerd successfully. Please verify your Email"
        },
            {
                status: 200
            })

    }
    catch (error) {
        console.log('Error Registering User', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}



/*
Code should effectively handles both the scenerios of registering a new user and updading an existing 
but unverified user account with a new password and verification code

IF existingUserByEmail EXISTS THEN
    IF existingUserByEmail.IsVerifed THEN
        success: false
    ELSE
        save the updated user
    END IF
ELSE
    Create a new user with the provided details
    Save the new user
END IF
*/