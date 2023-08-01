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
    <>
      <form
        className={'flex flex-col w-1/2 m-auto border-2 border-amber-600 rounded bg-amber-200'}
        onSubmit={submit}
      >
        <h2 className={'text-blue-800 font-black text-2xl'}>
          Registration
        </h2>
        <input
          type={'email'}
          placeholder={'Email'}
          className={'w-full py-4 border-amber-600'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setEmail(event.target.value)}
        />
        <input
          type={'text'}
          placeholder={'Phone'}
          className={'w-full py-4 border-amber-600'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPhone(event.target.value)}
        />
        <input
          type={'password'}
          placeholder={'Password'}
          className={'w-full py-4 border-amber-600'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => store.setPassword(event.target.value)}
        />

        <button
          type={'submit'}
          className={'w-[220px h-[60px] flex items-center justify-center bg-blue-800 text-white text-2xl'}
        >
          Registration
        </button>
      </form>
    </>
  )
});

export default Registration;