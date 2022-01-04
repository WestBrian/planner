import { FieldError } from 'react-hook-form'

export function getDefaultMessage(fieldError: FieldError) {
  switch (fieldError.type) {
    case 'required':
      return 'This field is required'
    case 'noOverlap':
      return 'This time overlaps a current task'
    default:
      return 'There is an error with this field'
  }
}
