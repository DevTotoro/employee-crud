import { Outlet } from 'react-router-dom';
import { Header } from '~/components/layouts/header';

export const BaseLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />

      <div className='flex flex-1 flex-col p-4'>
        <div className='container flex flex-1 flex-col items-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
