const bcrypt = require("bcrypt");

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
};

export const hashWithSalt = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validateUser = async (salt: string, password: string) => {
  return await bcrypt.compare(password, salt);
};
