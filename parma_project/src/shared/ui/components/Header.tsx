import { AppBar, Toolbar, Typography } from '@mui/material'

export const Header: React.FC = () => {

  return (
    <AppBar position='static' color='primary' >
      <Toolbar>
        <Typography
          variant="h6"
          component="p"
          sx={{ flexGrow: 1 }}
        >
          Tool Manager
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
