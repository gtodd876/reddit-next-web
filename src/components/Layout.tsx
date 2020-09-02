import Wrapper from './Wrapper';
import NavBar from './NavBar';
import { ReactNode } from 'react';

interface LayoutProps {
  variant?: 'regular' | 'small';
  children: ReactNode;
}

export default function Layout({ variant, children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
}
