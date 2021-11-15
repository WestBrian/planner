import { FC } from 'react'
import classNames from 'classnames'
import { UseFormRegister } from 'react-hook-form'

interface BlockRadioProps {
  label: string
  emoji?: string
  value: string
  name: string
  selected: boolean
  register: UseFormRegister<any>
}

export const BlockRadio: FC<BlockRadioProps> = ({
  label,
  emoji,
  value,
  name,
  selected,
  register
}) => {
  const wrapperClasses = classNames({
    rounded: true,
    'text-white': true,
    flex: true,
    'justify-center': true,
    'items-center': true,
    'p-4': true,
    'w-16': true,
    'h-16': true,
    'cursor-pointer': true,
    relative: true,
    'hover:bg-green-600': true,
    'bg-green-700': selected,
    'bg-green-500': !selected
  })

  return (
    <div className={wrapperClasses}>
      <input
        {...register(name)}
        id={`${label}-radio`}
        type="radio"
        className="sr-only"
        value={value}
        name={name}
      />
      <label
        htmlFor={`${label}-radio`}
        className="font-semibold text-3xl cursor-pointer w-16 h-16 absolute inset-0 flex justify-center items-center"
        aria-label={emoji ? label : undefined}
      >
        {emoji || label}
      </label>
    </div>
  )
}
