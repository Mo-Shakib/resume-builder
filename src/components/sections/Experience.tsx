import { useState, useEffect } from 'react'
import { TextField, Grid, Button, IconButton, Box, Typography } from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

interface ExperienceItem {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceProps {
  data: ExperienceItem[]
  onUpdate: (data: ExperienceItem[]) => void
}

const Experience = ({ data, onUpdate }: ExperienceProps) => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(data || [])

  useEffect(() => {
    onUpdate(experiences)
  }, [experiences, onUpdate])

  const handleAdd = () => {
    setExperiences([...experiences, {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }])
  }

  const handleDelete = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: keyof ExperienceItem) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newExperiences = [...experiences]
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: event.target.value
    }
    setExperiences(newExperiences)
  }

  return (
    <Box>
      {experiences.map((exp, index) => (
        <Box key={index} sx={{ mb: 4, position: 'relative' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Experience {index + 1}
                <IconButton
                  onClick={() => handleDelete(index)}
                  sx={{ position: 'absolute', right: 0, top: 0 }}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={exp.company}
                onChange={handleChange(index, 'company')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                value={exp.position}
                onChange={handleChange(index, 'position')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={exp.startDate}
                onChange={handleChange(index, 'startDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={exp.endDate}
                onChange={handleChange(index, 'endDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={exp.description}
                onChange={handleChange(index, 'description')}
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
        Add Experience
      </Button>
    </Box>
  )
}

export default Experience