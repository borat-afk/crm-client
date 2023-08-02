import './style.css';
import { useLocation } from 'react-router-dom';
import { mdiAccountTie } from '@mdi/js';
import Icon from '@mdi/react';

const Header = () => {
  const currentRoute = useLocation();

  return (
    <div className={'header'}>
      <h2 className={'header__path'}>
        {currentRoute.pathname}
      </h2>

      <div className={'header__nav'}>
        <div className={'header__user-wrp'}>
          <div className={'header__user-icon'}>
            <Icon
              size={'32px'}
              path={mdiAccountTie}
              color={'#567AFB'}
            />
          </div>
          <p className={'header__user-name'}>
            User
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header;