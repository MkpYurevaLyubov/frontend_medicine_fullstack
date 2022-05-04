import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Input from "../elements/Input";
import Selected from "../elements/Selected";
import InputDate from "../elements/InputDate";
import Buttons from "../elements/Button";
import Snack from "../elements/Snack";
import {
  IFormAddingOrdersProps,
  IOrder,
  ISnack
} from "../../types/interfaces";
import {isValidateDate} from "../../helpers/m";
import "./formAddingOrders.scss";

const FormAddingOrders: React.FC<IFormAddingOrdersProps> = ({allDoctors, updatePage}) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrder>({
    patientsname: '',
    dateorder: new Date(),
    complaints: '',
    doctorid: ''
  });
  const {patientsname, dateorder, complaints, doctorid} = order;
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: ''
  });

  const onChangeInputs = (type: string, value: string | React.ChangeEvent<HTMLInputElement>) => {
    const appointment: { [index: string]: string | React.ChangeEvent<HTMLInputElement> | Date | number } = {...order};
    appointment[type] = value;

    appointment.patientsname && isValidateDate(appointment.dateorder) && appointment.complaints
      && appointment.doctorid ? setDisabledBtn(false) : setDisabledBtn(true);

    setOrder({...order, [type]: value});
  };

  const onClickBtn = () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) navigate("/authorization");
    const headers = {
      'Content-Type': 'application/json',
      'accesstoken': token
    };
    axios.post("http://localhost:8000/api/createOrder", {
        ...order,
        dateorder: moment(order.dateorder).format(),
      },
      {
        headers: headers
      })
      .then(() => {
        setOrder({
          patientsname: '',
          dateorder: new Date(),
          complaints: '',
          doctorid: ''
        });
        setDisabledBtn(true);
        setSnackOpen({
          isOpen: true,
          text: "Прием успешно добавлен!",
          type: "success"
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
    <div className="mainAddOrder">
      <div className="componentAddingOrders">
        <Input
          value={patientsname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInputs("patientsname", e.target.value)}
          title="Имя:"
          flag={true}
        />
      </div>
      <div className="componentAddingOrders">
        <Selected
          values={allDoctors}
          value={doctorid}
          title="Врач:"
          onChange={(e) => onChangeInputs("doctorid", e)}
        />
      </div>
      <div className="componentAddingOrders">
        <InputDate
          title="Дата:"
          value={dateorder}
          onChange={(e) => onChangeInputs("dateorder", e)}
          disablePast
        />
      </div>
      <div className="componentAddingOrders">
        <Input
          value={complaints}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInputs("complaints", e.target.value)}
          title="Жалобы:"
          flag={true}
        />
      </div>
      <Buttons
        text="Добавить"
        onClick={onClickBtn}
        disabled={disabledBtn}
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

export default FormAddingOrders;