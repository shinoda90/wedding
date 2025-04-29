import { ReactComponent as CloseIcon } from '../icons/close_button.svg'

export default function CloseButton({ onClick, className = '' }) {
  return (
    <CloseIcon
      onClick={onClick}
      className={`w-12 h-12 fill-neutral hover:fill-warning cursor-pointer transition-colors duration-200 absolute top-4 right-4 z-50 ${className}`}
    />
  )
}
