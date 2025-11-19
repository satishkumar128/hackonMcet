import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, BarChart2, Clock, Users, BookOpen } from 'lucide-react';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/dashboard', label: 'Dashboard', icon: Grid },
    { to: '/skill-analyzer', label: 'Skill Analyzer', icon: BarChart2 },
    { to: '/consistency', label: 'Tracker', icon: Clock },
    { to: '/peers', label: 'Peer Matching', icon: Users },
    { to: '/resources', label: 'Resources', icon: BookOpen },
  ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold">SkillSwap</NavLink>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {links.map((l) => {
              const Icon = l.icon as any;
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {l.label}
                </NavLink>
              );
            })}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="sm:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((l) => {
              const Icon = l.icon as any;
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                  }
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {l.label}
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
