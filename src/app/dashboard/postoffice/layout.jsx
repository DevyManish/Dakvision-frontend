// app/dashboard/postoffice/layout.jsx

import PoSidebar from '@/components/layout/posidebar';

export const metadata = {
    title: 'Post Office Management',
    description: 'Standalone layout for the post office section.',
  };
  
  export default function PostOfficeLayout({ children }) {
    return (
        <div className="flex">
        <PoSidebar />
        <main className="w-full flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    );
  }
  