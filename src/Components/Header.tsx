import React from 'react'
import Link from 'next/link'
import HeaderNav from './HeaderNav'
import SignoutButton from './SignoutButton'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import SignInButton from './SigninButton';
import RegisterButton from './RegisterButton';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav className="h-16 flex items-center p-4 bg-gray-200 justify-between">
        <HeaderNav />
        <div className='flex gap-10 items-center mx-5'>
          {!session && (
            <>
              <SignInButton />
              <RegisterButton />
            </>
          )}
          {session && (
            <>
              <div>{session.user?.username}</div>
              <SignoutButton />
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Header