export const isValidatePassword = (password: string): boolean => {
  const re = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g;
  return re.test(password);
};

export const isValidateDate = (date: any) => {
  return new Date(date).getTime() / 8.64e+7 >= Math.floor(new Date().getTime() / 8.64e+7);
};