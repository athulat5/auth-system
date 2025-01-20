"use client";
import React from 'react'
import GetSession from '@/component/getsession';
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { useState,useEffect } from 'react';




const dashboard = () => {
  const handleSignOut = async () => {
    await signOut({callbackUrl: "/pages/login"});
  };
  return (
    <div>
      <Button className='absolute top-0 right-0 m-4' onClick={handleSignOut}>Sign Out</Button>
    <div className='flex justify-center items-center min-h-screen bg-white font-bold text-black'>
      
      <h1 className='text-4xl'>Welcome to the Dashboard</h1>
    </div>
    </div>
  )
}

export default dashboard
