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

interface NotificationEmailProps {
  company: string;
  email: string;
  tel: string;
}

export const NotificationEmail = ({
  company,
  email,
  tel,
}: NotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission from {company}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Submission</Heading>
        <Text style={text}>
          You have received a new message from your portfolio contact form.
        </Text>
        <Section style={detailsContainer}>
          <Text style={detailsText}><strong>Company:</strong> {company}</Text>
          <Text style={detailsText}><strong>Email:</strong> {email}</Text>
          <Text style={detailsText}><strong>Telephone:</strong> {tel}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#111111',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '20px 0 48px',
  borderRadius: '8px',
  maxWidth: '580px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 48px',
};

const text = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 48px',
};

const detailsContainer = {
  backgroundColor: '#f3f4f6',
  padding: '16px 48px',
  margin: '24px 0',
};

const detailsText = {
  margin: '0 0 8px',
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
};

export default NotificationEmail;
