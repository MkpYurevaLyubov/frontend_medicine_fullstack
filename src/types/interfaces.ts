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
  values: IDoctors[],
  value: string,
  onChange: (e: any) => void,
  title: string
}

export interface IFormAddingOrdersProps {
  allDoctors: IDoctors[],
  updatePage: () => void
}

export interface ITableOrdersProps {
  orders: IOrder[],
  allDoctors: IDoctors[],
  updatePage: () => void
}

export interface IResponsiveDialogProps {
  isOpen: boolean,
  handleClose: () => void,
  text: string,
  onClickYes: () => void
}

export interface IFormEditingOrderProps {
  allDoctors: IDoctors[],
  order: IOrder,
  onChange: (type: string, value: string | React.ChangeEvent<HTMLInputElement>) => void,
  isOpen: boolean,
  handleClose: () => void,
  onClickYes: () => void,
  disabled: boolean
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
  id?: number,
  patientsname: string,
  dateorder: Date,
  complaints: string,
  doctorid: string
}

export interface IDeleteOrder {
  id: number | null,
  isOpen: boolean
}