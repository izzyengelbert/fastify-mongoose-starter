import bcrypt from 'bcrypt';

const generateSalt = () => {
  const saltRounds = 10;
  return bcrypt.genSalt(saltRounds);
};

// eslint-disable-next-line arrow-body-style
const hashPassword = async (password) => {
  const salt = await generateSalt();
  return bcrypt.hash(password, salt);
};

const validatePassword = (plain, hashed) => bcrypt.compare(plain, hashed);

export { hashPassword, validatePassword };
