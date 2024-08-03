import React from "react";

export default function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_401_2)">
        <g filter="url(#filter0_d_401_2)">
          <path
            d="M25.5 51C39.5833 51 51 39.5833 51 25.5C51 11.4167 39.5833 0 25.5 0C11.4167 0 0 11.4167 0 25.5C0 39.5833 11.4167 51 25.5 51Z"
            fill="#2F2F2F"
          />
        </g>
        <path
          d="M35.6407 25.0502C35.6407 24.7286 35.5058 24.4174 35.2672 24.1891L28.4505 17.3735C28.1807 17.1141 27.9006 17 27.6101 17C26.9461 17 26.4688 17.4668 26.4688 18.0996C26.4688 18.4316 26.6037 18.7117 26.8112 18.9192L29.1457 21.2844L32.1545 24.0335L29.7474 23.8883H17.1724C16.4773 23.8883 16 24.3655 16 25.0502C16 25.7245 16.4773 26.2017 17.1724 26.2017H29.7474L32.1545 26.0565L29.1457 28.8056L26.8112 31.1708C26.6037 31.3783 26.4688 31.6584 26.4688 31.9904C26.4688 32.6232 26.9461 33.09 27.6101 33.09C27.9006 33.09 28.1807 32.9759 28.4298 32.7373L35.2672 25.9009C35.5058 25.6726 35.6407 25.3614 35.6407 25.0502Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_401_2"
          x="-12"
          y="-4"
          width="75"
          height="75"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_401_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_401_2"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_401_2">
          <rect width="51" height="51" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
