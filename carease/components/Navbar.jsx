'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGripLines } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({
      callbackUrl: '/auth/login',
    });
  };
  const toogleNavbar = () => {
    return setShow(!show);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <nav className="nav text-lg">
      <Link href="/">
        <Image
          src="/images/carease-logo.svg"
          width={10}
          height={10}
          alt="carease"
          className=" w-[100px] h-[45px] xl:w-[165px] "
        />
      </Link>
      <div className="flex items-center gap-10">
        <Image
          src="/images/compare-arrow-nav.svg"
          width={30}
          height={10}
          alt="compare-amount"
          className="md:hidden block md:w-[30px] w-[20px]"
        />
        <button
          type="button"
          className="ml-auto md:hidden text-white text-2xl"
          onClick={toogleNavbar}
        >
          {' '}
          {!show ? <FaGripLines /> : <IoClose />}
        </button>
      </div>
      {/* desktop navbar */}

      <div className="nav-desktop font-navItems  font-normal">
        <div className="flex items-center  text-lg gap-6 relative">
          <Link
            href="/carlist"
            className="bg-white px-8 py-1 rounded-full md:text-sm   nav-hover md:px-3 lg:text-lg lg:px-4 xl:px-8"
          >
            Carlist
          </Link>
          <Link
            href="/comparison"
            className=" text-white bg-[#E11D48] focus:bg-white focus:text-[#E11D48] px-8 py-1  rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8"
          >
            Compare
          </Link>
          <button
            className=" bg-white px-8 py-1 rounded-full md:text-sm hover:text-[#E11D48]  md:px-3 lg:text-lg lg:px-8 xl:px-8"
            onClick={() => setShow(!show)}
          >
            More
          </button>
          {show && (
            <div
              className="absolute bg-gradient-to-t to-white/80 from-[#343131]/80  text-black flex flex-col right-0 top-10 z-50 px-8 rounded-md py-8 shadow-xl gap-4 "
              onMouseLeave={() => setShow(false)}
            >
              <Link href="/category/supercars" className="nav-hover">
                Super Cars
              </Link>
              <Link href="/category/popular" className="nav-hover">
                Popular Cars
              </Link>
              <Link href="/category/upcoming" className="nav-hover">
                Upcoming Cars
              </Link>
              <Link href="/category/hatchback" className="nav-hover">
                Hatchback Cars
              </Link>
            </div>
          )}
        </div>
        <div className="xl:ml-auto">
          <div className="flex gap-6 items-center  ">
            <Image
              src="/images/compare-arrow-nav.svg"
              width={30}
              height={10}
              alt="compare-amount"
              className="mx-4 lg:mx-8"
            />
            {!session ? (
              <div className="flex gap-6 items-center  ">
                <Link
                  href="/auth/signup"
                  className=" bg-white px-8 py-1 rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8 nav-hover "
                >
                  Register
                </Link>

                <Link
                  href="/auth/login"
                  className=" bg-white px-8  py-1 rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8 nav-hover"
                >
                  Login
                </Link>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={handleLogout}
                className=" bg-white px-8  py-1 rounded-full md:text-sm md:px-3 lg:text-lg lg:px-4 xl:px-8 nav-hover"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}

      {show && (
        <div className="nav-mobile">
          <div className="flex items-center  flex-col xl:flex-row text-xl text-bold  gap-6 xl:ml-28">
            <Link href="/carlist" className="bg-white navlink">
              Carlist
            </Link>
            <Link
              href="/comparison"
              className=" text-white bg-[#E11D48] navlink"
            >
              Compare
            </Link>
            <Link href="/carlist" className=" bg-white navlink">
              More
            </Link>
          </div>
          <div className="xl:ml-auto">
            <div className="flex flex-col xl:flex-row gap-6 items-center  ">
              {!session ? (
                <div className="flex gap-6 items-center  ">
                  <Link href="/auth/signup" className=" bg-white navlink">
                    Register
                  </Link>

                  <Link
                    href="/auth/login
          "
                    className=" bg-white navlink"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={handleLogout}
                  className=" bg-white navlink"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
