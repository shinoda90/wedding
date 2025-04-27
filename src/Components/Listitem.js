export default function Listitem({
  link,
  text,
  onClick,
  activeSection,
  classType = '',
}) {
  const hash = link.split('#')[1]
  const isActive = hash && activeSection === hash

  return (
    <li>
      <a
        href={link}
        onClick={onClick}
        className={`relative px-4 py-2 text-sm transition duration-300 ease-in-out
          ${isActive ? 'text-purple-600 font-semibold' : 'text-gray-800'}
          after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
          after:w-full after:scale-x-0 after:transition-transform after:duration-300
          after:bg-purple-600 hover:after:scale-x-100 ${classType} // classType wird hier hinzugefügt
        `}
      >
        {text}
      </a>
    </li>
  )
}
