import React from "react";
import Header from "../../components/Header";
import HospitalIcon from "../../icons/hospital2.svg";
import "./authorization.scss";

const AuthorizationPage: React.FC = () => {
  return (
    <>
      <Header title="Войти в систему" />
      <div className="authPage">
        <img className="mainImg" src={HospitalIcon} alt="Icon Hospital" />
      </div>
    </>
  );
};

export default AuthorizationPage;