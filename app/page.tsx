'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { addLead, Lead } from '@/lib/features/leadsSlice'
import { useState } from 'react'
import {
  Container,
  FormContainer,
  Logo,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  Button,
  ErrorMessage,
  SuccessMessage,
} from '@/components/GlobalStyles'

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  linkedInProfile: Yup.string().url('Invalid URL').required('LinkedIn profile is required'),
  country: Yup.string().required('Country is required'),
  visasOfInterest: Yup.array().min(1, 'Select at least one visa type'),
  resume: Yup.mixed().required('Resume is required'),
  additionalInfo: Yup.string(),
})

const VISA_OPTIONS = [
  'O-1 Visa',
  'H-1B Visa',
  'L-1 Visa',
  'E-2 Visa',
  'EB-1 Visa',
  'EB-2 Visa',
  'EB-3 Visa',
]

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'China',
  'India',
  'Brazil',
  'Germany',
  'France',
  'Japan',
  'Indonesia'
]

export default function Home() {
  const dispatch = useDispatch()
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      linkedInProfile: '',
      country: '',
      visasOfInterest: [] as string[],
      resume: undefined as File | undefined,
      additionalInfo: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!values.resume) return

      try {
        // Mock API call
        const lead: Lead = {
          id: Date.now().toString(),
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          linkedInProfile: values.linkedInProfile,
          country: values.country,
          visasOfInterest: values.visasOfInterest,
          resumeUrl: URL.createObjectURL(values.resume),
          additionalInfo: values.additionalInfo,
          status: 'Pending',
          submittedAt: new Date().toISOString(),
        }
        
        dispatch(addLead(lead))
        setSubmitSuccess(true)
        resetForm()
        
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
  })

  return (
    <Container>
      <FormContainer>
        <Logo>almå</Logo>
        <Title>Get An Assessment Of Your Immigration Case</Title>
        
        {submitSuccess && (
          <SuccessMessage>
            Thank you! Your information has been successfully submitted.
          </SuccessMessage>
        )}

        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </FormGroup>


          <FormGroup>
            <Label htmlFor="country">Country</Label>
            <Select
              id="country"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <ErrorMessage>{formik.errors.country}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="linkedInProfile">LinkedIn Profile</Label>
            <Input
              id="linkedInProfile"
              name="linkedInProfile"
              type="url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.linkedInProfile}
            />
            {formik.touched.linkedInProfile && formik.errors.linkedInProfile && (
              <ErrorMessage>{formik.errors.linkedInProfile}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="visasOfInterest">Visas of Interest</Label>
            <Select
              id="visasOfInterest"
              name="visasOfInterest"
              multiple
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.visasOfInterest}
            >
              {VISA_OPTIONS.map((visa) => (
                <option key={visa} value={visa}>
                  {visa}
                </option>
              ))}
            </Select>
            {formik.touched.visasOfInterest && formik.errors.visasOfInterest && (
              <ErrorMessage>{formik.errors.visasOfInterest as string}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="resume">Resume/CV</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0]
                if (file) {
                  formik.setFieldValue('resume', file)
                }
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resume && formik.errors.resume && (
              <ErrorMessage>{formik.errors.resume as string}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <TextArea
              id="additionalInfo"
              name="additionalInfo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.additionalInfo}
            />
          </FormGroup>

          <Button type="submit" disabled={formik.isSubmitting}>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </Container>
  )
}
