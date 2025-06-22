import React from "react";

function Footer() {
  return (
    <div className=" bg-slateBg w-full py-10 border-t border-border px-5">
      <div className="flex flex-col lg:flex-row item-center justify-between max-w-screen-2xl mx-auto gap-8">
        <span className="text-slateText flex flex-row items-center gap-2 text-sm">
          {" "}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slateText"
          >
            <path
              d="M31.205 20.0112C31.6522 19.6128 32 19.065 32 18.4176V2.08393C32 0.341007 29.9131 -0.654958 28.5715 0.490393L17.3416 9.7528C16.5466 10.4002 15.4534 10.4002 14.6584 9.7528L3.42855 0.490393C2.03725 -0.654958 0 0.341007 0 2.08393V18.4176C0 19.0152 0.248448 19.6128 0.745344 20.0112L14.6087 31.5145C15.4037 32.1618 16.4969 32.1618 17.2919 31.5145L31.205 20.0112Z"
              fill="currentColor"
            ></path>
          </svg>{" "}
          ◎2025
        </span>
        <span className="text-slateText text-sm">kedar.sawant66@gmail.com</span>

        <div className="flex flex-row gap-4 text-slateText">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
