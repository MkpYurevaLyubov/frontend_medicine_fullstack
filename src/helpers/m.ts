import {IDoctors} from "../types/interfaces";

export const isValidatePassword = (password: string): boolean => {
  const re = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g;
  return re.test(password);
};

const padTo2Digits = (num: string) => {
  return num.toString().padStart(2, '0');
};

export const convertDate = (date: any) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('.');
};

export const getDoctor = (doctors: IDoctors[], id: number) => {
  const doctor = doctors.find((el) => el.id === id);
  return doctor!.fullname;
};