import bcrypt from "bcrypt";

async function encrypt(string) {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
  const stringHash = await bcrypt.hash(string, salt);

  return stringHash;
}

async function compare(string, stringHash) {
  const match = await bcrypt.compare(string, stringHash);

  return match;
}

const encryptModule = {
  encrypt,
  compare,
};

export default encryptModule;
