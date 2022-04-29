import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {indigo} from "@mui/material/colors";
import {ru} from "date-fns/locale";
import {IInputDateProps} from "../../../types/interfaces";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    }
  },
});

const InputDate: React.FC<IInputDateProps> = ({value, title, onChange, disablePast}) => {
  const handleChange = (newValue: Date | null) => {
    onChange(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
        <DesktopDatePicker
          disablePast={disablePast}
          label={title}
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params: any) =>
            <TextField
              {...params}
              error={false}
              variant="standard"
              color="primary"
              focused
              fullWidth
              sx={{
                label: {fontSize: 20},
                svg: {color: "#1a237e"},
              }}
            />
          }
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default InputDate;