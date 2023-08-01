import { observer } from 'mobx-react';
import { AuthLoginStore } from "../../stores/authLogin.ts";

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
          onKeyUp={() => store.phone = event.target.value}
        />
        <input
          type={"email"}
          placeholder={"Email"}
          onKeyUp={() => store.email = event.target.value}
        />
        <input
          type={"password"}
          placeholder={"Password"}
          onKeyUp={() => store.password = event.target.value}
        />
        <span>Phone: {store.phone}</span>
        <span>Email: {store.email}</span>
        <span>Password: {store.password}</span>
      </form>
    </>
  )
})
export default Login;