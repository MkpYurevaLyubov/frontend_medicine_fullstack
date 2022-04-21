import React from "react";
import MedIcon from "../../icons/medkit.svg";
import {IHeaderProps} from "../types/interfaces";
import "./header.scss";

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <div className="header">
      <img
        className="iconHeader"
        src={MedIcon}
        alt="Icon Medicine"
      />
      <h1>{title}</h1>
    </div>
  );
};

export default Header;