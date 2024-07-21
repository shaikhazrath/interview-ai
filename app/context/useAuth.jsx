'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthToken = (redirectPath = '/auth') => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push(redirectPath);
        return;
      }

      try {
        const res = await axios.get('/api/users/googleAuth', {
          headers: {
            authorization: token,
          },
        });

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push(redirectPath);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        router.push(redirectPath);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [router, redirectPath]);

  return { isAuthenticated, isLoading };
};

export default useAuthToken;
