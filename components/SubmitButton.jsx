function SubmitButton({ disabled }) {
  return (
    <input
      disabled={disabled}
      className="bg-slate-200 disabled:bg-gray-300 disabled:text-gray-700 disabled:border-gray-700 text-lg font-semibold enabled:cursor-pointer rounded-sm border border-black py-2 px-4 enabled:hover:bg-slate-300"
      type="submit"
      value="Enviar"
    />
  );
}

export default SubmitButton;
