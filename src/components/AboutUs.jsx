'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
const greatThingsImg = '/assets/greatthings.png'
const aboutus = '/assets/aboutus.png'
const welcome = '/assets/welcome.png'

function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0)
  const rafRef = useRef()

  useEffect(() => {
    const start = performance.now()
    const step = (ts) => {
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return value
}

const StatCard = ({ icon, number, label }) => {
  return (
    <div className="flex-1 mr-5 border border-white/20 rounded-3xl p-6 text-left bg-white/5 backdrop-blur-sm hover:border-white/40 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-4xl font-bold text-white font-['PPMori']">{number}</h3>
          <p className="mt-2 text-gray-300 font-['PPMori']">{label}</p>
        </div>
        <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-2xl border border-white/10">
          {icon}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ title, description, iconSrc, altText }) => {
  return (
    <div className="relative group bg-white/5 border border-white/20 rounded-3xl p-8 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 overflow-hidden transform-gpu flex flex-col items-center">
      
      <div className="relative z-20 flex flex-col items-center w-full">
        <h3 className="text-2xl font-bold text-white text-center mb-6 font-['PPMori']">{title}</h3>
        
        {/* Icon Container Wrapper */}
        <div className="relative mb-6 z-10">
           {/* Expanding Overlay - Behind the icon box (z-0 is lowest here) */}
           <div className="absolute inset-0 bg-white/10 rounded-2xl scale-100 group-hover:scale-[25] transition-transform duration-1000 ease-in-out origin-center z-0 pointer-events-none"></div>

           {/* Actual Icon Box - Opaque Black (z-10 sits on top of overlay) */}
           <div className="relative p-3 bg-black rounded-2xl border border-white/20 group-hover:border-white/50 transition-colors duration-300 z-10">
             <Image src={iconSrc} alt={altText} width={48} height={48} className="w-12 h-12 brightness-0 invert" />
           </div>
        </div>
        
        <p className="text-gray-300 text-base leading-relaxed font-['PPMori'] opacity-90 text-center transition-colors duration-300 group-hover:text-white">
          {description}
        </p>
      </div>
    </div>
  )
}

const AboutUs = () => {
  // targets (could be fetched from an API)
  const registrationsTarget = 2000
  const participationsTarget = 180
  const reachTarget = 150000

  const registrations = useCountUp(registrationsTarget, 2500)
  const participations = useCountUp(participationsTarget, 2500)
  const reach = useCountUp(reachTarget, 2500)

  return (
    <section className="w-full py-20 bg-black text-white relative">
      
      <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold text-center text-white mb-16 font-['PPMori'] tracking-tight">About Us</h2>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 mb-12">
          <StatCard
            number={`${registrations}+`}
            label="Registrations"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a2 2 0 012 2v1h4a1 1 0 011 1v11a2 2 0 01-2 2H7a2 2 0 01-2-2V6a1 1 0 011-1h4V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />         

          <StatCard
            number={`${participations}+`}
            label="On-Campus Participations"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />

          <StatCard
            number={`${reach}+`}
            label="Reach on Social Media"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-12.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4v6h-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
        </div>



        {/* Three feature cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <FeatureCard 
            title="About NMIT Hacks"
            description="NMIT Hacks builds a nationwide community of student innovators — connecting participants from top institutions with industry mentors. Over multiple editions we provide learning, collaboration and career-growth opportunities through a mix of digital and on-campus activities."
            iconSrc={aboutus}
            altText="About Us"
          />

          <FeatureCard 
            title="Expect Great Things"
            description="Mentors from industry, hands-on workshops, and curated challenges give you the tools to build, present, and scale great ideas. Expect mentorship, judged tracks, and prizes that help projects move forward."
            iconSrc={greatThingsImg}
            altText="Expect great things"
          />

          <FeatureCard 
            title="All Students Welcome!"
            description="Beginners and experienced hackers both thrive here — no entry fee required. Teams, solo participants, and students from any discipline are encouraged to join, learn, and collaborate."
            iconSrc={welcome}
            altText="All Students Welcome"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutUs
