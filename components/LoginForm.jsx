import Link from "next/link";
import InputText from "./InputText";
import { useState } from "react";
import { useCookies } from "react-cookie";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/router";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [inputDisable, setInputDisable] = useState(false);

  const setToken = useCookies(["loginToken"])[1];
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setInputDisable(true);

    const loginRequest = {
      login,
      password,
    };

    const requestBody = JSON.stringify(loginRequest);

    const response = await fetch("api/v1/auth/login", {
      method: "POST",
      body: requestBody,
    });

    if (response.status != 202) {
      setInputDisable(false);
      return;
    }

    const responseBody = await response.json();
    const token = responseBody.token;

    setToken("loginToken", token);

    router.push("/home");
  }

  return (
    <form
      onSubmit={submit}
      className="bg-slate-100 rounded-md border-2 border-black p-8 flex flex-col gap-4 items-center"
    >
      <h1 className="text-3xl font-bold">Login</h1>
      <InputText
        disabled={inputDisable}
        onChange={(e) => setLogin(e.target.value)}
        name="login"
        label="Nome ou Email"
      />
      <InputText
        disabled={inputDisable}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        label="Senha"
      />
      <SubmitButton disabled={inputDisable} />
      <span>
        Não tem uma conta?{" "}
        <Link
          className="text-blue-500 font-semibold hover:text-blue-700"
          href="/register"
        >
          Crie agora!
        </Link>
      </span>
    </form>
  );
}

export default LoginForm;
