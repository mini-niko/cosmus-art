import React from "react";

import InputText from "components/InputText";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [inputDisable, setInputDisable] = useState(false);
  const [confirmRegistry, setConfirmRegistry] = useState(false);

  const router = useRouter();

  async function submit(event) {
    event.preventDefault();
    setInputDisable(true);

    const body = JSON.stringify({
      name,
      email,
      password,
      confirm_password: confirmPassword,
    });

    const response = await fetch(`api/v1/auth/register`, {
      method: "POST",
      body,
    });

    console.log(response.status);

    if (response.status == 201) {
      setConfirmRegistry(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else setInputDisable(false);
  }

  return (
    <form
      onSubmit={submit}
      className="bg-slate-100 rounded-md border-2 border-black p-8 flex flex-col gap-4 items-center"
    >
      <h1 className="text-3xl font-bold">Registro</h1>
      <InputText
        disabled={inputDisable}
        name="login"
        label="Nome"
        onChange={(e) => setName(e.target.value)}
      />
      <InputText
        disabled={inputDisable}
        name="email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputText
        disabled={inputDisable}
        name="password"
        label="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputText
        disabled={inputDisable}
        name="confirm_password"
        label="Confirme a Senha"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <SubmitButton inputDisable={inputDisable} />
      <span>
        {!confirmRegistry ? (
          <>
            Já possui uma conta?{" "}
            <Link
              className="text-blue-500 font-semibold hover:text-blue-700"
              href="/login"
            >
              Entre agora!
            </Link>
          </>
        ) : (
          "Conta criada! Redirecionando..."
        )}
      </span>
    </form>
  );
}

export default RegisterForm;
