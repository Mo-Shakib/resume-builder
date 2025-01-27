import { useState, useEffect } from 'react'
import { TextField, Grid, Button, Chip, Box } from '@mui/material'

interface SkillsProps {
  data: string[]
  onUpdate: (data: string[]) => void
}

const Skills = ({ data, onUpdate }: SkillsProps) => {
  const [skills, setSkills] = useState<string[]>(data || [])
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    onUpdate(skills)
  }, [skills, onUpdate])

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleDeleteSkill = (skillToDelete: string) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete))
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a skill and press Enter"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
          >
            Add Skill
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleDeleteSkill(skill)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Skills