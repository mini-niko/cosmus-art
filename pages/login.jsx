import InputText from "components/InputText";
import Link from "next/link";

function login() {
  return (
    <div className="bg-slate-200 h-screen flex flex-col items-center justify-center">
      <form className="bg-slate-100 rounded-md border-2 border-black p-8 flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <InputText name="login" label="Nome ou Email" />
        <InputText name="password" label="Senha" />
        <input
          className="bg-slate-200 text-lg font-semibold cursor-pointer rounded-sm border border-black py-2 px-4 hover:bg-slate-300 active:bg-slate-400"
          type="submit"
          value="Enviar"
        />
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
    </div>
  );
}

export default login;
