import './style.css';
import { useLocation, NavLink } from 'react-router-dom';
import { mdiAccountTie } from '@mdi/js';
import { useEffect, useState } from 'react';
import { routeFilter } from '../../../filters/route.filter.ts';
import UserStore from '../../../stores/user.ts';
import Icon from '@mdi/react';
import { IUser } from '../../../types/user.ts';

const userStore = UserStore;

const Header = () => {
  const [user, setUser] = useState<IUser | null>(userStore.user);
  const [pathName, setPathName] = useState<string | undefined>('');
  const currentRoute = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (userId) await userStore.getUserData(+userId);
        setUser(userStore.getUser());
      } catch (e) {
        throw new Error();
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setPathName(routeFilter(currentRoute.pathname));
  }, [currentRoute.pathname]);

  return (user &&
    <div className={'header'}>
      <h2 className={'header__path'}>
        {pathName}
      </h2>

      <div className={'header__nav'}>
        <NavLink to={'/account/settings'} className={'header__user-wrp'}>
          <div className={'header__user-icon'}>
            <Icon
              size={'32px'}
              path={mdiAccountTie}
              color={'currentColor'}
            />
          </div>

          <p className={'header__user-name'}>
            { user?.firstName && user?.lastName
              ? (user?.firstName + ' ' + user?.lastName)
              : user?.email }
          </p>
        </NavLink>
      </div>
    </div>
  )
}

export default Header;