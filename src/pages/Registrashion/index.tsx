import React from "react";
import Header from "../../components/Header";
import HospitalIcon from "../../icons/hospital2.svg";
import FormRegistration from "../../components/formRegistration";
import "./registrashion.scss";

const RegistrationPage: React.FC = () => {
  return (
    <>
      <Header title="Зарегистрироваться в системе" />
      <div className="registrPage">
        <img className="mainImg" src={HospitalIcon} alt="Icon Hospital" />
        <FormRegistration />
      </div>
    </>
  );
};

export default RegistrationPage;