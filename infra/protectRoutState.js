const routList = {
  public: ["/"],
  unprotected: ["/register", "/login"],
};

function isPrivate(rout) {
  const foundPublic = routList.public.find((publicRout) => publicRout == rout);
  const foundUnprotected = routList.unprotected.find(
    (publicRout) => publicRout == rout,
  );

  return foundPublic || foundUnprotected ? false : true;
}

function isPublic(rout) {
  const found = routList.public.find((publicRout) => publicRout == rout);

  return found ? true : false;
}

function isUnprotected(rout) {
  const found = routList.unprotected.find((publicRout) => publicRout == rout);

  return found ? true : false;
}

const privateRouts = {
  isPrivate,
  isPublic,
  isUnprotected,
};

export default privateRouts;
