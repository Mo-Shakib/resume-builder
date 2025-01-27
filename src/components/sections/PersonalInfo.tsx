import { useState, useEffect } from 'react'
import { TextField, Grid } from '@mui/material'

interface PersonalInfoData {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
}

interface PersonalInfoProps {
  data: Partial<PersonalInfoData>
  onUpdate: (data: PersonalInfoData) => void
}

const PersonalInfo = ({ data, onUpdate }: PersonalInfoProps) => {
  const [formData, setFormData] = useState<PersonalInfoData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    ...data,
  })

  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  const handleChange = (field: keyof PersonalInfoData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange('fullName')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone"
          value={formData.phone}
          onChange={handleChange('phone')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Location"
          value={formData.location}
          onChange={handleChange('location')}
          placeholder="City, Country"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Professional Summary"
          multiline
          rows={4}
          value={formData.summary}
          onChange={handleChange('summary')}
        />
      </Grid>
    </Grid>
  )
}

export default PersonalInfo