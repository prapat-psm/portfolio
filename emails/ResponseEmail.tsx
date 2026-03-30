import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface ResponseEmailProps {
  company: string;
  email: string;
  tel: string;
}

export const ResponseEmail = ({
  company,
  email,
  tel,
}: ResponseEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for reaching out to us, {company}!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you for contacting us</Heading>
        <Text style={text}>
          Hi there,
        </Text>
        <Text style={text}>
          We have received your message and will be in touch shortly. Here is a summary of the information you provided:
        </Text>
        <Section style={detailsContainer}>
          <Text style={detailsText}><strong>Company:</strong> {company}</Text>
          <Text style={detailsText}><strong>Email:</strong> {email}</Text>
          <Text style={detailsText}><strong>Telephone:</strong> {tel}</Text>
        </Section>
        <Text style={text}>
          Best regards,<br />
          The Team
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  padding: '0 48px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 48px',
};

const detailsContainer = {
  backgroundColor: '#f8f9fa',
  padding: '16px 48px',
  margin: '24px 0',
  borderTop: '1px solid #e9ecef',
  borderBottom: '1px solid #e9ecef',
};

const detailsText = {
  margin: '0',
  color: '#495057',
  fontSize: '15px',
  lineHeight: '26px',
};

export default ResponseEmail;
