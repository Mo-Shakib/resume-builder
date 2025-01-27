import { useState } from 'react'
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PersonalInfo from './sections/PersonalInfo'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Skills from './sections/Skills'
import ResumePreview from './ResumePreview'

const steps = ['Personal Info', 'Experience', 'Education', 'Skills']

const ResumeBuilder = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleUpdateData = (section: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfo
            data={resumeData.personalInfo}
            onUpdate={(data) => handleUpdateData('personalInfo', data)}
          />
        )
      case 1:
        return (
          <Experience
            data={resumeData.experience}
            onUpdate={(data) => handleUpdateData('experience', data)}
          />
        )
      case 2:
        return (
          <Education
            data={resumeData.education}
            onUpdate={(data) => handleUpdateData('education', data)}
          />
        )
      case 3:
        return (
          <Skills
            data={resumeData.skills}
            onUpdate={(data) => handleUpdateData('skills', data)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            {renderStepContent()}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <PDFDownloadLink
                  document={<ResumePreview data={resumeData} />}
                  fileName="resume.pdf"
                >
                  {({ loading }) => (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      {loading ? 'Generating PDF...' : 'Download PDF'}
                    </Button>
                  )}
                </PDFDownloadLink>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Box sx={{ mt: 2 }}>
              <ResumePreview data={resumeData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ResumeBuilder