import { observer } from 'mobx-react';
import { ChangeEvent, FormEvent } from 'react';
import { AuthRegistrationStore } from '../../stores/authRegistration.ts';
import validator from 'validator';

const store = new AuthRegistrationStore();

const Registration = observer(() => {
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      validator.isEmail(store.email)
      && validator.isMobilePhone(store.phone, 'uk-UA')
      && validator.isLength(store.password, { min: 8, max: 60 })
    ) {
      try {
        await store.handleRegistration();
      } catch (e) {
        throw new Error()
      }
    }
  }

  return (
    <div className={'w-full h-screen bg-app-bg bg-cover flex justify-center items-center'}>
      <form
        className={'flex flex-col w-96 h-[]162px] m-auto items-center bg-white'}
        onSubmit={submit}
      >
        <div className={'w-full h-16 flex justify-center items-center bg-secondary font-bold mb-2'}>
          <h2 className={'text-primary text-2xl'}>
            Registration
          </h2>
        </div>
        <p className={'text-primary text-sm my-4'}>Welcome, introduce your credentials to begin.</p>
        <input
          type={'email'}
          placeholder={'Email'}
          className={'w-80 h-14 rounded-xl flex items-center justify-center bg-light-opacity text-primary text-lg font-bold my-2 border-none outline-none px-4'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setEmail(event.target.value)}
        />
        <input
          type={'text'}
          placeholder={'Phone'}
          className={'w-80 h-14 rounded-xl flex items-center justify-center bg-light-opacity text-primary text-lg font-bold my-2 border-none outline-none px-4'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPhone(event.target.value)}
        />
        <input
          type={'password'}
          placeholder={'Password'}
          className={'w-80 h-14 rounded-xl flex items-center justify-center bg-light-opacity text-primary text-lg font-bold my-2 border-none outline-none px-4'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPassword(event.target.value)}
        />

        <button
          type={'submit'}
          className={'w-80 h-14 rounded-xl flex items-center justify-center bg-primary text-white text-lg font-bold mb-6 mt-2'}
        >
          Registration
        </button>
      </form>
    </div>
  )
});

export default Registration;