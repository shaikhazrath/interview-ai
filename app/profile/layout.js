'use client'
import { Inter } from "next/font/google";
import useAuthToken from "../context/useAuth";
import Header from "@/components/header";
import Loading from "@/components/Loading";

export default function RootLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuthToken();

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center bg-black">
      <Loading/>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <html lang="en" className="">
      <body>
        {children}
      </body>
      
    </html>
  );
}
