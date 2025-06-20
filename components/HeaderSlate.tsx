import Link from "next/link";
import React from "react";

const HeaderSlate = () => {
  return (
    <div className="w-full  py-10 bg-white text-black">
      <div className="max-w-screen-2xl mx-auto flex flex-row items-center justify-between px-5">
        <Link href="/">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M31.205 20.0112C31.6522 19.6128 32 19.065 32 18.4176V2.08393C32 0.341007 29.9131 -0.654958 28.5715 0.490393L17.3416 9.7528C16.5466 10.4002 15.4534 10.4002 14.6584 9.7528L3.42855 0.490393C2.03725 -0.654958 0 0.341007 0 2.08393V18.4176C0 19.0152 0.248448 19.6128 0.745344 20.0112L14.6087 31.5145C15.4037 32.1618 16.4969 32.1618 17.2919 31.5145L31.205 20.0112Z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
        <div className="flex flex-row items-center justify-between gap-10">
          <Link
            href="#"
            className="text-black text-base font-light transition hover:text-gray-300"
          >
            About
          </Link>{" "}
          <Link
            href="#"
            className="text-black text-base font-light transition hover:text-gray-300"
          >
            About
          </Link>{" "}
          <Link
            href="#"
            className="text-black text-base font-light transition hover:text-gray-300"
          >
            About
          </Link>{" "}
          <Link
            href="#"
            className="text-black text-base font-light transition hover:text-gray-300"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlate;
