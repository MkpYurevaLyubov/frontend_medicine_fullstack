import React from 'react';
import {
  ThemeProvider,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import { ISelectedProps } from '../../../types/interfaces';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    },
  },
});

const Selected: React.FC<ISelectedProps> = ({
  values,
  value,
  title,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl focused fullWidth variant="standard">
        <InputLabel
          sx={{
            fontSize: 20,
          }}
        >
          {title}
        </InputLabel>
        <Select value={value} onChange={handleChange} label={title}>
          {values.map((el) => (
            <MenuItem key={el.Id} value={el.Id}>
              {el.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default Selected;
