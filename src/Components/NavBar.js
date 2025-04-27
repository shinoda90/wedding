import Listitem from './Listitem';
import Logo from '../image/logo_peach.png';
import { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import SlideDown from './SlideDown';
import { ReactComponent as MailIcon } from '../icons/mail_icon.svg';
import MobileMenu from './MobileMenu'; // anpassen

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useTranslation();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  useEffect(() => {
    const sectionIds = ['home', 'location', 'timeline'];
    const observers = [];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className="navbar bg-primary h-16 shadow-sm fixed top-0 w-full z-50">
      {/* Mobile Burger Button */}
      <div className="lg:hidden flex justify-between items-center px-4 w-full">
        {/* Burger Button rechts */}
        <button
          onClick={handleToggle}
          aria-label="Toggle Menu"
          className="absolute right-6 btn btn-ghost text-2xl  text-orange-400 p-2 rounded"
        >
          ☰
        </button>

        {/* Logo in der Mitte (mobil) */}
        <div className="flex justify-center w-full">
          <img src={Logo} alt="Logo" className="h-[80%] max-h-[48px] object-contain" />
        </div>
      </div>

      {/* Desktop Navbar (mit Logo in der Mitte) */}
      <div className="hidden lg:flex items-center justify-between space-x-8 w-full">
        {/* Box 1 (nimmt den linken Platz ein) */}
        <div className="flex-1 flex justify-end pl-6">
          <ul className="flex items-center space-x-6">
            <Listitem link="/" text={t('navbar.home')} activeSection={activeSection} />
            <Listitem link="/#location" text={t('navbar.location')} activeSection={activeSection} />
            <Listitem link="/#timeline" text={t('navbar.timeline')} activeSection={activeSection} />
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
          <img src={Logo} alt="Logo" className="h-[80%] max-h-[48px] object-contain" />
        </div>

        {/* Box 3 (nimmt den rechten Platz ein) */}
        <div className="flex-1 flex justify-start pr-6">
          <ul className="flex items-center space-x-6">
            <Listitem link="/ourhistory" text={t('navbar.history')} activeSection={activeSection} />
            <Listitem link="/guide" text={t('navbar.guide')} activeSection={activeSection} />
          </ul>
        </div>
      </div>
      <div className="absolute hidden right-6 lg:flex items-center space-x-4">
        <select
          className="select select-sm border-primary"
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
          className="group bg-transparent border-none p-2 rounded-md hover:bg-green-600 transition-colors"
        >
          <MailIcon className="w-6 h-6 fill-current text-gray-700 group-hover:text-white" />
        </button>
      </div>

      {/* Mobile Menü */}
      <MobileMenu isOpen={isOpen} onClose={handleClose} />

      {/* Kontakt Formular */}
      <SlideDown isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
    </div>
  );
}
