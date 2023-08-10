import { useLocation } from 'react-router-dom';
import User from '../User';

const UserDetails = () => {
  const location = useLocation();
  const userId = location.state.userId;

  return (userId && <User userId={userId} />)
}

export default UserDetails;