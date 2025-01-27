import { useState, useEffect } from 'react'
import { TextField, Grid, Button, IconButton, Box, Typography } from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

interface EducationItem {
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
}

interface EducationProps {
  data: EducationItem[]
  onUpdate: (data: EducationItem[]) => void
}

const Education = ({ data, onUpdate }: EducationProps) => {
  const [educations, setEducations] = useState<EducationItem[]>(data || [])

  useEffect(() => {
    onUpdate(educations)
  }, [educations, onUpdate])

  const handleAdd = () => {
    setEducations([...educations, {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }])
  }

  const handleDelete = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: keyof EducationItem) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEducations = [...educations]
    newEducations[index] = {
      ...newEducations[index],
      [field]: event.target.value
    }
    setEducations(newEducations)
  }

  return (
    <Box>
      {educations.map((edu, index) => (
        <Box key={index} sx={{ mb: 4, position: 'relative' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Education {index + 1}
                <IconButton
                  onClick={() => handleDelete(index)}
                  sx={{ position: 'absolute', right: 0, top: 0 }}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="School/University"
                value={edu.school}
                onChange={handleChange(index, 'school')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                value={edu.degree}
                onChange={handleChange(index, 'degree')}
                placeholder="e.g., Bachelor's, Master's"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Field of Study"
                value={edu.field}
                onChange={handleChange(index, 'field')}
                placeholder="e.g., Computer Science"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={edu.startDate}
                onChange={handleChange(index, 'startDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={edu.endDate}
                onChange={handleChange(index, 'endDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GPA"
                value={edu.gpa}
                onChange={handleChange(index, 'gpa')}
                placeholder="Optional"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={handleAdd}
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Education
      </Button>
    </Box>
  )
}

export default Education