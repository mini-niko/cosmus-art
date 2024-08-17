const tokenOptions = {
  httpOnly: true,
  maxAge: 86400000 * 7,
};

const cookiesConfig = {
  tokenOptions,
};

export default cookiesConfig;
