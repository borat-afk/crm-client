import './style.css';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={'app-layout'}>{children}</div>
  )
}

export default Layout;