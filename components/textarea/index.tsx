import { FC, forwardRef } from 'react'
import { FieldWrapper, FieldWrapperProps } from '../field-wrapper'
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps
} from '@chakra-ui/react'
import kebabCase from 'lodash/kebabCase'

type TextareaProps = Pick<FieldWrapperProps, 'label'> & ChakraTextareaProps

export const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ label, ...textareaProps }, ref) => {
  const id = kebabCase(label)

  return (
    <FieldWrapper id={id} label={label}>
      <ChakraTextarea
        ref={ref}
        {...textareaProps}
        id={id}
        size="lg"
        variant="filled"
      />
    </FieldWrapper>
  )
})

Textarea.displayName = 'Textarea'
