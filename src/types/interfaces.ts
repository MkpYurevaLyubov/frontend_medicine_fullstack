import React from 'react';

export interface IDoctors {
  Id: number;
  fullName: string;
}

export interface IArrFilters {
  Id: string;
  fullName: string;
}

export interface IUser {
  login: string;
  password: string;
  password2?: string;
}

export interface ISnack {
  isOpen: boolean;
  text: string;
  type: string;
}

export interface IOrder {
  Id?: string;
  patientsName: string;
  dateOrder: Date;
  complaints: string;
  doctorId: string;
  doctor?: {
    fullName: string;
  };
}

export interface IDeleteOrder {
  id: string | null;
  isOpen: boolean;
}

export interface IFilter {
  method: string;
  type: string;
}

export interface ISort {
  from: string;
  to: string;
}

export interface IHeaderProps {
  title: string;
  flag: boolean;
}

export interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  flag: boolean;
}

export interface IButtonsProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export interface ISnackProps {
  isOpen: boolean;
  handleClose: () => void;
  text: string;
  type: string;
}

export interface IInputDateProps {
  title: string;
  value: Date;
  onChange: (e: Date | string | null) => void;
  disablePast: boolean;
}

export interface ISelectedProps {
  values: IDoctors[] | IArrFilters[];
  value: string;
  onChange: (e: string) => void;
  title: string;
}

export interface IFormAddingOrdersProps {
  allDoctors: IDoctors[];
  updatePage: () => void;
}

export interface ITableOrdersProps {
  orders: IOrder[];
  allDoctors: IDoctors[];
  updatePage: () => void;
}

export interface IResponsiveDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  text: string;
  onClickYes: () => void;
}

export interface IFormEditingOrderProps {
  allDoctors: IDoctors[];
  order: IOrder;
  onChange: (
    type: string,
    value: string | React.ChangeEvent<HTMLInputElement> | Date | null,
  ) => void;
  isOpen: boolean;
  handleClose: () => void;
  onClickYes: () => void;
  disabled: boolean;
}

export interface IFormFilterOrdersProps {
  filter: IFilter;
  sort: ISort;
  onChange: (type: string, value: string | Date | null) => void;
  ftrWithDate: boolean;
  changeBtnFltDate: () => void;
  onClickSaveDate: () => void;
}
