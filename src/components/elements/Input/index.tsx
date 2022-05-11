import React from 'react';
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { IInputProps } from '../../../types/interfaces';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    },
  },
});

const Input: React.FC<IInputProps> = ({ value, onChange, title, flag }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        value={value}
        onChange={onChange}
        label={title}
        variant="standard"
        color={flag ? 'primary' : 'error'}
        focused
        fullWidth
        autoComplete="off"
        sx={{
          label: { fontSize: 20 },
        }}
      />
    </ThemeProvider>
  );
};

export default Input;
