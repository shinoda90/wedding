import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden"></div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="btn btn-ghost">
              General Information
            </Link>
          </li>
          <li>
            <a>Location</a>
          </li>
          <li>
            <a>Timeline</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <Link to="/rsvp" className="btn btn-ghost">
              RSVP
            </Link>
          </li>
          <li>
            <Link to="/ourhistory" className="btn btn-ghost">
              Our History
            </Link>
          </li>
          <li>
            <Link to="/guide" className="btn btn-ghost">
              Travel Guide
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
