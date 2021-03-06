import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ResponsiveDialog from '../elements/Dialog';
import FormEditingOrder from '../formEditingOrder';
import axiosApiInstance from '../../helpers/request';
import {
  IDeleteOrder,
  ISnack,
  ITableOrdersProps,
} from '../../types/interfaces';
import { isValidateDate } from '../../helpers/m';
import Snack from '../elements/Snack';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1a237e',
    color: '#ffffff',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '0 5px',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#e8eaf6',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableOrders: React.FC<ITableOrdersProps> = ({
  orders,
  allDoctors,
  updatePage,
}) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<IDeleteOrder>({
    id: null,
    isOpen: false,
  });
  const [openEditForm, setOpenEditForm] = useState({
    values: {
      patientsName: '',
      dateOrder: new Date(),
      complaints: '',
      doctorId: '',
    },
    isOpen: false,
  });
  const [disabledBtnEdit, setDisabledBtnEdit] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: '',
  });

  const onChangeInputs = (
    type: string,
    value: string | React.ChangeEvent<HTMLInputElement> | Date | null,
  ) => {
    const appointment: {
      [index: string]:
        | string
        | React.ChangeEvent<HTMLInputElement>
        | Date
        | null;
    } = { ...openEditForm.values };
    appointment[type] = value;

    appointment.patientsName &&
    isValidateDate(appointment.dateOrder) &&
    appointment.complaints &&
    appointment.doctorId
      ? setDisabledBtnEdit(false)
      : setDisabledBtnEdit(true);

    setOpenEditForm({
      ...openEditForm,
      values: { ...openEditForm.values, [type]: value },
    });
  };

  const deleteOrder = (id: string) => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate('/authorization');
    axiosApiInstance
      .delete(`http://localhost:8000/api/deleteOrder?id=${id}`)
      .then(() => {
        setOpenDialog({ id: null, isOpen: false });
        updatePage();
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          localStorage.removeItem('token');
          return navigate('/authorization');
        }
        if (!err.response)
          setSnackOpen({
            isOpen: true,
            text: '?????? ?????????????????????? ?? ??????????????!',
            type: 'error',
          });
      });
  };

  const updateOrder = () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate('/authorization');
    axiosApiInstance
      .patch(`http://localhost:8000/api/updateOrder`, {
        ...openEditForm.values,
        dateOrder: moment(openEditForm.values.dateOrder).format(),
      })
      .then(() => {
        setOpenEditForm({
          values: {
            patientsName: '',
            dateOrder: new Date(),
            complaints: '',
            doctorId: '',
          },
          isOpen: false,
        });
        updatePage();
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          localStorage.removeItem('token');
          return navigate('/authorization');
        }
        if (!err.response)
          setSnackOpen({
            isOpen: true,
            text: '?????? ?????????????????????? ?? ??????????????!',
            type: 'error',
          });
      });
  };

  return (
    <TableContainer component={Paper} sx={{ width: '95%', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">??????</StyledTableCell>
            <StyledTableCell align="center">????????</StyledTableCell>
            <StyledTableCell align="center">????????</StyledTableCell>
            <StyledTableCell align="center">????????????</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.Id}>
              <StyledTableCell align="center">
                {order.patientsName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.doctor!.fullName!}
              </StyledTableCell>
              <StyledTableCell align="center">
                {moment(order.dateOrder).format('DD.MM.YYYY')}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.complaints}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  onClick={() =>
                    setOpenEditForm({
                      values: {
                        ...order,
                        dateOrder: new Date(order.dateOrder),
                      },
                      isOpen: true,
                    })
                  }
                >
                  {<EditIcon />}
                </IconButton>
                <IconButton
                  onClick={() => setOpenDialog({ id: order.Id!, isOpen: true })}
                >
                  {<DeleteIcon />}
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <ResponsiveDialog
        isOpen={openDialog.isOpen}
        handleClose={() => setOpenDialog({ id: null, isOpen: false })}
        text="???? ?????????????????????????? ???????????? ?????????????? ???????????"
        onClickYes={() => deleteOrder(openDialog.id!)}
      />
      <FormEditingOrder
        allDoctors={allDoctors}
        order={openEditForm.values}
        onChange={onChangeInputs}
        isOpen={openEditForm.isOpen}
        handleClose={() =>
          setOpenEditForm({
            values: {
              patientsName: '',
              dateOrder: new Date(),
              complaints: '',
              doctorId: '',
            },
            isOpen: false,
          })
        }
        onClickYes={updateOrder}
        disabled={disabledBtnEdit}
      />
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({ ...snackOpen, isOpen: false })}
        text={snackOpen.text}
        type={snackOpen.type}
      />
    </TableContainer>
  );
};

export default TableOrders;
