import { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <button
      className="p-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg uppercase font-semibold"
      {...buttonProps}
    >
      {children}
    </button>
  )
}
