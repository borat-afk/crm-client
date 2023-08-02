import './style.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const currentRoute = useLocation();

  return (
    <div className={'header'}>
      <h2 className={'header__path'}>
        {currentRoute.pathname}
      </h2>

      <div className={'header__nav'}>
        <p>User</p>
      </div>
    </div>
  )
}

export default Header;