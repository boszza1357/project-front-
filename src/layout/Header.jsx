import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/login', text: 'Login' },
  { to: '/register', text: 'Register' },
];

const adminNav = [
  { to: '/', text: 'Home' },
  { to: '/bookinghistry', text: 'bookinghistry' },
  { to: '/newtable', text: 'CreaTable' },
  { to: '/UserRoleUpdate', text: 'User' },
];
const userNav = [
  { to: '/', text: 'Home' },
  { to: '/bookinghistryuser', text: 'bookinghistry' },
  { to: '/TableList', text: 'TableList' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.role === 'ADMIN' ? adminNav : user ? userNav : guestNav;

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {user?.role === 'ADMIN' ? (
          <a className="btn btn-ghost text-xl">Admin</a>
        ) : (
          <a className="btn btn-ghost text-xl">Welcome</a>
        )}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          {user?.id && (
            <li>
              <Link to="#" onClick={hdlLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
