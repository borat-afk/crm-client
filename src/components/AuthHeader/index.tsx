import { NavLink } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <div className={'w-full flex justify-between items-center h-16 px-12 bg-white'}>
      <div className={'bg-app-logo w-[133px] h-[25px] bg-no-repeat'}/>

      <nav className={'flex'}>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'font-bold text-primary mx-2 underline text-lg' : 'font-extralight text-primary mx-2 text-lg'
          }
          to={'/auth/login'}
        >
          Sign In
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'font-bold text-primary mx-2 underline text-lg' : 'font-extralight text-primary mx-2 text-lg'
        }
          to={'/auth/registration'}
        >
          Registration
        </NavLink>
      </nav>
    </div>
  )
}

export default AuthHeader;