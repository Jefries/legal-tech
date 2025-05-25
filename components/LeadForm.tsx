import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormGroup,
  Input,
  TextArea,
  Select,
  Button,
  ErrorMessage,
  SubTitle,
  Caption,
  SectionTitle,
  SelectWrapper,
  SelectIcon, 
  CheckboxContainer, 
  CheckboxLabel,
  CheckboxInput, 
  CustomFileInput, 
} from '@/components/GlobalStyles';
import Image from 'next/image';
import { ChevronDown, Upload } from 'lucide-react'; 

const VISA_OPTIONS = [
  `O-1 Visa`,
  `EB-1A`,
  `EB-2 NIW`,
  `I don't know`,
];

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
];

interface FormikValues {
  firstName: string;
  lastName: string;
  email: string;
  linkedInProfile: string;
  country: string;
  visasOfInterest: string[];
  resume: File | undefined;
  additionalInfo: string;
}

interface LeadFormProps {
  submitSuccess: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ submitSuccess }) => {
  const formik = useFormikContext<FormikValues>();
  const router = useRouter();

  useEffect(() => {
    if (submitSuccess) {
      router.push('/thankyou');
    }
  }, [submitSuccess, router]);

  // If submitSuccess is true, the redirect will happen in useEffect,
  // so we don't need to render anything here or in the future we can add fail submit.
  if (submitSuccess) {
    return null;
  }

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <SectionTitle>
          <Image
            src="/assets/icon-1.png"
            width={60}
            height={60}
            alt="Icon Info"
            style={{ marginBottom: '1rem' }}
          />
          <SubTitle>
            Want to understand your visa options?
          </SubTitle>
          <Caption>
            Submit the form below and our team of experienced attorneys will review your information
            and send a preliminary assessment of your case based on your goals.
          </Caption>
        </SectionTitle>

        <FormGroup>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
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
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
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
          <Input
            id="email"
            name="email"
            placeholder="Email"
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
          <SelectWrapper> {/* Wrap Select with SelectWrapper */}
            <Select
              id="country"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            >
              <option value="" disabled hidden className="placeholder">Country of Citizenship</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
            <SelectIcon> {/* Add SelectIcon with ChevronDown */}
              <ChevronDown size={20} />
            </SelectIcon>
          </SelectWrapper>
          {formik.touched.country && formik.errors.country && (
            <ErrorMessage>{formik.errors.country}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Input
            id="linkedInProfile"
            name="linkedInProfile"
            placeholder="Linkedin / Personal Website URL"
            type="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.linkedInProfile}
          />
          {formik.touched.linkedInProfile && formik.errors.linkedInProfile && (
            <ErrorMessage>{formik.errors.linkedInProfile}</ErrorMessage>
          )}
        </FormGroup>

        <SectionTitle style={{ marginTop: "1rem"}}>
          <Image
            src="/assets/icon-2.png"
            width={60}
            height={60}
            alt="Icon Info"
            style={{ marginBottom: '1rem' }}
          />
          <SubTitle>
            Visa categories of interest?
          </SubTitle>
        </SectionTitle>

        <FormGroup>
          <CheckboxContainer>
            {VISA_OPTIONS.map((visa) => (
              <CheckboxLabel key={visa}>
                <CheckboxInput
                  type="checkbox"
                  name="visasOfInterest"
                  value={visa}
                  checked={formik.values.visasOfInterest.includes(visa)}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    let newVisasOfInterest = [...formik.values.visasOfInterest];
                    if (checked) {
                      newVisasOfInterest.push(value);
                    } else {
                      newVisasOfInterest = newVisasOfInterest.filter((v) => v !== value);
                    }
                    formik.setFieldValue('visasOfInterest', newVisasOfInterest);
                  }}
                  onBlur={formik.handleBlur}
                />
                {visa}
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
          {formik.touched.visasOfInterest && formik.errors.visasOfInterest && (
            <ErrorMessage>{formik.errors.visasOfInterest as string}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <SelectWrapper>
            <CustomFileInput>
              {formik.values.resume ? formik.values.resume.name : "Upload Resume or CV"}
              <Upload size={20} />
            </CustomFileInput>
            <Input
              id="resume"
              name="resume"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                formik.setFieldValue('resume', file);
              }}
              onBlur={formik.handleBlur}
            />
          </SelectWrapper>
          {formik.touched.resume && formik.errors.resume && (
            <ErrorMessage>{formik.errors.resume as string}</ErrorMessage>
          )}
        </FormGroup>

        <SectionTitle style={{ marginTop: "1rem"}}>
          <Image
            src="/assets/icon-3.png"
            width={60}
            height={60}
            alt="Icon Info"
            style={{ marginBottom: '1rem' }}
          />
          <SubTitle>
            How can we help you?
          </SubTitle>
        </SectionTitle>

        <FormGroup>
          <TextArea
            id="additionalInfo"
            name="additionalInfo"
            placeholder="What is your current status and when does it expire?"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additionalInfo}
          />
        </FormGroup>

        <Button type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LeadForm;
