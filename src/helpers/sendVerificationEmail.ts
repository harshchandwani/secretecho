import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        // Send the email using the resend function
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Verify Your Email Address | Secret Echo",
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        return { success: true, message: 'Verification email sent successfully' };
    } catch (error) {
        console.error("Error sending verification email:", error);
        return { success: false, message: 'Failed to send verification email. Please try again later.' };
    }
}
