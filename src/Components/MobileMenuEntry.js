export default function MobileMenuEntry({ href, onClick, className, text }) {
  return (
    <a href={href} onClick={onClick} className={className}>
      {text}
    </a>
  )
}
