import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function MainLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* If route nesting provides children use Outlet, otherwise render children */}
        <Outlet />
        {children}
      </main>
    </div>
  );
}
