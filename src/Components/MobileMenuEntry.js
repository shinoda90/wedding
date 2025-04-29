export default function MobileMenuEntry({ href, onClick, text }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="px-6 py-2 rounded-md inline-block"
    >
      {text}
    </a>
  )
}
