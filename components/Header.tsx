import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-16 border-solid border-b-1 border-black">
      <div>
        <Link href="/home">
          <Image
            src="/to-the-moon-logo.png"
            alt="home"
            width={75}
            height={75}
          />
        </Link>
      </div>
      <div>
        <Link
          href="/account"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-6"
        >
          Account
        </Link>
        <Link
          href="/api/auth/logout"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-6"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;
