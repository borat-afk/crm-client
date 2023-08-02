import { observer } from 'mobx-react';
import { ChangeEvent, FormEvent } from 'react';
import { AuthRegistrationStore } from '../../stores/authRegistration.ts';
import { useState } from 'react';
import validator from 'validator';
import AuthHeader from '../AuthHeader';
import toast from 'react-hot-toast';
import './style.css';

const store = new AuthRegistrationStore();

const Registration = observer(() => {
  const [isAdminReg, setIsAdminReg] = useState(false);
  const [isValidFields, setIsValidFields] = useState(false);

  const validateFields = () => {
    setIsValidFields(false);
    if (!validator.isEmail(store.email))
      return toast.error('Invalid email');
    if (!validator.isMobilePhone(store.phone, 'uk-UA'))
      return toast.error('Phone required! Format "380*******".')
    if (!validator.isLength(store.password, { min: 8, max: 60 }))
      return toast.error('Invalid password! Min length: 8, max length: 60')
    setIsValidFields(true);
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isAdminReg && !store.apiKey)
      return toast.error('Api-Key required for admin registration!');

    validateFields();
    if (isValidFields) {
      try {
        isAdminReg ? await store.handleAdminRegistration() : await store.handleRegistration();
      } catch (e) {
        throw new Error()
      }
    }
  }

  return (
    <div className={'registration-wrp'}>
      <AuthHeader />

      <div className={'registration__form-wrp'}>
        <form
          className={'flex flex-col w-[480px] m-auto items-center bg-white'}
          onSubmit={submit}
        >
          <div className={'registration__form-header'}>
            <h2>
              Registration
            </h2>
          </div>

          <p className={'registration__form-des'}>
            Welcome, introduce your credentials to begin.
          </p>

          <div className={'registration__form-mode-btn-wrp'}>
            <button
              type={'button'}
              className={isAdminReg ? 'registration__form-mode-btn' : 'registration__form-mode-btn--active'}
              onClick={() => setIsAdminReg(false)}
            >
              User
            </button>
            <button
              type={'button'}
              className={!isAdminReg ? 'registration__form-mode-btn' : 'registration__form-mode-btn--active'}
              onClick={() => setIsAdminReg(true)}
            >
              Admin
            </button>
          </div>

          <input
            type={'email'}
            placeholder={'Email'}
            className={'app-input'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setEmail(event.target.value)}
          />
          <input
            type={'text'}
            placeholder={'Phone'}
            className={'app-input'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPhone(event.target.value)}
          />
          <input
            type={'password'}
            placeholder={'Password'}
            className={'app-input'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPassword(event.target.value)}
          />
          {isAdminReg &&
            <input
              type={'text'}
              placeholder={'Api-Key'}
              className={'app-input'}
              onChange={(event: ChangeEvent<HTMLInputElement>) => store.setApiKey(event.target.value)}
            />
          }

          <button
            type={'submit'}
            className={'registration__form-btn'}
          >
            Registration
          </button>
        </form>
      </div>
    </div>
  )
});

export default Registration;