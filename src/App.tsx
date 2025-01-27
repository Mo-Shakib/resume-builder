import { Routes, Route } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import ResumeBuilder from './components/ResumeBuilder'
import Header from './components/Header'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<ResumeBuilder />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App