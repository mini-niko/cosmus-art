function InputText({ name, label }) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" for={name}>
        {label}
      </label>
      <input
        className="w-64 rounded-sm border border-black p-1"
        type="text"
        id={name}
        name={name}
      />
    </div>
  );
}

export default InputText;
