import React from 'react';
import {
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { indigo } from "@mui/material/colors";
import { IButtonsProps } from "../../../types/interfaces";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    }
  },
});

const Buttons: React.FC<IButtonsProps> = ({text, onClick, disabled}) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="primary"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default Buttons;