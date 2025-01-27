import { Box, Button } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useResumeStore } from '../store/resumeStore';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
    lineHeight: 1.5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});

const ResumePDF = () => {
  const { sections } = useResumeStore();
  
  const personalSection = sections.find(s => s.type === 'personal');
  const experienceSections = sections.filter(s => s.type === 'experience');
  const educationSections = sections.filter(s => s.type === 'education');
  const skillsSections = sections.filter(s => s.type === 'skills');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Information */}
        {personalSection && (
          <View style={styles.section}>
            <Text style={styles.heading}>{personalSection.content.name}</Text>
            <Text style={styles.text}>{personalSection.content.email}</Text>
            <Text style={styles.text}>{personalSection.content.phone}</Text>
            <Text style={styles.text}>{personalSection.content.address}</Text>
          </View>
        )}

        {/* Experience */}
        {experienceSections.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Professional Experience</Text>
            {experienceSections.map(section => (
              section.content.experiences?.map((exp, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.subHeading}>{exp.position} at {exp.company}</Text>
                  <Text style={styles.text}>{exp.startDate} - {exp.endDate}</Text>
                  <Text style={styles.text}>{exp.description}</Text>
                </View>
              ))
            ))}
          </View>
        )}

        {/* Education */}
        {educationSections.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {educationSections.map(section => (
              section.content.education?.map((edu, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.subHeading}>{edu.degree} in {edu.field}</Text>
                  <Text style={styles.text}>{edu.institution}</Text>
                  <Text style={styles.text}>{edu.startDate} - {edu.endDate}</Text>
                  {edu.gpa && <Text style={styles.text}>GPA: {edu.gpa}</Text>}
                </View>
              ))
            ))}
          </View>
        )}

        {/* Skills */}
        {skillsSections.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            <View style={styles.skills}>
              {skillsSections.map(section => (
                section.content.skills?.map((skill, index) => (
                  <Text key={index} style={styles.text}>{skill}</Text>
                ))
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export function PDFExport() {
  return (
    <Box sx={{ mt: 2 }}>
      <PDFDownloadLink
        document={<ResumePDF />}
        fileName="resume.pdf"
      >
        {({ loading }) => (
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Generating PDF...' : 'Download ATS-Friendly PDF'}
          </Button>
        )}
      </PDFDownloadLink>
    </Box>
  );
}