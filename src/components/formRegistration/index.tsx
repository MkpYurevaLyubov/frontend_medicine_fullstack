import React, {useState} from "react";
import Input from "../Input";
import Buttons from "../Button";
import Snack from "../Snack";
import { isValidatePassword } from "../help/m";
import { ISnack } from "../help/interface";
import axios from "axios";
import "./formRegistrashion.scss";

interface IUser {
  login: string,
  password: string,
  password_2: string
}

interface IFlag {
  login: boolean,
  password: boolean,
}

const FormRegistration: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    login: '',
    password: '',
    password_2: ''
  });

  const [flag, setFlag] = useState<IFlag>({
    login: false,
    password: false,
  });

  const [snackOpen, setSnackOpen] = useState<ISnack>({
    isOpen: false,
    text: ''
  });

  const onChangeUser = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFlag({...flag, [type]: false})
    setUser({...user, [type]: e.target.value});
  };

  const onClickBtn = () => {
    if (user.login.length < 6) {
      setSnackOpen({isOpen: true, text: "Проверьте корректность введения логина!"});
      return setFlag({...flag, login: true});
    }

    if (!isValidatePassword(user.password) || !isValidatePassword(user.password_2)) {
      setSnackOpen({isOpen: true, text: "Проверьте корректность введения паролей!"});
      return setFlag({...flag, password: true});
    }

    if (user.password !== user.password_2) {
      setSnackOpen({isOpen: true, text: "Пароли не совпадают!"});
      return setFlag({...flag, password: true});
    }

    axios.post("http://localhost:8000/api/createUser", user)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        setUser({login: '', password: '', password_2: ''});
      })
      .catch((err) => {
        console.log('err', err);
        if (err.response.data.e.code === '23505') {
          setSnackOpen({
            isOpen: true,
            text: "Пользователь с таким логином уже существует! Пожалуйста, измените логин"
          });
          return setFlag({...flag, login: true});
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
          type="text"
          flag={flag.login}
        />
        <span>Не меньше 6 символов</span>
        <Input
          value={user.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeUser("password", e)}
          title="Пароль"
          type="password"
          flag={flag.password}
        />
        <span>Не меньше 6 символов и прописные лат.буквы</span>
        <Input
          value={user.password_2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeUser("password_2", e)}
          title="Повторите пароль"
          type="password"
          flag={flag.password}
        />
        <span>Не меньше 6 символов и прописные лат.буквы</span>
        <Buttons text="Зарегистрироваться" onClick={onClickBtn} />
      </div>
      <a href={""}>Авторизоваться</a>
      <Snack
        isOpen={snackOpen.isOpen}
        handleClose={() => setSnackOpen({...snackOpen, isOpen: false})}
        text={snackOpen.text}
      />
    </div>
  );
};

export default FormRegistration;