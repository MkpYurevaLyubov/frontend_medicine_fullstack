import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import FormAuthorization from '../../components/formAuthorization';
import HospitalIcon from '../../icons/hospital2.svg';
import './authorization.scss';

const AuthorizationPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) navigate('/main');
  }, []);

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
