import { Box, TextField, Typography, Chip, Stack } from '@mui/material';
import { useResumeStore } from '../store/resumeStore';
import { useState } from 'react';

interface SkillsSectionProps {
  id: string;
  content: {
    skills?: string[];
  };
}

export function SkillsSection({ id, content }: SkillsSectionProps) {
  const { updateSection } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newSkill.trim()) {
      updateSection(id, {
        skills: [...(content.skills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    updateSection(id, {
      skills: (content.skills || []).filter(skill => skill !== skillToDelete)
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>Skills</Typography>
      <TextField
        label="Add a skill (press Enter)"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        onKeyPress={handleAddSkill}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {(content.skills || []).map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
}