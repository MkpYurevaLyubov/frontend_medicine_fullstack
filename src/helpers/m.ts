import {IDoctors} from "../types/interfaces";

export const isValidatePassword = (password: string): boolean => {
  const re = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g;
  return re.test(password);
};

export const getDoctor = (doctors: IDoctors[], id: number) => {
  const doctor = doctors.find((el) => el.id === id);
  return doctor!.fullname;
};