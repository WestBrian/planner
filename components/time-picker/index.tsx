import { FC } from 'react'
import { FieldWrapper } from '../field-wrapper'
import {
  Stack,
  Select,
  Button,
  Box,
  useRadioGroup,
  useRadio,
  UseRadioProps
} from '@chakra-ui/react'
import { taskLengths } from '../time-card/types'
import range from 'lodash/range'
import { parse, format } from 'date-fns'
import { FieldError } from 'react-hook-form'

function parseStartTime(hours: string, minutes: string) {
  return parse(`${hours}:${minutes}`, 'H:mm', new Date())
}

interface StartMinuteRadioProps extends UseRadioProps {
  selected: boolean
}

const StartMinuteRadio: FC<StartMinuteRadioProps> = ({
  selected,
  children,
  ...useRadioProps
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(useRadioProps)

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

interface TimePickerProps {
  startHour: number
  endHour: number
  value?: Date
  error?: FieldError
  onChange: (date: Date) => void
}

export const TimePicker: FC<TimePickerProps> = ({
  startHour,
  endHour,
  value,
  error,
  onChange
}) => {
  const hours = value ? format(value, 'H') : '8'
  const minutes = value ? format(value, 'mm') : '00'
  const id = 'start-time'
  const times = range(startHour, endHour)

  function setHours(hours: string) {
    onChange(parseStartTime(hours, minutes))
  }

  function setMinutes(minutes: string) {
    onChange(parseStartTime(hours, minutes))
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'start time minutes',
    defaultValue: '00',
    onChange: setMinutes
  })

  function militaryToRegular(hour: number) {
    return format(parse(String(hour), 'H', new Date()), 'h:')
  }

  return (
    <FieldWrapper
      id={id}
      label={`Start time (${format(
        parseStartTime(hours, minutes),
        'hh:mm a'
      )})`}
      error={error}
    >
      <Stack direction="row" spacing="4" align="center">
        <Select
          size="lg"
          variant="filled"
          value={hours}
          minWidth="75px"
          onChange={(e) => setHours(e.target.value)}
        >
          {times.map((hour) => (
            <option key={`hour-${hour}`} value={hour}>
              {militaryToRegular(hour)}
            </option>
          ))}
        </Select>
        <Stack direction="row" {...getRootProps()}>
          {taskLengths
            .map((l) => {
              let j = l - 15
              return j === 0 ? '00' : String(j)
            })
            .map((length) => (
              <StartMinuteRadio
                key={`length-${length}`}
                selected={minutes === length}
                {...getRadioProps({ value: length })}
              >
                {length}
              </StartMinuteRadio>
            ))}
        </Stack>
      </Stack>
    </FieldWrapper>
  )
}
