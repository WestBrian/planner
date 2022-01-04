import { FC, forwardRef } from 'react'
import { FieldWrapper, FieldWrapperProps } from '../field-wrapper'
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react'
import kebabCase from 'lodash/kebabCase'
import { FieldError } from 'react-hook-form'

interface SelectOption {
  label: string
  value: string
}

type SelectOptions = (string | number)[] | SelectOption[]

type SelectProps = Pick<FieldWrapperProps, 'label' | 'error'> &
  ChakraSelectProps & {
    options: SelectOptions
    error?: FieldError
  }

export const Select: FC<SelectProps> = forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ label, options, error, ...selectProps }, ref) => {
  const id = kebabCase(label)

  return (
    <FieldWrapper id={id} label={label} error={error}>
      <ChakraSelect
        ref={ref}
        {...selectProps}
        id={id}
        size="lg"
        variant="filled"
        isInvalid={!!error}
      >
        {options.map((o) => {
          if (typeof o === 'object') {
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            )
          } else {
            return (
              <option key={o} value={o}>
                {o}
              </option>
            )
          }
        })}
      </ChakraSelect>
    </FieldWrapper>
  )
})

Select.displayName = 'Select'
