"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import token from "infra/token";

import Loading from "./Loading";
import { useCookies } from "react-cookie";

// Este componente irá ser utilizado quando a rota em que ele foi chamado for privada (necessita de token)
function ProtectedRout({ children }) {
  // Primeiramente, irá renderizar um componente de loading para o usuário
  const [renderObject, setRenderObject] = useState(<Loading />);

  const loginToken = useCookies(["loginToken"])[0].loginToken;
  const router = useRouter();

  useEffect(() => {
    const user = token.decode(loginToken);

    if (!user) {
      router.replace("/login");
      return;
    }

    if (typeof children === "function") {
      setRenderObject(children(user));
    } else {
      setRenderObject(children);
    }
  }, [loginToken, router, children]);

  return renderObject;
}

export default ProtectedRout;
