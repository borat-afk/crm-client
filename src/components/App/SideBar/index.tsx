import './style.css';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../../enums/routes.enum.ts';
import { routeFilter } from '../../../filters/route.filter.ts';
import { mdiAccountGroupOutline } from '@mdi/js';
import Icon from "@mdi/react";

const SideBar = () => {
  return (
    <div className={'sidebar'}>
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
  )
}

export default SideBar;