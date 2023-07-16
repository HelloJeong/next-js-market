"use client";

import Link from "next/link";
import React, { useState } from "react";
import NavbarItem from "./NavbarItem";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="relative z-10 w-full text-white bg-orange-500">
      <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
        {/* logo */}
        <div className="flex items-center text-2xl h-14">
          <Link href="/">Logo</Link>
        </div>

        {/* menu */}
        {/* sm:hidden => small보다 클때는 hidden */}
        <div className="text-2xl sm:hidden">
          {showMenu === false ? (
            <button onClick={handleMenu}>+</button>
          ) : (
            <button onClick={handleMenu}>-</button>
          )}
        </div>

        {/* nav-items large screen */}
        <div className="hidden sm:block">
          <NavbarItem currentUser={currentUser} />
        </div>
      </div>
      {/* nav-items mobile */}
      <div className="block sm:hidden">
        {showMenu === false ? null : <NavbarItem mobile currentUser={currentUser} />}
      </div>
    </nav>
  );
};

export default Navbar;
