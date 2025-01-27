import { Box, TextField, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResumeStore } from '../store/resumeStore';

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface EducationSectionProps {
  id: string;
  content: {
    education?: Education[];
  };
}

export function EducationSection({ id, content }: EducationSectionProps) {
  const { updateSection } = useResumeStore();

  const handleAddEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    updateSection(id, {
      education: [...(content.education || []), newEducation]
    });
  };

  const handleEducationChange = (index: number, field: keyof Education) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEducation = [...(content.education || [])];
    newEducation[index] = {
      ...newEducation[index],
      [field]: event.target.value
    };
    updateSection(id, { education: newEducation });
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = [...(content.education || [])];
    newEducation.splice(index, 1);
    updateSection(id, { education: newEducation });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>Education</Typography>
      {(content.education || []).map((education, index) => (
        <Box key={index} sx={{ mb: 3, position: 'relative' }}>
          <IconButton
            size="small"
            onClick={() => handleRemoveEducation(index)}
            sx={{ position: 'absolute', right: 0, top: 0 }}
          >
            <DeleteIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Institution"
              value={education.institution}
              onChange={handleEducationChange(index, 'institution')}
              fullWidth
            />
            <TextField
              label="Degree"
              value={education.degree}
              onChange={handleEducationChange(index, 'degree')}
              fullWidth
            />
            <TextField
              label="Field of Study"
              value={education.field}
              onChange={handleEducationChange(index, 'field')}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                value={education.startDate}
                onChange={handleEducationChange(index, 'startDate')}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="End Date"
                type="date"
                value={education.endDate}
                onChange={handleEducationChange(index, 'endDate')}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
            <TextField
              label="GPA"
              value={education.gpa}
              onChange={handleEducationChange(index, 'gpa')}
              fullWidth
            />
          </Box>
        </Box>
      ))}
      <Button variant="outlined" onClick={handleAddEducation} fullWidth>
        Add Education
      </Button>
    </Box>
  );
}