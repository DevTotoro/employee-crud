import { Link } from 'react-router-dom';
import { BriefcaseBusiness } from 'lucide-react';

import { Button } from '~/components/ui/button';

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center justify-between'>
        <Link to='/employees' className='flex items-center gap-2'>
          <BriefcaseBusiness className='size-6' aria-hidden='true' />

          <span className='hidden font-bold sm:inline-block'>Workforce management</span>

          <span className='sr-only'>Home</span>
        </Link>

        <div className='flex items-center gap-2'>
          <Button variant='link' asChild>
            <Link to='/employees'>Employees</Link>
          </Button>

          <Button variant='link' asChild>
            <Link to='/departments'>Departments</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
