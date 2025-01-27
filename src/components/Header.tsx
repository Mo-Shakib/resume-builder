import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { GitHub as GitHubIcon } from '@mui/icons-material'

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Resume Builder
        </Typography>
        <Button
          color="inherit"
          startIcon={<GitHubIcon />}
          href="https://github.com/yourusername/resume-builder"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header