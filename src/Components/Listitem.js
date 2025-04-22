import { Link } from 'react-router-dom';

export default function Listitem({ link, text }) {
  return (
    <li>
      <Link to={link} className="btn btn-ghost">
        {text}
      </Link>
    </li>
  );
}
