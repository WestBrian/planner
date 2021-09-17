import { ButtonHTMLAttributes, FC } from 'react'
import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'tertiary'
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...buttonProps
}) => {
  const buttonClasses = classNames({
    'p-2': true,
    'px-4': true,
    'bg-green-500': variant === 'primary',
    'border-2': variant === 'tertiary',
    'border-green-500': variant === 'tertiary',
    'text-green-500': variant === 'tertiary',
    'hover:bg-green-600': variant === 'primary',
    'text-white': true,
    'rounded-lg': true,
    uppercase: true,
    'font-semibold': true
  })

  return (
    <button className={buttonClasses} {...buttonProps}>
      {children}
    </button>
  )
}
