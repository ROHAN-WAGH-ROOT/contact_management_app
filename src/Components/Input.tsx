import React from "react";

interface Inputs {
  name: string;
  label: string;
  value: string;
  type: string;
  handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export default function Input({
  name,
  className,
  label,
  type,
  value,
  handleForm,
}: Inputs) {
  return (
    <div>
      <label className="text-base font-medium">{label}</label>
      <input
        name={name}
        className={className}
        type={type}
        value={value}
        onChange={(e) => {
          handleForm(e);
        }}
      />
    </div>
  );
}
