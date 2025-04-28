import { useLocation } from 'react-router-dom'

export default function Listitem({
  link,
  text,
  onClick,
  activeSection,
  classType = '',
  icon = null, // 👈 Neu: icon prop optional
}) {
  const location = useLocation()
  const isHashLink = link.includes('#')
  const hash = link.split('#')[1]

  let isActive = false

  if (isHashLink) {
    isActive = activeSection === hash && location.pathname === '/'
  } else {
    isActive = location.pathname === link
  }

  return (
    <li>
      <a
        href={link}
        onClick={onClick}
        className={`relative px-4 py-2 text-sm transition duration-300 ease-in-out
          ${isActive ? 'text-secondary font-semibold' : 'text-primary'}
          after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
          after:w-full after:scale-x-0 after:transition-transform after:duration-300
          after:bg-accent hover:after:scale-x-100 ${classType}
        `}
      >
        {/* Wenn icon vorhanden ist, zeige icon, sonst text */}
        {icon ? (
          <span className="flex items-center justify-center">{icon}</span>
        ) : (
          text
        )}
      </a>
    </li>
  )
}
