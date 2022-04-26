import React from "react";
import Header from "../../components/Header";
import FormAddingOrders from "../../components/formAddingOrders";
import "./main.scss";

const MainPage: React.FC = () => {
  return (
    <div className="mainPage">
      <Header title="Приемы" flag={true} />
      <FormAddingOrders />
    </div>
  );
};

export default MainPage;
