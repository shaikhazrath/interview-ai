'use client'

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import useAuthToken from '@/app/context/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = ({ toggleDarkMode, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="px-5 py-6">
      <nav className="flex justify-between items-center">
        <Link href={'/'} className="text-xl font-bold text-white">
          Interview Mentor
        </Link>
        
        {/* Desktop Menu */}
        <div className='hidden md:flex gap-6 text-base text-white'>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className='hover:border-b-2'>
              <h1>{item.label}</h1>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button onClick={handleToggle} variant="ghost" size="icon">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="block py-2 text-white hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;