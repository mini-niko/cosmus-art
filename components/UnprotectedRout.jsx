"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import token from "infra/token";

import Loading from "./Loading";
import { useCookies } from "react-cookie";

function UnprotectedRout({ children }) {
  const [renderObject, setRenderObject] = useState(<Loading />);

  const loginToken = useCookies(["loginToken"])[0].loginToken;
  const removeLoginToken = useCookies(["loginToken"])[2];
  const router = useRouter();

  useEffect(() => {
    if (loginToken) {
      const user = token.decode(loginToken);

      if (!user) removeLoginToken("loginToken");

      router.replace("/home");
      return;
    }

    setRenderObject(children);
  }, [loginToken, removeLoginToken, router, children]);

  return renderObject;
}

export default UnprotectedRout;
