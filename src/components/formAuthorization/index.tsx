import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../Input";
import InputPassword from "../InputPassword";
import Buttons from "../Button";
import Snack from "../Snack";
import { IUser } from "../types/interfaces";
import "./formAuthorization.scss";

const FormAuthorization: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    login: '',
    password: ''
  });
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState({
    isOpen: false,
    text: '',
    type: ''
  });

  const onChangeInputs = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const person: { [index: string]: string } = {...user};
    person[type] = e.target.value.trim();
    person.login && person.password ? setDisabledBtn(false) : setDisabledBtn(true);
    setUser({login: person.login, password: person.password});
  };

  const onClickBtn = () => {
    axios.post("http://localhost:8000/api/authUser", user)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        setUser({login: '', password: '', password_2: ''});
        setSnackOpen({
          isOpen: true,
          text: "Вы вошли в систему!",
          type: "success"
        });
      })
      .catch((err) => {
        setUser({login: '', password: '', password_2: ''});
        setDisabledBtn(true);
        setSnackOpen({
          isOpen: true,
          text: "Пользователь не найден!",
          type: "error"
        });
      });
  }

  return (
    <div className="mainAuth">
      <h1>Войти в систему</h1>
      <div className="authInput">
        <Input
          value={user.login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInputs("login", e)}
          title="Логин"
          flag={true}
        />
      </div>
      <div className="authInput">
        <InputPassword
          value={user.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInputs("password", e)}
          title="Пароль"
          flag={true}
        />
      </div>
      <div className="authBtn">
        <Buttons
          text="Войти"
          onClick={onClickBtn}
          disabled={disabledBtn}
        />
      </div>
      <p>Ещё не зарегистрированы?</p>
      <Link to={"/registration"}>Зарегистрироваться</Link>
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({...snackOpen, isOpen: false})}
        text={snackOpen.text}
        type={snackOpen.type}
      />
    </div>
  );
};

export default FormAuthorization;