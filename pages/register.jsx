import InputText from "components/InputText";
import Link from "next/link";

function register() {
  return (
    <div className="bg-slate-200 h-screen flex flex-col items-center justify-center">
      <form className="bg-slate-100 rounded-md border-2 border-black p-8 flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold">Registro</h1>
        <InputText name="login" label="Nome" />
        <InputText name="email" label="Email" />
        <InputText name="password" label="Senha" />
        <input
          className="bg-slate-200 text-lg font-semibold cursor-pointer rounded-sm border border-black py-2 px-4 hover:bg-slate-300 active:bg-slate-400"
          type="submit"
          value="Enviar"
        />
        <span>
          Já possui uma conta?{" "}
          <Link
            className="text-blue-500 font-semibold hover:text-blue-700"
            href="/login"
          >
            Entre agora!
          </Link>
        </span>
      </form>
    </div>
  );
}

export default register;
