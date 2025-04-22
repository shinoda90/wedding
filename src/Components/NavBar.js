import { Link } from 'react-router-dom';
import Listitem from './Listitem';

function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* LINKS: Logo und Dropdown für mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* Burger-Icon für mobile Navigation */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <Listitem link="/" text="General Information" />
            <Listitem link="/#contact" text="Contact" />
            <Listitem link="/#location" text="Location" />
            <Listitem link="/#timeline" text="Timeline" />
            <Listitem link="/rsvp" text="RSVP" />
            <Listitem link="/ourhistory" text="Our History" />
            <Listitem link="/guide" text="Travel Guide" />
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">💍 Hochzeit</a>
      </div>

      {/* MITTE: Navigation zentriert */}
      <div className="navbar-center absolute left-1/2 transform -translate-x-1/2 hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Listitem link="/" text="General Information" />
          <Listitem link="/#contact" text="Contact" />
          <Listitem link="/#location" text="Location" />
          <Listitem link="/#timeline" text="Timeline" />
          <Listitem link="/rsvp" text="RSVP" />
          <Listitem link="/ourhistory" text="Our History" />
          <Listitem link="/guide" text="Travel Guide" />
        </ul>
      </div>

      {/* RECHTS: Sprache + Kontakt-Icon */}
      <div className="navbar-end hidden lg:flex items-center gap-4 pr-4">
        <select className="select select-sm border-base-300">
          <option>EN</option>
          <option>DE</option>
          <option>ES</option>
        </select>
        <a href="/#contact" className="btn btn-ghost btn-circle" title="Contact">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 8a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2h14a2 2 0 012 2v2z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
