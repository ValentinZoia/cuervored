"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
   //useSession = nos permite saber si estamos autenticados o no
   const { data: session } = useSession();
  const user = session?.user ?? null;
  return (
    <>
      <nav className="flex justify-around items-center py-4 bg-[#141414] text-white">
        <Link href="/" className="text-xl font-bold">
          LOGO
        </Link>

        <ul className="hidden md:flex items-center gap-4 list-none">
          {user ? (
            //si estoy logeado
            <>
              <li>
                <Link href="/dashboard" className="hover:text-gray-400">
                  Dashboard
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <p className="text-gray-400 cursor-pointer">{user.email}</p>
                {user.image && <img src={user.image as string} alt="" className="w-10 h-10 rounded-full cursor-pointer" />}
              </li>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          ) : (
            //si no estoy logeado
            <>
              <li>
                <Link href="/auth/login" className="hover:text-gray-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-gray-400">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
