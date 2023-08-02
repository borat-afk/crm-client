import './style.css';
import { ReactNode } from 'react';
import Header from '../Header';
import SideBar from '../SideBar';

type LayoutProps = {
  children: ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={'app-layout'}>
      <SideBar />
      <Header />
      <div className={'app-layout__container'}>{children}</div>
      </div>
  )
}

export default Layout;