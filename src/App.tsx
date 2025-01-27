import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Container, Paper, Typography, Button, Stack, CssBaseline } from '@mui/material';
import { useResumeStore } from './store/resumeStore';
import { PersonalSection } from './components/PersonalSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { useEffect } from 'react';
import './App.css'

function App() {
  const { sections, addSection, reorderSections } = useResumeStore();

  useEffect(() => {
    if (sections.length === 0) {
      addSection({
        type: 'personal',
        content: {},
        order: 0,
      });
    }
  }, [sections.length, addSection]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  const handleAddSection = (type: 'personal' | 'experience' | 'education' | 'skills') => {
    addSection({
      type,
      content: {},
      order: sections.length,
    });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Resume Builder
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Editor Section */}
          <Paper sx={{ flex: 1, p: 3, bgcolor: '#f5f5f5' }}>
            <Stack spacing={3}>
              <Typography variant="h6">Add Sections</Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={() => handleAddSection('personal')}>
                  Personal Info
                </Button>
                <Button variant="contained" onClick={() => handleAddSection('experience')}>
                  Experience
                </Button>
                <Button variant="contained" onClick={() => handleAddSection('education')}>
                  Education
                </Button>
                <Button variant="contained" onClick={() => handleAddSection('skills')}>
                  Skills
                </Button>
              </Stack>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="resume-sections">
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ minHeight: 400 }}
                    >
                      {sections.map((section, index) => (
                        <Draggable
                          key={section.id}
                          draggableId={section.id}
                          index={index}
                        >
                          {(provided) => (
                            <Paper
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              sx={{ p: 2, mb: 2, bgcolor: 'white' }}
                              elevation={2}
                            >
                              {section.type === 'personal' && <PersonalSection id={section.id} content={section.content} />}
                              {section.type === 'experience' && <ExperienceSection id={section.id} content={section.content} />}
                              {section.type === 'education' && <EducationSection id={section.id} content={section.content} />}
                              {section.type === 'skills' && <SkillsSection id={section.id} content={section.content} />}
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Stack>
          </Paper>

          {/* Preview Section */}
          <Paper sx={{ flex: 1, p: 3 }}>
            <Typography variant="h6" gutterBottom>Preview</Typography>
            <Box sx={{ minHeight: 400 }}>
              {sections.map((section) => (
                <Box key={section.id} sx={{ mb: 3 }}>
                  {section.type === 'personal' && <PersonalSection id={section.id} content={section.content} />}
                  {section.type === 'experience' && <ExperienceSection id={section.id} content={section.content} />}
                  {section.type === 'education' && <EducationSection id={section.id} content={section.content} />}
                  {section.type === 'skills' && <SkillsSection id={section.id} content={section.content} />}
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default App;
