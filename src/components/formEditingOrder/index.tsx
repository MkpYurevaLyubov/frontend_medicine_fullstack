import React from "react";
import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider
} from "@mui/material";
import {indigo} from "@mui/material/colors";
import Input from "../elements/Input";
import Selected from "../elements/Selected";
import InputDate from "../elements/InputDate";
import {IFormEditingOrderProps} from "../../types/interfaces";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[900],
    }
  },
});

const FormEditingOrder: React.FC<IFormEditingOrderProps> = ({
  allDoctors, order, onChange, isOpen, handleClose, onClickYes, disabled
                                                            }) => {
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            color: "#1a237e"
          }}
        >
          Именить прием
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "15rem",
            padding: "25px 35px"
          }}
        >
          <Input
            value={order.patientsname!}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("patientsname", e.target.value)}
            title="Имя:"
            flag={true}
          />
          <Selected
            values={allDoctors}
            value={order.doctorid!}
            onChange={(e) => onChange("doctorid", e)}
            title="Врач:"
          />
          <InputDate
            title="Дата:"
            value={order.dateorder!}
            onChange={(e) => onChange("dateorder", e)}
            disablePast
          />
          <Input
            value={order.complaints!}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("complaints", e.target.value)}
            title="Жалобы:"
            flag={true}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={disabled}
            onClick={onClickYes}
          >
            Сохранить
          </Button>
          <Button
            color="primary"
            onClick={handleClose}
            autoFocus
          >
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default FormEditingOrder;
