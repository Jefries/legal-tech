'use client'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
`

export const FormContainer = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100%;
  max-width: 600px;
`

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 3rem;
  margin-bottom: 2rem;
`

export const SubTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

export const Caption = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 1rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.5;
  }

  &[type="file"] {
    /* Hide the default file input button */
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    top: 0;
    left: 0;
  }
`

export const CustomFileInput = styled.div`
  padding: 0.75rem;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  height: 4rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.secondary}; 
  opacity: 0.5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background-color: #f5f5f5; 

  &:focus-within {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`

export const Select = styled.select`
  padding: 0.75rem; 
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  font-family: inherit;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  position: relative;

  option {
    color: ${({ theme }) => theme.colors.text};
  }

  option[disabled] {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.5;
  }

  &[multiple] {
    height: 120px;
    background-image: none;
    padding: 0.75rem; 
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; 
  color: #868686; 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-right: 0.5rem;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  /* Hide default checkbox */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0; 

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}DD;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.lightGreen};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`

export const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 468px;
  background-color: #D4D99B;
  background-image: url('/assets/bg-hero.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
`

export const HeroWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-flow: column;
  width: 50%;
  height: auto;
  margin: auto 0;
`

export const SectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 1.5rem;
`
