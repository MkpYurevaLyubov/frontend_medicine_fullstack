import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
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
import {IDeleteOrder, ITableOrdersProps} from "../../types/interfaces";
import {convertDate, getDoctor} from "../../helpers/m";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1a237e",
    color: "#ffffff",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0
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

  const deleteOrder = (id: number) => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate("/authorization");
    const headers = {
      'Content-Type': 'application/json',
      'accesstoken': token
    };
    axios.delete(`http://localhost:8000/api/deleteOrder?id=${id}`, {
      headers: headers
    })
      .then(() => {
        setOpenDialog({id: null, isOpen: false});
        updatePage();
      })
  };

  return (
    <TableContainer component={Paper} sx={{width: "80%", margin: "auto"}}>
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
              <StyledTableCell align="center">{getDoctor(allDoctors, Number(order.doctorid))}</StyledTableCell>
              <StyledTableCell align="center">{convertDate(new Date(order.dateorder))}</StyledTableCell>
              <StyledTableCell align="center">{order.complaints}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton>
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
    </TableContainer>
  );
}

export default TableOrders;
