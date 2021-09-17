import { FC, SelectHTMLAttributes, forwardRef } from 'react'
import { Label } from '../label'
import kebabCase from 'lodash/kebabCase'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: string[]
}

export const Select: FC<SelectProps> = forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ label, options, ...selectProps }, ref) => {
  const selectId = kebabCase(label)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={selectId}>{label}</Label>
      <select
        id={selectId}
        ref={ref}
        className="rounded-lg bg-gray-200 p-2 placeholder-gray-400 w-full"
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})
