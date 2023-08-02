import { NavLink } from 'react-router-dom';
import './style.css';

const AuthHeader = () => {
  return (
    <div className={'header-wrp'}>
      <div className={'header__logo'}/>

      <nav className={'flex'}>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'header__nav-link--active' : 'header__nav-link'
          }
          to={'/auth/login'}
        >
          Sign In
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'header__nav-link--active' : 'header__nav-link'
        }
          to={'/auth/registration'}
        >
          Registration
        </NavLink>
      </nav>
    </div>
  )
}

export default AuthHeader;