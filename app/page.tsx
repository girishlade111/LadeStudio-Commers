import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import { Section, SectionHeader } from '@/components/ui/Section'
import { categories as showcaseCategories, ctaBanner, heroBanner } from '@/data'
import { getAllProducts } from '@/services/catalog'

export default async function HomePage() {
  const allProducts = await getAllProducts()
  const featuredProducts = allProducts.slice(0, 4)
  const trendingProducts = allProducts.slice(4, 8)
  const categories = showcaseCategories.map((category) => ({
    ...category,
    productCount: allProducts.filter((product) => product.category.toLowerCase() === category.name.toLowerCase()).length,
  }))

  return (
    <div className="min-h-screen">
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 xl:px-10 md:pb-32 md:pt-24">
        <div className="absolute inset-0 -z-20 bg-primary-900" />
        
        <div className="absolute inset-0 -z-10">
          <Image src={heroBanner.image} alt="Hero background" fill className="object-cover opacity-25 mix-blend-overlay" priority />
        </div>
        
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-900/90 to-plum-900/60" />
        
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-plum-500/10 blur-[80px]" />
        
        <div className="absolute inset-0 rich-grid opacity-30" />
        
        <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr,0.9fr] xl:gap-20">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.35em] text-secondary backdrop-blur-md animate-fade-up">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-50" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-secondary" />
                </span>
                New Collection 2026
              </div>

              <h1
                className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold tracking-[-0.015em] text-white animate-fade-up"
                style={{ animationDelay: '60ms', lineHeight: '1.1' }}
              >
                Refined
                <span className="mt-0.5 block font-light italic text-white/85">{heroBanner.subtitle}</span>
                <span className="mt-1 block font-normal not-italic text-gradient bg-gradient-to-r from-secondary via-amber-100 to-secondary bg-clip-text text-transparent">{heroBanner.title}</span>
              </h1>

              <div className="mt-4 flex items-center gap-2.5 animate-fade-up" style={{ animationDelay: '120ms' }}>
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-secondary" />
                <span className="text-[9px] font-light uppercase tracking-[0.25em] text-secondary/60">Curated Essentials</span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/15" />
              </div>

              <p
                className="mt-4 max-w-xl font-light leading-6 text-white/50 animate-fade-up md:text-[15px] md:leading-7"
                style={{ animationDelay: '160ms' }}
              >
                Discover meticulously crafted pieces that blend timeless sophistication with contemporary flair. Each item tells a story of exceptional quality.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '220ms' }}>
                <Link href="/shop">
                  <Button size="lg" variant="secondary" className="min-w-[200px] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Shop The Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="ghost" className="border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/30">
                    Our Story
                  </Button>
                </Link>
              </div>

              <div className="mt-10 grid gap-2 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: '280ms' }}>
                {[
                  { value: `${allProducts.length || 0}+`, label: 'Curated Picks', icon: '✦' },
                  { value: 'Premium', label: 'Quality Assured', icon: '◈' },
                  { value: 'Secure', label: 'UPI Payments', icon: '◇' },
                ].map((stat, idx) => (
                  <div key={stat.label} className="group relative rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition-all duration-300 hover:border-secondary/30 hover:bg-white/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative">
                      <p className="font-display text-xl font-medium tracking-tight text-white">{stat.value}</p>
                      <p className="mt-1 flex items-center gap-1 text-[8px] uppercase tracking-[0.25em] text-white/40">
                        <span className="text-secondary/50">{stat.icon}</span>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: '150ms' }}>
              <div className="relative mx-auto max-w-[32rem]">
                <div className="absolute -left-6 top-8 hidden w-36 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl lg:block animate-float">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-secondary/70">Premium Quality</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                    Meticulous attention to detail.
                  </p>
                </div>
                
                <div className="absolute -bottom-6 right-2 z-20 hidden w-36 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-3.5 backdrop-blur-xl lg:block animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <div>
                      <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-accent/70">Fast Checkout</p>
                      <p className="mt-0.5 text-[11px] leading-tight text-white/50">UPI & Cards</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 top-1/3 hidden h-32 w-32 rounded-full bg-secondary/5 blur-2xl lg:block" />
                <div className="absolute -left-4 bottom-1/3 hidden h-24 w-24 rounded-full bg-accent/5 blur-xl lg:block" />
                
                <div className="relative overflow-hidden rounded-[2.6rem] border border-white/15 bg-white/5 p-1.5 shadow-elevated backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-secondary/5" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem]">
                    <Image
                      src={heroBanner.image}
                      alt="Featured collection"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/15 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-md px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Featured</p>
                        <p className="mt-1 font-display text-lg font-semibold text-white">Timeless Essentials</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -z-10 -top-8 -right-8 h-32 w-32 rounded-full border border-secondary/20" />
                <div className="absolute -z-10 -bottom-4 -left-4 h-20 w-20 rounded-full border border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary-900 py-4 overflow-hidden marquee-container">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-12 px-6">
              {['Free Shipping Above Rs. 999', 'Clerk Secure Sign-In', 'Google Sheets Powered Catalog', 'UPI Checkout Flow', 'Rich Editorial Experience'].map((text) => (
                <span key={text} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/70" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Section background="default" padding="xl" className="relative">
        <SectionHeader
          label="Curated Selection"
          title="Featured in the Studio"
          subtitle="A richer shopping experience starts with pieces that already know how to hold attention."
        />

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 90}ms` }}>
                <ProductCard product={product} priority={index < 2} />
              </div>
            ))}
          </div>
        ) : (
          <div className="jewel-card mx-auto max-w-3xl rounded-[2rem] p-10 text-center">
            <h3 className="font-display text-3xl font-bold text-neutral-900">Products will appear here soon</h3>
            <p className="mt-3 text-neutral-500">Once your Google Sheets catalog is available, featured picks will populate automatically.</p>
          </div>
        )}
      </Section>

      <Section background="cream" padding="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <SectionHeader
          label="Categories"
          title="A Category Wall With More Presence"
          subtitle="Explore collections designed to feel immersive before the first click."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          <Link
            href={`/shop?category=${categories[0]?.name || ''}`}
            className="group relative overflow-hidden rounded-[2rem] md:col-span-7 md:row-span-2"
          >
            <div className="absolute inset-0">
              <Image src={categories[0]?.image || ''} alt={categories[0]?.name || ''} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 58vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/30 to-transparent" />
            <div className="relative flex h-full min-h-[440px] flex-col justify-end p-8 md:p-10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">{categories[0]?.productCount} Products</span>
              <h3 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">{categories[0]?.name}</h3>
              <p className="mt-3 max-w-md text-white/68">{categories[0]?.description}</p>
            </div>
          </Link>

          {categories.slice(1, 5).map((category, index) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.name}`}
              className={`group relative overflow-hidden rounded-[2rem] ${index < 2 ? 'md:col-span-5' : 'md:col-span-6'}`}
            >
              <div className="absolute inset-0">
                <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 42vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
              <div className="relative flex min-h-[240px] flex-col justify-end p-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary">{category.productCount} Products</span>
                <h3 className="mt-3 font-display text-3xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section background="default" padding="xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">Most Wanted</p>
            <h2 className="mt-4 font-display text-display-sm font-bold text-neutral-900 md:text-display-md">
              Trending With A Richer Look
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-neutral-500">
              Best-performing pieces, presented with stronger hierarchy and more editorial confidence.
            </p>
          </div>
          <Link href="/shop">
            <Button variant="outline" size="lg">See All Products</Button>
          </Link>
        </div>

        {trendingProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 90}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </Section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 xl:px-10 md:py-28">
        <div className="container mx-auto">
          <div className="grid overflow-hidden rounded-[2.6rem] border border-white/10 jewel-dark md:grid-cols-2">
            <div className="relative min-h-[380px]">
              <Image src={ctaBanner.image} alt="Newsletter banner" fill className="object-cover mix-blend-luminosity opacity-75" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 to-transparent" />
            </div>
            <div className="relative flex items-center px-6 py-10 sm:px-8 md:px-12 lg:px-14 xl:px-16">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">Stay Connected</span>
                <h2 className="mt-5 font-display text-display-sm font-bold text-white md:text-display-md">
                  {ctaBanner.title}
                </h2>
                <p className="mt-5 max-w-lg text-body-lg text-white/68">
                  {ctaBanner.description}
                </p>
                <form className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 rounded-full border border-white/10 bg-white/10 px-5 py-4 text-sm text-white placeholder:text-white/38 focus:border-secondary/40 sm:px-6"
                  />
                  <Button variant="secondary" size="lg" className="whitespace-nowrap">
                    {ctaBanner.ctaText}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
