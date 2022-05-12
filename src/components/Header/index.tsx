import React from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../elements/Button';
import axiosApiInstance from '../../helpers/request';
import { IHeaderProps } from '../../types/interfaces';
import MedIcon from '../../icons/medkit.svg';
import './header.scss';

const Header: React.FC<IHeaderProps> = ({ title, flag }) => {
  const navigate = useNavigate();

  const onClickBtn = () => {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) return navigate('/authorization');
    axiosApiInstance
      .delete(`http://localhost:8000/api/deleteRfrToken`)
      .then(() => {
        localStorage.removeItem('token');
        return navigate('/authorization');
      })
      .catch(() => {
        localStorage.removeItem('token');
        return navigate('/authorization');
      });
  };

  return (
    <div className="header">
      <div className="iconAndTitle">
        <img className="iconHeader" src={MedIcon} alt="Icon Medicine" />
        <h1>{title}</h1>
      </div>
      {flag && <Buttons text="Выход" onClick={onClickBtn} disabled={false} />}
    </div>
  );
};

export default Header;
