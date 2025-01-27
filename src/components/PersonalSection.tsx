import { Box, TextField, Typography } from '@mui/material';
import { useResumeStore } from '../store/resumeStore';

interface PersonalSectionProps {
  id: string;
  content: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

export function PersonalSection({ id, content }: PersonalSectionProps) {
  const { updateSection } = useResumeStore();

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSection(id, { ...content, [field]: event.target.value });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>Personal Information</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Full Name"
          value={content.name || ''}
          onChange={handleChange('name')}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={content.email || ''}
          onChange={handleChange('email')}
          fullWidth
        />
        <TextField
          label="Phone"
          value={content.phone || ''}
          onChange={handleChange('phone')}
          fullWidth
        />
        <TextField
          label="Address"
          multiline
          rows={2}
          value={content.address || ''}
          onChange={handleChange('address')}
          fullWidth
        />
      </Box>
    </Box>
  );
}