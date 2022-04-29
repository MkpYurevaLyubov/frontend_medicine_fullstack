import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import FormRegistration from "../../components/formRegistration";
import HospitalIcon from "../../icons/hospital2.svg";
import "./registrashion.scss";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) navigate("/main");
  }, []);

  return (
    <>
      <Header title="Зарегистрироваться в системе" flag={false} />
      <div className="registrPage">
        <img className="mainImg" src={HospitalIcon} alt="Icon Hospital" />
        <FormRegistration />
      </div>
    </>
  );
};

export default RegistrationPage;