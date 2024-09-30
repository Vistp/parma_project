import { useState } from 'react';
import { Button, Dialog } from '@mui/material';
import LoginForm from './LoginForm';

export const RegistrationForm: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} aria-labelledby='form-dialog-title'>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <LoginForm />
      </Dialog>
    </>
  );
};
