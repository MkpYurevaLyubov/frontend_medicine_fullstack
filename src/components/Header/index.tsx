import React from "react";
import {useNavigate} from "react-router-dom";
import Buttons from "../elements/Button";
import {IHeaderProps} from "../../types/interfaces";
import MedIcon from "../../icons/medkit.svg";
import "./header.scss";

const Header: React.FC<IHeaderProps> = ({title, flag}) => {
  const navigate = useNavigate();

  const onClickBtn = () => {
    localStorage.removeItem("token");
    return navigate("/authorization");
  };

  return (
    <div className="header">
      <div className="iconAndTitle">
        <img
          className="iconHeader"
          src={MedIcon}
          alt="Icon Medicine"
        />
        <h1>{title}</h1>
      </div>
      {flag &&
        <Buttons
          text="Выход"
          onClick={onClickBtn}
          disabled={false}
        />
      }
    </div>
  );
};

export default Header;