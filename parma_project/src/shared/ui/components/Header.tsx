import { AppBar, Toolbar, Typography } from '@mui/material'
import { RegistrationForm } from '../../../widgets/ui/components/RegistrationForm'

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
        <RegistrationForm />
      </Toolbar>
    </AppBar>
  )
}
