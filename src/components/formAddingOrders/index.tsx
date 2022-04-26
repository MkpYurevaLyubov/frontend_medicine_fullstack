import React, {useEffect, useState} from "react";
import axios from "axios";
import Input from "../elements/Input";
import Selected from "../elements/Selected";
import InputDate from "../elements/InputDate";
import Buttons from "../elements/Button";
import {IDoctors, IOrder, ISnack} from "../../types/interfaces";
import "./formAddingOrders.scss";
import Snack from "../elements/Snack";

const FormAddingOrders: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<IDoctors[]>([]);
  const [order, setOrder] = useState<IOrder>({
    patientsname: '',
    dateorder: new Date(),
    complaints: '',
    doctorid: ''
  });
  const { patientsname, dateorder, complaints, doctorid } = order;
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: ''
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/allDoctors")
      .then((res) => {
        setAllDoctors(res.data);
      })
  }, []);

  const onChangeInputs = (type: string, value: string | React.ChangeEvent<HTMLInputElement>) => {
    const appointment: { [index: string]: string | React.ChangeEvent<HTMLInputElement> | Date } = {...order};
    appointment[type] = value;

    appointment.patientsname && appointment.dateorder && appointment.complaints
      && appointment.doctorid  ? setDisabledBtn(false) : setDisabledBtn(true);

    setOrder({...order, [type]: value});
  }

  const onClickBtn = () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    const headers = {
      'Content-Type': 'application/json',
      'accesstoken': token
    }
    axios.post("http://localhost:8000/api/createOrder", order, {
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
      })
      .catch(() => {
        setSnackOpen({
          isOpen: true,
          text: "Что-то сломалось!",
          type: "error"
        });
      });
  }

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