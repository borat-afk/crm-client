import User from '../../stores/user.ts';

const userStore = User;

const Account = () => {
  const user = userStore.getUser();

  return (
    <h2>{user?.email}</h2>
  )
};

export default Account;