import { useState } from 'react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <form className="flex flex-col">
        <h2 className={'text-red-900'}>
          Login
        </h2>
        <input
          type={"text"}
          placeholder={"Phone"}
          value={phone}
          onInput={() => setPhone(event.target.value) }
        />
        <input
          type={"email"}
          placeholder={"Email"}
          value={email}
          onInput={() => setEmail(event.target.value) }
        />
        <input
          type={"password"}
          placeholder={"Password"}
          value={password}
          onInput={() => setPassword(event.target.value) }
        />
      </form>
    </>
  )
}

export default Login;