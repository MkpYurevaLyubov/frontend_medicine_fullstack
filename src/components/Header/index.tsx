import React from "react";
import MedIcon from "../../icons/medkit.svg";
import "./header.scss";

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
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