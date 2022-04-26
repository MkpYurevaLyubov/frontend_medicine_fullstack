import React from "react";
import Header from "../../components/Header";
import FormAuthorization from "../../components/formAuthorization";
import HospitalIcon from "../../icons/hospital2.svg";
import "./authorization.scss";

const AuthorizationPage: React.FC = () => {
  return (
    <>
      <Header title="Войти в систему" flag={false} />
      <div className="authPage">
        <img className="mainImg" src={HospitalIcon} alt="Icon Hospital" />
        <FormAuthorization />
      </div>
    </>
  );
};

export default AuthorizationPage;