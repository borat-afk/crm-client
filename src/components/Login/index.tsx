import { observer } from 'mobx-react';
import { AuthLoginStore } from '../../stores/authLogin.ts';
import { ChangeEvent } from 'react';

const store = new AuthLoginStore();

const Login = observer(() => {

  return (
    <>
      <form className="flex flex-col">
        <h2 className={'text-red-900'}>
          Login
        </h2>
        <input
          type={"text"}
          placeholder={"Phone"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.phone = event.target.value}
        />
        <input
          type={"email"}
          placeholder={"Email"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.email = event.target.value}
        />
        <input
          type={"password"}
          placeholder={"Password"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.password = event.target.value}
        />
        <span>Phone: {store.phone}</span>
        <span>Email: {store.email}</span>
        <span>Password: {store.password}</span>
      </form>
    </>
  )
})
export default Login;