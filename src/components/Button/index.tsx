import React from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import {indigo} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    }
  },
});

interface ButtonsProps {
  text: string,
  onClick: () => void
}

const Buttons: React.FC<ButtonsProps> = ({ text, onClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="primary"
        onClick={onClick}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default Buttons;