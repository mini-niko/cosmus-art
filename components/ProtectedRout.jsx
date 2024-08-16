"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import token from "infra/token";

import Loading from "./Loading";
import { useCookies } from "react-cookie";

function ProtectedRout({ children }) {
  const [renderObject, setRenderObject] = useState(<Loading />);

  const loginToken = useCookies(["loginToken"])[0].loginToken;
  const removeLoginToken = useCookies(["loginToken"])[2];
  const router = useRouter();

  useEffect(() => {
    const user = token.decode(loginToken);

    if (!user) {
      removeLoginToken("loginToken");
      router.replace("/login");
      return;
    }

    if (typeof children === "function") {
      setRenderObject(children(user));
    } else {
      setRenderObject(children);
    }
  }, [loginToken, removeLoginToken, router, children]);

  return renderObject;
}

export default ProtectedRout;
