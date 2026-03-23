'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const values = [
  {
    title: 'Craftsmanship',
    description: 'Every product is thoughtfully designed and meticulously crafted to meet our exacting standards of quality.',
  },
  {
    title: 'Sustainability',
    description: 'We source responsibly and create products designed to last, reducing waste and environmental impact.',
  },
  {
    title: 'Timeless Design',
    description: 'We create products that transcend trends and become part of your everyday rituals.',
  },
  {
    title: 'Community',
    description: 'We build lasting relationships with our customers, artisans, and the communities behind each piece.',
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
  { value: '50K+', label: 'Happy Customers' },
  { value: '15+', label: 'Countries Served' },
  { value: '200+', label: 'Unique Products' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 lg:px-8 xl:px-10 md:pb-24 md:pt-20">
        <div className="absolute inset-0 jewel-dark" />
        <div className="absolute inset-0 rich-grid opacity-45" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-accent/18 blur-3xl" />

        <div className="container relative mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr,0.98fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">
                Our Story
              </span>
              <h1 className="mt-6 font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.94] text-white">
                Designed for life,
                <span className="block text-gradient">crafted with purpose</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                Lade Studio was born from a simple belief: everyday objects should be beautiful, functional, and made to last. We curate and create premium essentials that elevate your daily rituals.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/shop">
                  <Button variant="secondary" size="lg">Explore Collection</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" size="lg" className="border border-white/15 bg-white/8 text-white hover:bg-white/12">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="jewel-card overflow-hidden rounded-[2.5rem] p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop"
                    alt="Lade Studio workspace"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="container mx-auto -mt-10">
          <div className="grid gap-4 rounded-[2.2rem] jewel-card p-5 sm:p-6 md:grid-cols-4 lg:p-7">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] bg-white/70 p-5 text-center shadow-soft sm:p-6">
                <div className="font-display text-4xl font-bold text-primary-800">{stat.value}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.92fr,1.08fr]">
          <div className="relative overflow-hidden rounded-[2.4rem] jewel-card p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem]">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="jewel-card rounded-[2.4rem] p-6 sm:p-7 lg:p-8 xl:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">Our Mission</p>
            <h2 className="mt-4 font-display text-5xl font-bold text-neutral-900">Redefining everyday luxury</h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              We believe quality should not come at the expense of the planet or your wallet. Our mission is to make premium, sustainably-crafted products accessible to everyone who values thoughtful design.
            </p>
            <p className="mt-5 text-neutral-600 leading-8">
              Every product in our collection is carefully selected or designed in-house. We partner with artisans and manufacturers who share our commitment to quality and sustainability.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50/70 px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">What We Believe</span>
            <h2 className="mt-4 font-display text-display-sm font-bold text-neutral-900">Our Values</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="jewel-card rounded-[2rem] p-5 sm:p-6 lg:p-7">
                <div className="h-12 w-12 rounded-2xl bg-secondary/12 mb-5" />
                <h3 className="font-display text-3xl font-bold text-neutral-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">The People</span>
            <h2 className="mt-4 font-display text-display-sm font-bold text-neutral-900">Meet Our Team</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="jewel-card rounded-[2rem] p-5 text-center sm:p-6 lg:p-7">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold text-neutral-900">{member.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-secondary-700">{member.role}</p>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
