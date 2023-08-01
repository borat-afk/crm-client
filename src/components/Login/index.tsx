import { observer } from 'mobx-react';
import { AuthLoginStore } from '../../stores/authLogin.ts';
import { ChangeEvent, FormEvent } from 'react';
import validator from 'validator';

const store = new AuthLoginStore();

const Login = observer(() => {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      validator.isEmail(store.email)
      && validator.isLength(store.password, { min: 8, max: 60 })
    ) {
      try {
        await store.handleLogin();
      } catch (e) {
        throw new Error()
      }
    }
  }

  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={submit}
      >
        <h2 className={'text-red-900'}>
          Login
        </h2>
        <input
          type={"email"}
          placeholder={"Email"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setEmail(event.target.value)}
        />
        <input
          type={"password"}
          placeholder={"Password"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPassword(event.target.value)}
        />

        <button type={'submit'}>Login</button>
      </form>
    </>
  )
})
export default Login;