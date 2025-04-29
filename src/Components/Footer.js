import { FaHeart } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full text-center py-6 text-sm text-neutral-500">
      <div className="flex justify-center items-center gap-2">
        <span>© {year}</span>
        <span>Made with</span>
        <FaHeart className="text-red-500" />
        <span>by Dani & Michel</span>
      </div>
    </footer>
  )
}
