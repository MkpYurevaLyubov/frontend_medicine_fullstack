import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import FormAddingOrders from "../../components/formAddingOrders";
import TableOrders from "../../components/TableOrders";
import {IDoctors, ISnack} from "../../types/interfaces";
import "./main.scss";
import Snack from "../../components/elements/Snack";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [allDoctors, setAllDoctors] = useState<IDoctors[]>([]);
  const [updatePage, setUpdatePage] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: ''
  });

  useEffect(() => {
    fetchDoctors();
    fetchOrders();
  }, [updatePage]);

  const fetchDoctors = () => {
    axios.get("http://localhost:8000/api/allDoctors")
      .then((res) => {
        setAllDoctors(res.data);
      })
      .catch(() => {
        setSnackOpen({
          isOpen: true,
          text: "Сервер не работает!",
          type: "error"
        });
      });
  };

  const fetchOrders = () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate("/authorization");
    const headers = {
      'Content-Type': 'application/json',
      'accesstoken': token
    }
    axios.get("http://localhost:8000/api/allOrders", {
      headers: headers
    })
      .then((res) => {
        setOrders(res.data);
      });
  };

  return (
    <div className="mainPage">
      <Header title="Приемы" flag={true}/>
      <FormAddingOrders
        allDoctors={allDoctors}
        updatePage={() => setUpdatePage(!updatePage)}
      />
      <TableOrders
        orders={orders}
        allDoctors={allDoctors}
        updatePage={() => setUpdatePage(!updatePage)}
      />
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({...snackOpen, isOpen: false})}
        text={snackOpen.text}
        type={snackOpen.type}
      />
    </div>
  );
};

export default MainPage;
