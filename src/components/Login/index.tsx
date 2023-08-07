import { observer } from 'mobx-react';
import AuthLoginStore from '../../stores/authLogin.ts';
import { ChangeEvent, FormEvent, useState } from 'react';
import validator from 'validator';
import AuthHeader from '../AuthHeader';
import toast from 'react-hot-toast';
import './style.css';

const store = AuthLoginStore;

const Login = observer(() => {
  const [isValidFields, setIsValidFields] = useState(false);

  const validateFields = () => {
    setIsValidFields(false);
    if (!validator.isEmail(store.email))
      return toast.error('Invalid email');
    if (!validator.isLength(store.password, { min: 8, max: 60 }))
      return toast.error('Invalid password! Min length: 8, max length: 60')
    setIsValidFields(true);
  }
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateFields();
    if (isValidFields) {
      try {
        await store.handleLogin();
      } catch (e) {
        throw new Error()
      }
    }
  }

  return (
    <div className={'login-wrp'}>
      <AuthHeader />

      <div className={'login__form-wrp'}>
        <form
          className={'login__form'}
          onSubmit={submit}
        >
          <div className={'login__form-header'}>
            <h2>Login</h2>
          </div>

          <p className={'login__form-des'}>Welcome, introduce your credentials to begin.</p>

          <input
            type={'email'}
            placeholder={'Email'}
            className={'app-input'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setEmail(event.target.value)}
          />
          <input
            type={'password'}
            placeholder={'Password'}
            className={'app-input'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPassword(event.target.value)}
          />

          <button
            type={'submit'}
            className={'login__form-btn'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
})
export default Login;