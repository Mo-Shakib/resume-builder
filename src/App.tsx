import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Container, Paper, Typography, Button, Stack, CssBaseline } from '@mui/material';
import { useResumeStore } from './store/resumeStore';
import { PersonalSection } from './components/PersonalSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { PDFExport } from './components/PDFExport';
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
    console.log('Sections after useEffect:', sections);
  }, [sections.length, addSection]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  const handleAddSection = (type: 'personal' | 'experience' | 'education' | 'skills') => {
    if (type === 'personal' && sections.some(s => s.type === 'personal')) return;
    addSection({
      type,
      content: {},
      order: sections.length,
    });
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        Resume Builder
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {!sections.some(s => s.type === 'personal') && (
          <Button onClick={() => handleAddSection('personal')}>Add Personal Info</Button>
        )}
        <Button onClick={() => handleAddSection('experience')}>Add Experience</Button>
        <Button onClick={() => handleAddSection('education')}>Add Education</Button>
        <Button onClick={() => handleAddSection('skills')}>Add Skills</Button>
      </Stack>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.type} draggableId={section.type} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {section.type === 'personal' && <PersonalSection id={section.id} content={section.content} />}
                      {section.type === 'experience' && <ExperienceSection id={section.id} content={section.content} />}
                      {section.type === 'education' && <EducationSection id={section.id} content={section.content} />}
                      {section.type === 'skills' && <SkillsSection id={section.id} content={section.content} />}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PDFExport />
    </Container>
  );
}

export default App;
