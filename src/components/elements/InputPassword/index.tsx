import React from "react";
import {
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  createTheme,
  ThemeProvider
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {indigo} from "@mui/material/colors";
import {IInputProps} from "../../../types/interfaces";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    }
  },
});

const InputPassword: React.FC<IInputProps> = ({value, onChange, title, flag}) => {
  const [isShow, setIsShow] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setIsShow(!isShow);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl
        variant="standard"
        fullWidth
        focused
        color={flag ? "primary" : "error"}
      >
        <InputLabel
          sx={{
            fontSize: 20
          }}
        >
          {title}
        </InputLabel>
        <Input
          type={isShow ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                color={flag ? "primary" : "error"}
              >
                {isShow ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </ThemeProvider>
  );
};

export default InputPassword;