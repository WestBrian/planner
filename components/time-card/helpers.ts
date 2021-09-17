import { TaskType } from './types'

export function typeToBgColor(type: TaskType) {
  switch (type) {
    case 'work':
      return 'bg-red-200'
    case 'well-being':
      return 'bg-green-200'
    case 'hobby':
      return 'bg-blue-200'
    case 'fun':
      return 'bg-yellow-200'
    case 'free-time':
      return 'bg-gray-200'
    case 'chore':
      return 'bg-indigo-200'
    default:
      return 'bg-red-200'
  }
}

export function typeToInteractableBackgroundColor(type: TaskType) {
  switch (type) {
    case 'work':
      return 'bg-red-500'
    case 'well-being':
      return 'bg-green-500'
    case 'hobby':
      return 'bg-blue-500'
    case 'fun':
      return 'bg-yellow-500'
    case 'free-time':
      return 'bg-gray-500'
    case 'chore':
      return 'bg-indigo-500'
    default:
      return 'bg-red-500'
  }
}

export function typeToInteractableTextColor(type: TaskType) {
  switch (type) {
    case 'work':
      return 'text-red-200'
    case 'well-being':
      return 'text-green-200'
    case 'hobby':
      return 'text-blue-200'
    case 'fun':
      return 'text-yellow-200'
    case 'free-time':
      return 'text-gray-200'
    case 'chore':
      return 'text-indigo-200'
    default:
      return 'text-red-200'
  }
}

export function typeToBorderColor(type: TaskType) {
  switch (type) {
    case 'work':
      return 'border-red-500'
    case 'well-being':
      return 'border-green-500'
    case 'hobby':
      return 'border-blue-500'
    case 'fun':
      return 'border-yellow-500'
    case 'free-time':
      return 'border-gray-500'
    case 'chore':
      return 'border-indigo-500'
    default:
      return 'border-red-500'
  }
}

export function typeToTitleColor(type: TaskType) {
  switch (type) {
    case 'work':
      return 'text-red-900'
    case 'well-being':
      return 'text-green-900'
    case 'hobby':
      return 'text-blue-900'
    case 'fun':
      return 'text-yellow-900'
    case 'free-time':
      return 'text-gray-900'
    case 'chore':
      return 'text-indigo-900'
    default:
      return 'text-red-900'
  }
}

export function typeToMetaColor(type: TaskType) {
  switch (type) {
    case 'work':
      return 'text-red-800'
    case 'well-being':
      return 'text-green-800'
    case 'hobby':
      return 'text-blue-800'
    case 'fun':
      return 'text-yellow-800'
    case 'free-time':
      return 'text-gray-800'
    case 'chore':
      return 'text-indigo-800'
    default:
      return 'text-red-800'
  }
}
