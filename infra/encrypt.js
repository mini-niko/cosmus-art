import bcrypt from "bcrypt";

async function encrypt(string) {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
  const stringHash = await bcrypt.hash(string, salt);

  return stringHash;
}

async function compare(string, stringHash) {
  return await bcrypt.compare(string, stringHash);
}

const encryptModule = {
  encrypt,
  compare,
};

export default encryptModule;
