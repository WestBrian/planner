import { FC, InputHTMLAttributes } from 'react'
import kebabCase from 'lodash/kebabCase'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: FC<InputProps> = ({ label, ...inputProps }) => {
  const inputId = kebabCase(label)

  return (
    <div className="flex flex-col gap-1">
      <label
        className="uppercase font-semibold text-gray-700 text-sm"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        id={inputId}
        className="rounded-lg bg-gray-200 p-2 placeholder-gray-400 w-full"
        {...inputProps}
      />
    </div>
  )
}
