import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import FormAddingOrders from "../../components/formAddingOrders";
import TableOrders from "../../components/TableOrders";
import Snack from "../../components/elements/Snack";
import FormFilterOrders from "../../components/formFilterOrders";
import NotOrders from "../../icons/diagnosis.svg";
import {IDoctors, IFilter, IOrder, ISnack} from "../../types/interfaces";
import "./main.scss";
import moment from "moment";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [allDoctors, setAllDoctors] = useState<IDoctors[]>([]);
  const [updatePage, setUpdatePage] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: ''
  });
  const [filter, setFilter] = useState<IFilter>({
    method: "",
    type: "ASC",
    from: "",
    to: ""
  });
  const [ftrWithDate, setFtrWithDate] = useState<boolean>(false);

  useEffect(() => {
    fetchDoctors();
    fetchOrders();
  }, [updatePage]);

  useEffect(() => {
    if (!filter.method) setFtrWithDate(false);
  }, [filter.method]);

  useEffect(() => {
    if (filter.method && filter.type) fetchOrders();
  }, [filter])

  const fetchDoctors = () => {
    axios.get("http://localhost:8000/api/allDoctors")
      .then((res) => {
        setAllDoctors(res.data);
      })
      .catch(() => {
        setSnackOpen({
          isOpen: true,
          text: "Сервер не отвечает",
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

    const params = {
      ...filter,
      from: moment(filter.from).format(),
      to: moment(filter.to).format()
    };

    axios.get("http://localhost:8000/api/allOrders", {
      params,
      headers: headers
    })
      .then((res) => {
        setOrders(res.data);
      });
  };

  const onChangeFilter = (type: string, value: string) => {
    setFilter({...filter, [type]: value});
  };

  return (
    <div className="mainPage">
      <Header title="Приемы" flag={true}/>
      <FormAddingOrders
        allDoctors={allDoctors}
        updatePage={() => setUpdatePage(!updatePage)}
      />
      {orders && orders.length > 0 ?
        (
          <>
            <FormFilterOrders
              filter={filter}
              onChange={onChangeFilter}
              ftrWithDate={ftrWithDate}
              changeBtnFltDate={() => setFtrWithDate(!ftrWithDate)}
              onClickSaveDate={fetchOrders}
            />
            <TableOrders
              orders={orders}
              allDoctors={allDoctors}
              updatePage={() => setUpdatePage(!updatePage)}
            />
          </>
        ) : (
          <div className="notOrdersPage">
            <h1>Приемов нет</h1>
            <img src={NotOrders} alt="Not Orders" />
          </div>
        )
      }
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
