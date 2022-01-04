import { FC } from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'
import { getDefaultMessage } from './helpers'

export interface FieldWrapperProps {
  id: string
  label: string
  error?: FieldError
}

export const FieldWrapper: FC<FieldWrapperProps> = ({
  id,
  label,
  error,
  children
}) => {
  return (
    <Stack>
      <Text as="label" htmlFor={id}>
        {label}
      </Text>
      {children}
      {error && (
        <Text fontSize="sm" color="red.500">
          {getDefaultMessage(error)}
        </Text>
      )}
    </Stack>
  )
}
