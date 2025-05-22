"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import styled from 'styled-components'
import { SectionTitle, SubTitle, Caption } from '@/components/GlobalStyles';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.div`
  padding: 0.75rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.foreground};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: inherit;
`

const ThankYouPage: React.FC = () => {
  return (
    <Container>
        <SectionTitle style={{ textAlign: 'center', marginTop: '5rem' }}>
        <Image
            src="/assets/icon-1.png"
            width={100}
            height={100}
            alt="Success Icon"
            style={{ marginBottom: '2rem' }}
        />
        <SubTitle>
            Thank You!
        </SubTitle>
        <Caption style={{ marginBottom: "1.5rem" }}>
            Your information was submitted to our team of immigration attorneys.
            Expect an email from hello@tryalma.ai
        </Caption>
        <Link href="/">
            <Button>Go Back to Homepage</Button>
        </Link>
        </SectionTitle>
    </Container>
  );
};

export default ThankYouPage;
