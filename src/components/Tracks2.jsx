'use client';
import React, { useRef, useState } from 'react';

// 1. DATA & ICONS
const TRACKS = [
  {
    id: 'game-dev',
    title: 'Game Dev',
    desc: 'Bring virtual worlds to life, crafting captivating and interactive gaming experiences.'
  },
  {
    id: 'iot',
    title: 'IOT',
    desc: 'Witness the convergence of software and hardware to implement solutions that leverage the power of IoT.'
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    desc: 'Push the boundaries of intelligent systems in the cutting-edge world of AI & ML.'
  },
  {
    id: 'blockchain',
    title: <>Blockchain /<br />Cybersecurity</>,
    desc: 'Create secure, transparent, and transformative applications that harness the power of blockchain networks.'
  },
  {
    id: 'open-innovation',
    title: 'Open Innovation',
    desc: 'Embrace the freedom to explore tech frontiers, fostering ideas that break traditional boundaries.'
  }
];

const Icon = ({ name }) => {
  switch (name) {
    case 'game-dev':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h2" />
          <path d="M8 12h2" />
          <path d="M15 13v-2" />
          <path d="M18 13v-2" />
        </svg>
      );
    case 'iot':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m7.8 16.2-2.9 2.9" />
          <path d="M2 12h4" />
          <path d="m7.8 7.8-2.9-2.9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'ai-ml':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="M12 8V4H8" />
           <rect width="16" height="12" x="4" y="8" rx="2" />
           <path d="M2 14h2" />
           <path d="M20 14h2" />
           <path d="M15 13v2" />
           <path d="M9 13v2" />
        </svg>
      );
    case 'blockchain':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="8" height="8" x="2" y="2" rx="2" />
          <rect width="8" height="8" x="14" y="2" rx="2" />
          <rect width="8" height="8" x="2" y="14" rx="2" />
          <rect width="8" height="8" x="14" y="14" rx="2" />
          <path d="M10 6h4" />
          <path d="M10 18h4" />
          <path d="M6 10v4" />
          <path d="M18 10v4" />
        </svg>
      );
    case 'open-innovation':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="m8 22 4-10 4 10" />
        </svg>
      );
    default:
      return null;
  }
};

// 2. THE CARD COMPONENT
const TrackCard = ({ t }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div className="relative h-full w-full rounded-xl shadow-2xl transition-all duration-200 group hover:scale-[1.01]">
      
      {/* 1. TRAVERSING BORDERS (The Wobbly Effect) - WHITE */}
      <div className="absolute -inset-[2px] overflow-hidden rounded-xl bg-neutral-900">
        <div 
          className="absolute inset-[-50%] bg-[conic-gradient(transparent_50deg,#ffffff_90deg,transparent_130deg,transparent_230deg,#ffffff_270deg,transparent_310deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin"
          style={{ animationDuration: '4s' }} 
        />
      </div>

      {/* 2. CARD CONTENT CONTAINER - BLACK BG */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full overflow-hidden rounded-xl bg-black px-6 py-8 md:px-8 md:py-10 flex flex-col border border-white/10 transition-colors duration-300 group-hover:border-white/20"
      >
        {/* Inner Spotlight - WHITE */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-4 flex-grow">
          {/* Icon Container - WHITE ACCENTS */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 group-hover:border-white/40">
            {/* Added: transition-transform and group-hover:scale-125 */}
            <div className="text-white transition-transform duration-300 group-hover:scale-125">
              <Icon name={t.id} />
            </div>
          </div>

          {/* Title - WHITE */}
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white font-['PPMori']">
            {t.title}
          </h3>

          {/* Description - GRAY/WHITE */}
          <p className="leading-7 text-neutral-400 font-['PPMori'] text-sm md:text-base">
            {t.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

// 3. MAIN SECTION COMPONENT
const Tracks = () => {
  return (
    <section className="w-full py-20 bg-black text-white relative overflow-hidden">
      <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <h2 className="text-5xl font-bold text-center text-white mb-6 font-['PPMori'] tracking-tight">
          Tracks
        </h2>
        <p className="text-center text-neutral-400 mb-16 font-['PPMori'] max-w-2xl mx-auto">
          This edition provides connection beyond boundaries... We bring you the coolest tracks!
        </p>

        {/* Grid / Flex Layout */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 mt-8">
          {TRACKS.map((t) => (
            <div key={t.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] flex">
              <TrackCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;