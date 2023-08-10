import User from '../User';

const Account = () => {
  const userId = localStorage.getItem('user_id');

  return(
    userId && <User userId={+userId} />
  )
}

export default Account;