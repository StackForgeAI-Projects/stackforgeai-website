import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Props {
  name: string;
  email: string;
  company?: string;
  message: string;
  ip?: string;
  userAgent?: string;
}

const main: React.CSSProperties = {
  backgroundColor: "#0b1117",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  color: "#e6ecef",
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: 600,
};

const card: React.CSSProperties = {
  backgroundColor: "#141a22",
  border: "1px solid #1f2832",
  borderRadius: 16,
  padding: 28,
};

const label: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: "#22c55e",
  fontWeight: 600,
  margin: "0 0 6px",
};

const value: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: 15,
  lineHeight: "22px",
  color: "#e6ecef",
};

const meta: React.CSSProperties = {
  fontSize: 12,
  color: "#94a3b8",
  margin: "4px 0",
};

export function ContactNotificationEmail({ name, email, company, message, ip, userAgent }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New website enquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={{ color: "#22c55e", fontSize: 22, margin: "0 0 8px" }}>
            StackForgeAI · New enquiry
          </Heading>
          <Text style={{ ...meta, marginBottom: 24 }}>
            A new contact form submission has arrived from stackforgeai.africa
          </Text>

          <Section style={card}>
            <Text style={label}>From</Text>
            <Text style={value}>
              {name} &lt;{email}&gt;
            </Text>

            {company ? (
              <>
                <Text style={label}>Company</Text>
                <Text style={value}>{company}</Text>
              </>
            ) : null}

            <Text style={label}>Message</Text>
            <Text style={{ ...value, whiteSpace: "pre-wrap" }}>{message}</Text>

            <Hr style={{ borderColor: "#1f2832", margin: "20px 0" }} />

            <Text style={meta}>Submitted: {new Date().toUTCString()}</Text>
            {ip ? <Text style={meta}>IP: {ip}</Text> : null}
            {userAgent ? <Text style={meta}>User-Agent: {userAgent}</Text> : null}
          </Section>

          <Text
            style={{
              ...meta,
              textAlign: "center" as const,
              marginTop: 24,
            }}
          >
            © StackForgeAI · Kigali, Rwanda
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
