'use client'

import { useDispatch } from 'react-redux'
import { addLead, Lead } from '@/lib/features/leadsSlice'
import { useState } from 'react'
import {
  Container,
  HeroSection,
  HeroWrapper,
  FormContainer,
  Title,
} from '@/components/GlobalStyles'
import LeadForm from '../components/LeadForm'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Logo } from '@/public/assets/logo'

export default function Home() {
  const dispatch = useDispatch()
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    linkedInProfile: '',
    country: '',
    visasOfInterest: [] as string[],
    resume: undefined as File | undefined,
    additionalInfo: '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    linkedInProfile: Yup.string().url('Invalid URL').required('LinkedIn profile is required'),
    country: Yup.string().required('Country is required'),
    visasOfInterest: Yup.array().min(1, 'Select at least one visa type'),
    resume: Yup.mixed<File>()
      .required('Resume is required')
      .test(
        'fileFormat',
        'Only PDF and DOC/DOCX files are allowed.',
        (value) => {
          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ];
          return allowedTypes.includes(value.type);
        }
      ),
    additionalInfo: Yup.string(),
  })

  const handleSubmit = async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
    if (!values.resume) return

    try {
      // Mock API call
      // Create a stable timestamp for both id and submittedAt
      const timestamp = Date.now()
      const resumeUrl = typeof window !== 'undefined' ? URL.createObjectURL(values.resume) : ''
      
      const lead: Lead = {
        id: timestamp.toString(),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        linkedInProfile: values.linkedInProfile,
        country: values.country,
        visasOfInterest: values.visasOfInterest,
        resumeUrl,
        additionalInfo: values.additionalInfo,
        status: 'Pending',
        submittedAt: new Date(timestamp).toISOString(),
      }

      dispatch(addLead(lead))
      setSubmitSuccess(true)
      resetForm()

      // Cleanup the object URL after a delay to ensure it's available for any immediate use
      setTimeout(() => {
        if (resumeUrl) {
          URL.revokeObjectURL(resumeUrl)
        }
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Container>
      <HeroSection>
        <HeroWrapper>
          <Logo width={100} height={40}/>
          <Title>Get An Assessment Of Your Immigration Case</Title>
        </HeroWrapper>
      </HeroSection>

      <FormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <LeadForm submitSuccess={submitSuccess} />
        </Formik>
      </FormContainer>
    </Container>
  )
}
