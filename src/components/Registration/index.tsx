import { observer } from 'mobx-react';
import { ChangeEvent, FormEvent } from 'react';
import { AuthRegistrationStore } from '../../stores/authRegistration.ts';
import { useState } from 'react';
import validator from 'validator';
import AuthHeader from '../AuthHeader';
import toast from 'react-hot-toast';

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
    <div className={'w-full h-screen bg-app-bg bg-cover'}>
      <AuthHeader />

      <div className={'w-full flex h-[calc(100vh-64px)] justify-center items-center bg-blue-opacity'}>
        <form
          className={'flex flex-col w-[480px] m-auto items-center bg-white'}
          onSubmit={submit}
        >
          <div className={'w-full h-16 flex justify-center items-center bg-secondary font-bold mb-2'}>
            <h2 className={'text-primary text-2xl'}>
              Registration
            </h2>
          </div>
          <p className={'text-primary text-sm my-4'}>Welcome, introduce your credentials to begin.</p>

          <div className={'w-96 mx-auto my-2 flex items-center justify-center'}>
            <button
              type={'button'}
              className={isAdminReg ? 'text-primary font-extralight text-lg mx-4 hover:text-light-blue' : 'text-primary font-bold text-lg mx-4'}
              onClick={() => setIsAdminReg(false)}
            >
              User
            </button>
            <button
              type={'button'}
              className={!isAdminReg ? 'text-primary font-extralight text-lg mx-4 hover:text-light-blue' : 'text-primary font-bold text-lg mx-4'}
              onClick={() => setIsAdminReg(true)}
            >
              Admin
            </button>
          </div>

          <input
            type={'email'}
            placeholder={'Email'}
            className={'w-96 h-14 rounded-xl flex items-center justify-center bg-light-opacity text-primary text-lg font-bold my-2 border-none outline-none px-4'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setEmail(event.target.value)}
          />
          <input
            type={'text'}
            placeholder={'Phone'}
            className={'w-96 h-14 rounded-xl flex items-center justify-center bg-light-opacity text-primary text-lg font-bold my-2 border-none outline-none px-4'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPhone(event.target.value)}
          />
          <input
            type={'password'}
            placeholder={'Password'}
            className={'w-96 h-14 rounded-xl flex items-center justify-center bg-light-opacity text-primary text-lg font-bold my-2 border-none outline-none px-4'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPassword(event.target.value)}
          />
          {isAdminReg &&
            <input
              type={'text'}
              placeholder={'Api-Key'}
              className={'w-96 h-14 rounded-xl flex items-center justify-center bg-light-opacity text-primary text-lg font-bold my-2 border-none outline-none px-4'}
              onChange={(event: ChangeEvent<HTMLInputElement>) => store.setApiKey(event.target.value)}
            />
          }

          <button
            type={'submit'}
            className={'w-96 h-14 rounded-xl flex items-center justify-center bg-primary text-white text-lg font-bold mb-6 mt-2 hover:bg-light-blue active:bg-light-blue'}
          >
            Registration
          </button>
        </form>
      </div>
    </div>
  )
});

export default Registration;