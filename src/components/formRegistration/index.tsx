import React, {useState} from "react";
import { Link } from "react-router-dom";
import Input from "../Input";
import Buttons from "../Button";
import Snack from "../Snack";
import InputPassword from "../InputPassword";
import { isValidatePassword } from "../help/m";
import { ISnack, IUser } from "../types/interfaces";
import axios from "axios";
import "./formRegistrashion.scss";

const FormRegistration: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    login: '',
    password: '',
    password_2: ''
  });
  const [uniqueLogin, setUniqueLogin] = useState<boolean>(true);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: '',
    type: ''
  });

  const onChangeUser = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const person: { [index: string]: string } = {...user};
    person[type] = e.target.value.trim();

    person.login.length >= 6 && isValidatePassword(person.password)
      && person.password === person.password_2 ? setDisabledBtn(false) : setDisabledBtn(true);

    if (!uniqueLogin) setUniqueLogin(true);
    setUser({login: person.login, password: person.password, password_2: person.password_2});
  };

  const onClickBtn = () => {
    axios.post("http://localhost:8000/api/createUser", user)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        setUser({login: '', password: '', password_2: ''});
        setSnackOpen({
          isOpen: true,
          text: "Пользователь успешно зарегистрирован!",
          type: "success"
        });
      })
      .catch((err) => {
        if (err.response.data.e.code === '23505') {
          setSnackOpen({
            isOpen: true,
            text: "Пользователь с таким логином уже существует! Пожалуйста, измените логин",
            type: "error"
          });
          setUniqueLogin(false);
        }
      });
  }

  return (
    <div className="main">
      <h1>Регистрация</h1>
      <div className="info">
        <Input
          value={user.login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeUser("login", e)}
          title="Логин"
          flag={(!user.login || !!user.login) && (user.login.length === 0 || user.login.length > 6) && uniqueLogin}
        />
        <span>Не меньше 6 символов</span>
        <InputPassword
          value={user.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeUser("password", e)}
          title="Пароль"
          flag={(!user.password || !!user.password) && (!user.password || isValidatePassword(user.password))}
        />
        <span>Не меньше 6 символов и прописные лат.буквы</span>
        <InputPassword
          value={user.password_2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeUser("password_2", e)}
          title="Повторите пароль"
          flag={(!user.password_2 || !!user.password_2) && (!user.password_2 || user.password === user.password_2)}
        />
        <span>Не меньше 6 символов и прописные лат.буквы</span>
        <div className="btnRegistration">
          <Buttons
            text="Зарегистрироваться"
            onClick={onClickBtn}
            disabled={disabledBtn}
          />
        </div>
      </div>
      <p>
        Уже зарегистрированы? <Link to={"/authorization"}>Войти</Link>
      </p>
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({...snackOpen, isOpen: false})}
        text={snackOpen.text}
        type={snackOpen.type}
      />
    </div>
  );
};

export default FormRegistration;