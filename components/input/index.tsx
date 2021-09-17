import { FC, InputHTMLAttributes, forwardRef } from 'react'
import kebabCase from 'lodash/kebabCase'
import { Label } from '../label'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...inputProps }, ref) => {
    const inputId = kebabCase(label)

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={inputId}>{label}</Label>
        <input
          id={inputId}
          ref={ref}
          className="rounded-lg bg-gray-200 p-2 placeholder-gray-400 w-full"
          {...inputProps}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
