'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'

const values = [
  {
    title: 'Craftsmanship',
    description: 'Every product is thoughtfully designed and meticulously crafted to meet our exacting standards of quality.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Sustainability',
    description: 'We source responsibly and create products designed to last, reducing waste and environmental impact.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Timeless Design',
    description: 'We create products that transcend trends and become part of your everyday rituals.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 01.475.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Community',
    description: 'We build lasting relationships with our customers, artisans, and the communities behind each piece.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

const team = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Former industrial designer with a passion for functional beauty.',
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Supply chain expert ensuring ethical sourcing and quality control.',
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Design Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Award-winning product designer focused on user experience.',
  },
]

const stats = [
  { value: 50, suffix: 'K+', label: 'Happy Customers' },
  { value: 15, suffix: '+', label: 'Countries Served' },
  { value: 200, suffix: '+', label: 'Unique Products' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [hasStarted, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 xl:px-10 md:pb-28 md:pt-24">
        <div className="absolute inset-0 bg-primary-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,170,103,0.15),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(95,52,84,0.25),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(32,116,104,0.12),transparent_40%)]" />
        <div className="absolute inset-0 rich-grid opacity-20" />
        
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-plum-500/12 blur-[100px]" />
        <div className="absolute left-1/3 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[80px]" />

        <div className="container relative mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] xl:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/8 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-secondary backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-secondary animate-pulse" />
                Our Story
              </div>
              <h1 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold tracking-tight text-white">
                Designed for life,
                <span className="mt-2 block font-light italic text-white/80">crafted with purpose</span>
                <span className="mt-2 block bg-gradient-to-r from-secondary via-amber-100 to-secondary bg-clip-text text-transparent">
                  & attention to detail
                </span>
              </h1>
              
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-secondary" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">Premium Essentials</span>
              </div>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/65">
                Lade Studio was born from a simple belief: everyday objects should be beautiful, functional, and made to last. We curate and create premium essentials that elevate your daily rituals.
              </p>
              
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/shop">
                  <Button variant="secondary" size="lg">Explore Collection</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" size="lg" className="border border-white/15 bg-white/8 text-white hover:bg-white/12 hover:text-white">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 via-transparent to-plum-500/20 rounded-[3rem] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop"
                    alt="Lade Studio workspace"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md px-5 py-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Est.</p>
                    <p className="font-display text-2xl font-semibold text-white">2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="container mx-auto -mt-8">
          <div className="grid gap-4 rounded-[2rem] border border-neutral-100 bg-white p-6 shadow-lg sm:p-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 text-center transition-all hover:bg-white hover:shadow-md hover:border-secondary/20">
                <div className="font-display text-4xl font-bold bg-gradient-to-r from-primary-800 to-plum-700 bg-clip-text text-transparent">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.95fr,1.05fr] xl:gap-14">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-primary-100 via-transparent to-secondary/10 rounded-[3rem] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-100 bg-white shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop"
                  alt="Craftsmanship"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/80 backdrop-blur-md px-5 py-4 shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400">Quality Certified</p>
                    <p className="font-semibold text-neutral-900">ISO 9001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-[2.5rem] border border-neutral-100 bg-white p-6 shadow-lg sm:p-8 lg:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-secondary">
              <span className="h-1 w-1 rounded-full bg-secondary" />
              Our Mission
            </div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-neutral-900">
              Redefining everyday <span className="italic text-primary-800">luxury</span>
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">
              We believe quality should not come at the expense of the planet or your wallet. Our mission is to make premium, sustainably-crafted products accessible to everyone who values thoughtful design.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-neutral-600">
              Every product in our collection is carefully selected or designed in-house. We partner with artisans and manufacturers who share our commitment to quality and sustainability.
            </p>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden">
                    <Image 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="Customer" 
                      width={40} 
                      height={40} 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Join 50,000+ happy customers</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-neutral-500">(4.9)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50/50 px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-secondary">
              <span className="h-1 w-1 rounded-full bg-secondary" />
              What We Believe
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-neutral-900">
              Our Core Values
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-neutral-500">
              The principles that guide every decision we make and every product we create.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="group relative rounded-[2rem] border border-neutral-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-secondary/20">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-secondary/15 to-secondary/5 flex items-center justify-center text-secondary mb-5 transition-all duration-300 group-hover:scale-110 group-hover:from-secondary/25 group-hover:to-secondary/10">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-neutral-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-500">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-secondary">
              <span className="h-1 w-1 rounded-full bg-secondary" />
              The People
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-neutral-900">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-neutral-500">
              The passionate individuals behind Lade Studio who bring our vision to life.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="group relative rounded-[2rem] border border-neutral-100 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-secondary/20">
                <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full transition-all duration-500 group-hover:ring-4 group-hover:ring-secondary/20 group-hover:ring-offset-4">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-neutral-900">{member.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-secondary font-medium">{member.role}</p>
                <p className="mt-4 text-sm leading-6 text-neutral-500">{member.bio}</p>
                
                <div className="mt-5 flex justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <a href="#" className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-800 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-800 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="#" className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-800 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="absolute inset-0 bg-primary-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,170,103,0.12),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(95,52,84,0.2),transparent_50%)]" />
        <div className="absolute inset-0 rich-grid opacity-15" />
        
        <div className="absolute -left-20 top-1/2 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[80px]" />
        <div className="absolute -right-20 bottom-0 h-[250px] w-[250px] rounded-full bg-plum-500/10 blur-[60px]" />

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-white">
              Ready to experience the difference?
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-white/65">
              Join thousands of satisfied customers who have transformed their everyday routines with our curated collection of premium essentials.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
              <Link href="/shop">
                <Button variant="secondary" size="lg">Shop Now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
