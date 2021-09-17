import { FC, TextareaHTMLAttributes, forwardRef } from 'react'
import kebabCase from 'lodash/kebabCase'
import { Label } from '../label'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ label, ...textareaProps }, ref) => {
  const inputId = kebabCase(label)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <textarea
        id={inputId}
        ref={ref}
        className="rounded-lg bg-gray-200 p-2 placeholder-gray-400 w-full"
        {...textareaProps}
      />
    </div>
  )
})
