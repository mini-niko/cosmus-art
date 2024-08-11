function InputText({ name, label, onChange, disabled }) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        disabled={disabled}
        className="w-64 disabled:bg-gray-100 rounded-sm border border-black disabled:border-gray-600 p-1"
        type="text"
        id={name}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}

export default InputText;
