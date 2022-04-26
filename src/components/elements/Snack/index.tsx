import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { ISnackProps } from "../../../types/interfaces";

const Snack: React.FC<ISnackProps> = ({isOpen, handleClose, text, type}) => {
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
        severity={type === "error" ? "error" : "success"}
        variant="filled"
        sx={{width: '350px'}}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Snack;