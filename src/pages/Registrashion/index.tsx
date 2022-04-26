import React from "react";
import Header from "../../components/Header";
import FormRegistration from "../../components/formRegistration";
import HospitalIcon from "../../icons/hospital2.svg";
import "./registrashion.scss";

const RegistrationPage: React.FC = () => {
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