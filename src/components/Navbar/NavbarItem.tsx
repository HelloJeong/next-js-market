import Link from "next/link";
import React from "react";

const NavbarItem = ({ mobile }: { mobile?: boolean }) => {
  const appendClass = mobile ? "flex-col h-full" : "";

  return (
    <ul
      className={`
      text-md justify-center flex gap-4 w-full items-center ${appendClass}`}
    >
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/user">User</Link>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <button>Signout</button>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <button>Signin</button>
      </li>
    </ul>
  );
};

export default NavbarItem;
