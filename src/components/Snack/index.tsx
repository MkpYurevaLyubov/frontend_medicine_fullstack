import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface SnackProps {
  isOpen: boolean,
  handleClose: () => void,
  text: string
}

const Snack: React.FC<SnackProps> = ({isOpen, handleClose, text}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={2000}
    >
      <Alert
        severity="error"
        variant="filled"
        sx={{ width: '350px' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Snack;