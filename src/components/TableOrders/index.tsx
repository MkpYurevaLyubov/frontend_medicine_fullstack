import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {styled} from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper, IconButton
} from '@mui/material';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ResponsiveDialog from "../elements/Dialog";
import FormEditingOrder from "../formEditingOrder";
import {IDeleteOrder, ISnack, ITableOrdersProps} from "../../types/interfaces";
import {isValidateDate} from "../../helpers/m";
import Snack from "../elements/Snack";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1a237e",
    color: "#ffffff",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "0 5px"
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#e8eaf6",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableOrders: React.FC<ITableOrdersProps> = ({orders, allDoctors, updatePage}) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<IDeleteOrder>({id: null, isOpen: false});
  const [openEditForm, setOpenEditForm] = useState({
    values: {
      patientsname: '',
      dateorder: new Date(),
      complaints: '',
      doctorid: ''
    },
    isOpen: false
  });
  const [disabledBtnEdit, setDisabledBtnEdit] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: ''
  });

  const onChangeInputs = (type: string, value: string | React.ChangeEvent<HTMLInputElement>) => {
    const appointment: { [index: string]: string | React.ChangeEvent<HTMLInputElement> | Date | number } = {...openEditForm.values};
    appointment[type] = value;

    appointment.patientsname && isValidateDate(appointment.dateorder) && appointment.complaints
      && appointment.doctorid ? setDisabledBtnEdit(false) : setDisabledBtnEdit(true);

    setOpenEditForm({...openEditForm, values: {...openEditForm.values, [type]: value}});
  };

  const deleteOrder = (id: number) => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate("/authorization");
    const headers = {
      "Content-Type": "application/json",
      "accesstoken": token
    };
    axios.delete(`http://localhost:8000/api/deleteOrder?id=${id}`, {
      headers: headers
    })
      .then(() => {
        setOpenDialog({id: null, isOpen: false});
        updatePage();
      })
      .catch((err) => {
        if (!err.response) setSnackOpen({
          isOpen: true,
          text: "Нет подключения к серверу!",
          type: "error"
        });
      });
  };

  const updateOrder = () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate("/authorization");
    const headers = {
      "Content-Type": "application/json",
      "accesstoken": token
    };
    axios.patch(`http://localhost:8000/api/updateOrder`, {
        ...openEditForm.values,
        dateorder: moment(openEditForm.values.dateorder).format(),
      },
      {
        headers: headers
      })
      .then(() => {
        setOpenEditForm({
          values: {
            patientsname: '',
            dateorder: new Date(),
            complaints: '',
            doctorid: ''
          },
          isOpen: false
        });
        updatePage();
      })
      .catch((err) => {
        if (!err.response) setSnackOpen({
          isOpen: true,
          text: "Нет подключения к серверу!",
          type: "error"
        });
      });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{width: "95%", margin: "auto"}}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Имя</StyledTableCell>
            <StyledTableCell align="center">Врач</StyledTableCell>
            <StyledTableCell align="center">Дата</StyledTableCell>
            <StyledTableCell align="center">Жалобы</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell align="center">{order.patientsname}</StyledTableCell>
              <StyledTableCell align="center">{order.fullname}</StyledTableCell>
              <StyledTableCell align="center">{moment(order.dateorder).format("DD.MM.YYYY")}</StyledTableCell>
              <StyledTableCell align="center">{order.complaints}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  onClick={() => setOpenEditForm({
                    values: {...order, dateorder: new Date(order.dateorder)},
                    isOpen: true
                  })}
                >
                  {<EditIcon/>}
                </IconButton>
                <IconButton
                  onClick={() => setOpenDialog({id: order.id!, isOpen: true})}
                >
                  {<DeleteIcon/>}
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <ResponsiveDialog
        isOpen={openDialog.isOpen}
        handleClose={() => setOpenDialog({id: null, isOpen: false})}
        text="Вы действительно хотите удалить приём?"
        onClickYes={() => deleteOrder(openDialog.id!)}
      />
      <FormEditingOrder
        allDoctors={allDoctors}
        order={openEditForm.values}
        onChange={onChangeInputs}
        isOpen={openEditForm.isOpen}
        handleClose={() => setOpenEditForm({
          values: {
            patientsname: '',
            dateorder: new Date(),
            complaints: '',
            doctorid: ''
          },
          isOpen: false
        })}
        onClickYes={updateOrder}
        disabled={disabledBtnEdit}
      />
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({...snackOpen, isOpen: false})}
        text={snackOpen.text}
        type={snackOpen.type}
      />
    </TableContainer>
  );
}

export default TableOrders;
