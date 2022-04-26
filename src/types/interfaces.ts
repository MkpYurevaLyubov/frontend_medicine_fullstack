import React from "react";

export interface IHeaderProps {
  title: string,
  flag: boolean
}

export interface IInputProps {
  value: string,
  onChange: any,
  title: string,
  flag: boolean
}

export interface IButtonsProps {
  text: string,
  onClick: () => void,
  disabled: boolean
}

export interface ISnackProps {
  isOpen: boolean,
  handleClose: () => void,
  text: string,
  type: string
}

export interface IInputDateProps {
  title: string,
  value: Date,
  onChange: (e: any) => void
}

export interface ISelectedProps {
  values: Array<IDoctors>,
  value: string
  onChange: (e: any) => void,
  title: string
}

export interface IUser {
  login: string,
  password: string,
  password_2?: string
}

export interface ISnack {
  isOpen: boolean,
  text: string,
  type: string
}

export interface IDoctors {
  id: number,
  fullname: string
}

export interface IOrder {
  patientsname: string,
  dateorder: Date,
  complaints: string,
  doctorid: string
}