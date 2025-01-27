import { Box, TextField, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResumeStore } from '../store/resumeStore';

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceSectionProps {
  id: string;
  content: {
    experiences?: Experience[];
  };
}

export function ExperienceSection({ id, content }: ExperienceSectionProps) {
  const { updateSection } = useResumeStore();

  const handleAddExperience = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    updateSection(id, {
      experiences: [...(content.experiences || []), newExperience]
    });
  };

  const handleExperienceChange = (index: number, field: keyof Experience) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newExperiences = [...(content.experiences || [])];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: event.target.value
    };
    updateSection(id, { experiences: newExperiences });
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = [...(content.experiences || [])];
    newExperiences.splice(index, 1);
    updateSection(id, { experiences: newExperiences });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>Work Experience</Typography>
      {(content.experiences || []).map((experience, index) => (
        <Box key={index} sx={{ mb: 3, position: 'relative' }}>
          <IconButton
            size="small"
            onClick={() => handleRemoveExperience(index)}
            sx={{ position: 'absolute', right: 0, top: 0 }}
          >
            <DeleteIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Company"
              value={experience.company}
              onChange={handleExperienceChange(index, 'company')}
              fullWidth
            />
            <TextField
              label="Position"
              value={experience.position}
              onChange={handleExperienceChange(index, 'position')}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                value={experience.startDate}
                onChange={handleExperienceChange(index, 'startDate')}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="End Date"
                type="date"
                value={experience.endDate}
                onChange={handleExperienceChange(index, 'endDate')}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
            <TextField
              label="Description"
              multiline
              rows={3}
              value={experience.description}
              onChange={handleExperienceChange(index, 'description')}
              fullWidth
            />
          </Box>
        </Box>
      ))}
      <Button variant="outlined" onClick={handleAddExperience} fullWidth>
        Add Experience
      </Button>
    </Box>
  );
}