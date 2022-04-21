import React from "react";
import {TextField, ThemeProvider, createTheme} from '@mui/material';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    }
  },
});

interface InputProps {
  value: string,
  onChange: any,
  title: string,
  type: string,
  flag: boolean
}

const Input: React.FC<InputProps> = ({ value, onChange, title, type, flag }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        value={value}
        onChange={(e) => onChange(e)}
        label={title}
        variant="standard"
        color={flag ? "error" : "primary"}
        focused
        fullWidth
        autoComplete="off"
        type={type}
      />
    </ThemeProvider>
  );
};

export default Input;