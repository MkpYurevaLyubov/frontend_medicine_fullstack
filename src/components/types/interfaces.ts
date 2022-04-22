export interface IHeaderProps {
  title: string
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

export interface IUser {
  login: string,
  password: string,
  password_2: string
}

export interface ISnack {
  isOpen: boolean,
  text: string,
  type: string
}