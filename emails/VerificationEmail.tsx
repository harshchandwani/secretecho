import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here's your verification code – let's get you started!</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hey {username}!</Heading>
        </Row>
        <Row>
          <Text>
            🎉 Welcome aboard! We're thrilled to have you with us. To finish
            setting up your account, simply use the magic code below:
          </Text>
        </Row>
        <Row>
          <Text
            style={{ fontWeight: "bold", fontSize: "20px", color: "#4CAF50" }}
          >
            {otp}
          </Text>
        </Row>
        <Row>
          <Text>
            If you didn’t request this, no worries – just ignore this email. But
            if you did, you’re all set to go!
          </Text>
        </Row>
        {/* <Row>
              <Button
                href={`http://localhost:3000/verify/${username}`}
                style={{ color: '#61dafb' }}
              >
                Verify Now
              </Button>
            </Row> */}
      </Section>
    </Html>
  );
}
