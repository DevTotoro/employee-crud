import { Link } from 'react-router-dom';
import { BriefcaseBusiness } from 'lucide-react';

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center justify-between'>
        <Link to='/employees' className='flex items-center space-x-2'>
          <BriefcaseBusiness className='size-6' aria-hidden='true' />

          <span className='hidden font-bold sm:inline-block'>Employee management</span>

          <span className='sr-only'>Home</span>
        </Link>
      </div>
    </header>
  );
};
