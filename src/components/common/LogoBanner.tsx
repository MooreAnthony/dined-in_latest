import React from 'react';

const CenteredLogo = ({
  children,
  viewBox = "0 0 100 40",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) => (
  <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="monospace"
      fontSize="14"
      fill="#1a237e"
    >
      {children}
    </text>
  </svg>
);

const LOGOS = [
  {
    id: 1,
    alt: 'GrillMaster',
    svg: <CenteredLogo>Grill🔥</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Urban 🍽</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Taco 🌮</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Greens 🌿</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Sunset 🌇</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Bella 🍝</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Spice 🌶️</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Coastal 🌊</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Daily 🍞</CenteredLogo>,
  },
  {
    id: 2,
    alt: 'Urban Eats',
    svg: <CenteredLogo>Ocean 🌊 Grill</CenteredLogo>,
  },
];

export const LogoBanner: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden relative">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1a237e] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a237e] to-transparent z-10" />

      {/* Scrolling container */}
      <div className="flex gap-12 py-10 animate-scroll whitespace-nowrap hover:[animation-play-state:play]">
        {[...LOGOS, ...LOGOS].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[260px] h-[130px] bg-white border border-gray-200 rounded-xl flex items-center justify-center group transition-all duration-300 hover:bg-gray-50"
            title={logo.alt}
          >
            <div className="w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
              {logo.svg}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};