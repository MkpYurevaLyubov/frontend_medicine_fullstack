import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Input from '../elements/Input';
import Selected from '../elements/Selected';
import InputDate from '../elements/InputDate';
import Buttons from '../elements/Button';
import Snack from '../elements/Snack';
import { IFormAddingOrdersProps, IOrder, ISnack } from '../../types/interfaces';
import axiosApiInstance from '../../helpers/request';
import { isValidateDate } from '../../helpers/m';
import './formAddingOrders.scss';

const FormAddingOrders: React.FC<IFormAddingOrdersProps> = ({
  allDoctors,
  updatePage,
}) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrder>({
    patientsName: '',
    dateOrder: new Date(),
    complaints: '',
    doctorId: '',
  });
  const { patientsName, dateOrder, complaints, doctorId } = order;
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
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
        | object
        | null;
    } = { ...order };
    appointment[type] = value;

    appointment.patientsName &&
    isValidateDate(appointment.dateOrder) &&
    appointment.complaints &&
    appointment.doctorId
      ? setDisabledBtn(false)
      : setDisabledBtn(true);

    setOrder({ ...order, [type]: value });
  };

  const onClickBtn = async () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) navigate('/authorization');
    axiosApiInstance
      .post('http://localhost:8000/api/createOrder', {
        ...order,
        dateOrder: moment(order.dateOrder).format('YYYY-MM-DD'),
      })
      .then((res) => {
        setOrder({
          patientsName: '',
          dateOrder: new Date(),
          complaints: '',
          doctorId: '',
        });
        setDisabledBtn(true);
        setSnackOpen({
          isOpen: true,
          text: 'Прием успешно добавлен!',
          type: 'success',
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
            text: 'Нет подключения к серверу!',
            type: 'error',
          });
      });
  };

  return (
    <div className="mainAddOrder">
      <div className="componentAddingOrders">
        <Input
          value={patientsName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeInputs('patientsName', e.target.value)
          }
          title="Имя:"
          flag={true}
        />
      </div>
      <div className="componentAddingOrders">
        <Selected
          values={allDoctors}
          value={doctorId}
          title="Врач:"
          onChange={(e) => onChangeInputs('doctorId', e)}
        />
      </div>
      <div className="componentAddingOrders">
        <InputDate
          title="Дата:"
          value={dateOrder}
          onChange={(e) => onChangeInputs('dateOrder', e)}
          disablePast
        />
      </div>
      <div className="componentAddingOrders">
        <Input
          value={complaints}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeInputs('complaints', e.target.value)
          }
          title="Жалобы:"
          flag={true}
        />
      </div>
      <Buttons text="Добавить" onClick={onClickBtn} disabled={disabledBtn} />
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({ ...snackOpen, isOpen: false })}
        text={snackOpen.text}
        type={snackOpen.type}
      />
    </div>
  );
};

export default FormAddingOrders;
