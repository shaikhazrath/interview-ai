'use client'
import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react'; // Ensure you have these icons
import { Button } from './ui/button';
import useAuthToken from '@/app/context/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = ({ toggleDarkMode, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setIsAuthenticated(true)
    }
  },[])
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="px-5 py-6 ">
      <nav className="flex justify-between items-center">
        <Link href={'/'} className="text-2xl font-bold text-white">Interview Mentor</Link>
        <div className='flex gap-6 text-lg  text-white'>
          
        <Link href={'/'} className='  hover:border-b-2  '>
        <h1>Home</h1>
            </Link>
        <Link href={'/profile'} className='  hover:border-b-2 '>
        <h1>Profile</h1>
            </Link>
            <Link href={'/about'} className='  hover:border-b-2 '>
        <h1>About</h1>
            </Link>
        </div>
</nav>
    </header>
  );
};

export default Header;
