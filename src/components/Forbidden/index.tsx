import { FC } from 'react';

const Forbidden: FC = () => {
  return (
    <div className={'overflow-hidden'}>
      <div className={'w-full h-[calc(100vh-160px)] bg-app-forbidden bg-cover bg-no-repeat inline-block rounded-3xl'}/>
    </div>
  )
};

export default Forbidden;