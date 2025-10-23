import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ id, name, value, placeholder, onChange, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      type="text"
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md w-full px-4 h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
