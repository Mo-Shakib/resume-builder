import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa: string
  }>
  skills: string[]
}

interface ResumePreviewProps {
  data: ResumeData
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2196f3',
    textTransform: 'uppercase',
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
    lineHeight: 1.4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 5,
  },
  itemDates: {
    fontSize: 10,
    color: '#666',
  },
  itemDescription: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#e3f2fd',
    padding: '3 6',
    borderRadius: 3,
  },
})

const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.header}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
          </Text>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Professional Summary</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDates}>
                  {exp.startDate} - {exp.endDate}
                </Text>
                <Text style={styles.itemDescription}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{edu.school}</Text>
                <Text style={styles.itemSubtitle}>
                  {edu.degree} in {edu.field}
                </Text>
                <Text style={styles.itemDates}>
                  {edu.startDate} - {edu.endDate}
                </Text>
                {edu.gpa && <Text style={styles.itemDescription}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}

export default ResumePreview