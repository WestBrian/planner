import { FC, useState } from 'react'
import {
  Box,
  Button,
  Wrap,
  WrapItem,
  useRadio,
  useRadioGroup,
  UseRadioProps
} from '@chakra-ui/react'
import { TaskType, taskTypes } from '../time-card/types'
import { getEmoji } from '../time-card/helpers'
import { FieldWrapper } from '../field-wrapper'
import without from 'lodash/without'

interface TypeRadioProps extends UseRadioProps {
  selected: boolean
}

const TypeRadio: FC<TypeRadioProps> = ({
  selected,
  children,
  ...radioProps
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps)

  return (
    <Box as="label">
      <input {...getInputProps()} />
      <Button
        as="div"
        cursor="pointer"
        colorScheme="teal"
        variant={selected ? 'solid' : 'outline'}
        {...getCheckboxProps()}
      >
        {children}
      </Button>
    </Box>
  )
}

interface TypePickerProps {
  value: TaskType | ''
  onChange: (type: TaskType) => void
}

export const TypePicker: FC<TypePickerProps> = ({ value, onChange }) => {
  const id = 'task-type'
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'task type',
    onChange: (nextValue) => {
      const value = nextValue as TaskType
      onChange(value)
    }
  })

  return (
    <FieldWrapper id={id} label="Task type">
      <Wrap {...getRootProps()}>
        {without(taskTypes, 'free-time')
          .sort()
          .map((taskType) => (
            <WrapItem key={taskType}>
              <TypeRadio
                selected={value === taskType}
                {...getRadioProps({ value: taskType })}
              >
                {getEmoji(taskType)} {taskType}
              </TypeRadio>
            </WrapItem>
          ))}
      </Wrap>
    </FieldWrapper>
  )
}
