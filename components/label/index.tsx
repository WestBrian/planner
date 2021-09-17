import { FC, LabelHTMLAttributes } from 'react'

export const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...labelProps
}) => {
  return (
    <label
      className="uppercase font-semibold text-gray-700 text-sm"
      {...labelProps}
    >
      {children}
    </label>
  )
}
