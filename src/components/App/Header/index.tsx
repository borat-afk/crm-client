import './style.css';
import { useLocation, NavLink } from 'react-router-dom';
import { mdiAccountTie } from '@mdi/js';
import { useEffect, useState } from 'react';
import User from '../../../stores/user.ts';
import Icon from '@mdi/react';

const userStore = User;

const Header = () => {
  const [user, setUser] = useState(userStore.user);
  const currentRoute = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await userStore.getUserData();
        setUser(userStore.getUser());
      } catch (e) {
        throw new Error();
      }
    };

    fetchUser();
  }, []);

  console.log('HeaderHeaderHeaderHeader')

  return (user &&
    <div className={'header'}>
      <h2 className={'header__path'}>
        {currentRoute.pathname}
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