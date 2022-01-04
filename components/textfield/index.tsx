import { FC, forwardRef } from 'react'
import { Input, Text, InputProps } from '@chakra-ui/react'
import { FieldWrapper, FieldWrapperProps } from '../field-wrapper'
import kebabCase from 'lodash/kebabCase'

type TextFieldProps = Pick<FieldWrapperProps, 'label' | 'error'> & InputProps

export const TextField: FC<TextFieldProps> = forwardRef<
  HTMLInputElement,
  TextFieldProps
>(({ label, error, ...inputProps }, ref) => {
  const id = kebabCase(label)

  return (
    <FieldWrapper id={id} label={label} error={error}>
      <Input
        ref={ref}
        {...inputProps}
        id={id}
        size="lg"
        variant="filled"
        isInvalid={!!error}
      />
    </FieldWrapper>
  )
})

TextField.displayName = 'TextField'
