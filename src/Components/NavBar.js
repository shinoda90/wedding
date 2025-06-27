import Listitem from './Listitem'
import Logo from '../image/Logo_new.png'
import { useState, useEffect } from 'react'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import SlideDown from './SlideDown'
import { ReactComponent as MailIcon } from '../icons/mail_icon.svg'
import { ReactComponent as BurgerIcon } from '../icons/burger.svg'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { t } = useTranslation()

  const handleToggle = () => setIsOpen(!isOpen)
  const handleClose = () => setIsOpen(false)
  const changeLanguage = (lng) => i18n.changeLanguage(lng)

  useEffect(() => {
    const sectionIds = ['home', 'info', 'location', 'timeline', 'rsvp']
    const observers = []

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          },
          { threshold: 0.5 }
        )
        observer.observe(section)
        observers.push(observer)
      }
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <>
      {/* Mobile Header - nur Logo + Burger Button, absolut positioniert */}
      <div className="w-full px-4 py-2 flex items-center justify-between bg-navbar shadow-md uppercase z-50 fixed top-0 left-0 h-[64px]">
        {/* Select links, nur auf mobile (hidden ab lg) */}
        <select
          className="select select-sm border-primary bg-neutral text-primary block lg:hidden"
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          aria-label="Select Language"
        >
          <option value="en">EN</option>
          <option value="de">DE</option>
          <option value="es">ES</option>
        </select>

        {/* Logo zentriert */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="/#home" aria-label="Home">
            <img src={Logo} alt="Logo" className="h-10 object-contain" />
          </a>
        </div>

        {/* Burger Button rechts */}
        <BurgerIcon
          onClick={handleToggle}
          className="p-2 rounded-xl w-12 h-12 fill-secondary block lg:hidden"
        />
      </div>

      <div className="navbar lg:fixed bg-navbar h-16 shadow-sm hidden lg:flex top-0 w-full z-50 uppercase font-navbar">
        {/* Desktop Navbar (mit Logo in der Mitte) */}
        <div className="hidden lg:flex items-center justify-between space-x-8 w-full">
          {/* Box 1 (nimmt den linken Platz ein) */}
          <div className="flex-1 flex justify-end pl-6">
            <ul className="flex items-center space-x-6">
              <Listitem
                link="/#info"
                text={t('navbar.info')}
                activeSection={activeSection}
              />
              <Listitem
                link="/#location"
                text={t('navbar.location')}
                activeSection={activeSection}
              />
              <Listitem
                link="/#timeline"
                text={t('navbar.timeline')}
                activeSection={activeSection}
              />
              <Listitem
                link="/#rsvp"
                text="RSVP"
                activeSection={activeSection}
                classType="font-bold"
              />
            </ul>
          </div>

          {/* Box 2 (zentriert in der Navbar) */}
          <div className="flex justify-center items-center">
            <Listitem
              link="/#home"
              activeSection={activeSection}
              icon={
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-[40px] object-contain" // z.B. kleinere Höhe für Logo
                />
              }
            />
          </div>

          {/* Box 3 (nimmt den rechten Platz ein) */}
          <div className="flex-1 flex justify-start pr-6">
            <ul className="flex items-center space-x-6">
              <Listitem
                link="/ourhistory"
                text={t('navbar.history')}
                activeSection={activeSection}
              />
              <Listitem
                link="/guide"
                text={t('navbar.guide')}
                activeSection={activeSection}
              />
            </ul>
          </div>
        </div>
        <div className="absolute hidden right-6 lg:flex items-center space-x-4">
          <select
            className="select select-sm border-primary bg-primary"
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            aria-label="Select Language"
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="es">ES</option>
          </select>
          <button
            onClick={() => setIsContactOpen(true)}
            aria-label="Open Contact Form"
            className="group bg-transparent border-none p-2 rounded-md hover:bg-primary transition-colors"
          >
            <MailIcon className="w-6 h-6 fill-current text-primary group-hover:text-secondary" />
          </button>
        </div>
      </div>

      {/* Mobile Menü */}
      <MobileMenu
        isOpen={isOpen}
        onClose={handleClose}
        setIsContactOpen={setIsContactOpen}
      />

      {/* Kontakt Formular */}
      <SlideDown
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen}
      />
    </>
  )
}
