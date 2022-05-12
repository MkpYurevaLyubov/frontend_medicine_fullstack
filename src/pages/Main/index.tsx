import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Header from '../../components/Header';
import FormAddingOrders from '../../components/formAddingOrders';
import TableOrders from '../../components/TableOrders';
import Snack from '../../components/elements/Snack';
import FormFilterOrders from '../../components/formFilterOrders';
import NotOrders from '../../icons/diagnosis.svg';
import axiosApiInstance from '../../helpers/request';
import {
  IDoctors,
  IFilter,
  IOrder,
  ISnack,
  ISort,
} from '../../types/interfaces';
import './main.scss';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [allDoctors, setAllDoctors] = useState<IDoctors[]>([]);
  const [updatePage, setUpdatePage] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: '',
  });
  const [filter, setFilter] = useState<IFilter>({ method: '', type: 'ASC' });
  const [sort, setSort] = useState<ISort>({ from: '', to: '' });
  const [ftrWithDate, setFtrWithDate] = useState<boolean>(false);

  useEffect(() => {
    fetchDoctors();
    fetchOrders();
  }, [updatePage]);

  useEffect(() => {
    if (!filter.method || !ftrWithDate) {
      setFtrWithDate(false);
      setSort({ from: '', to: '' });
    }
    if (filter.method && filter.type && !ftrWithDate) fetchOrders();
  }, [filter, ftrWithDate]);

  const fetchDoctors = () => {
    axios
      .get('http://localhost:8000/api/allDoctors')
      .then((res) => {
        setAllDoctors(res.data);
      })
      .catch((err) => {
        if (!err.response)
          setSnackOpen({
            isOpen: true,
            text: 'Нет подключения к серверу',
            type: 'error',
          });
      });
  };

  const fetchOrders = () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate('/authorization');

    const params = ftrWithDate
      ? {
          ...filter,
          from: `${moment(sort.from).format('YYYY-MM-DD')}T00:00:00.000Z`,
          to: `${moment(sort.to).format('YYYY-MM-DD')}T23:59:59.000Z`,
        }
      : { ...filter };

    axiosApiInstance
      .get('http://localhost:8000/api/allOrders', {
        params,
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          localStorage.removeItem('token');
          return navigate('/authorization');
        }
      });
  };

  const onChangeFilter = (type: string, value: string) => {
    if (type === 'from' || type === 'to')
      return setSort({ ...sort, [type]: value });
    setFilter({ ...filter, [type]: value });
  };

  return (
    <div className="mainPage">
      <Header title="Приемы" flag={true} />
      <FormAddingOrders
        allDoctors={allDoctors}
        updatePage={() => setUpdatePage(!updatePage)}
      />
      <FormFilterOrders
        filter={filter}
        sort={sort}
        onChange={onChangeFilter}
        ftrWithDate={ftrWithDate}
        changeBtnFltDate={() => setFtrWithDate(!ftrWithDate)}
        onClickSaveDate={fetchOrders}
      />
      {orders && orders.length > 0 ? (
        <TableOrders
          orders={orders}
          allDoctors={allDoctors}
          updatePage={() => setUpdatePage(!updatePage)}
        />
      ) : (
        <div className="notOrdersPage">
          <h1>Приемов нет</h1>
          <img src={NotOrders} alt="Not Orders" />
        </div>
      )}
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({ ...snackOpen, isOpen: false })}
        text={snackOpen.text}
        type={snackOpen.type}
      />
    </div>
  );
};

export default MainPage;
