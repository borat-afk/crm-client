import './style.css';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../../enums/routes.enum.ts';
import { routeFilter } from '../../../filters/route.filter.ts';
import { mdiAccountGroupOutline, mdiLogout } from '@mdi/js';
import AuthLogin from '../../../stores/authLogin.ts';
import Icon from "@mdi/react";

const authStore = AuthLogin;

const SideBar = () => {
  return (
    <div className={'sidebar'}>
      <div>
        <div className={'sidebar__logo'}/>

        <nav className={'sidebar__nav-wrp'}>
          <NavLink
            to={RoutesEnum.Users}
            className={({ isActive }) =>
              isActive ? 'sidebar__nav-link--active' : 'sidebar__nav-link'
            }
          >
            <Icon
              size={'24px'}
              color={'currentColor'}
              path={mdiAccountGroupOutline}
            />
            <p className={'ml-2'}>
              {routeFilter(RoutesEnum.Users)}
            </p>
          </NavLink>
        </nav>
      </div>

      <div className={'sidebar__bottom-section'}>
        <button
          type={'button'}
          className={'sidebar__logout-btn'}
          onClick={() => authStore.handleLogout()}
        >
          <Icon
            size={'24px'}
            path={mdiLogout}
            color={'currentColor'}
          />
          <p className={'ml-2'}>
            Logout
          </p>
        </button>
      </div>
    </div>
  )
}

export default SideBar;