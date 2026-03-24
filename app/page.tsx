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
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-14 sm:px-6 lg:px-8 xl:px-10 md:pb-32 md:pt-20">
        <div className="absolute inset-0 -z-20 bg-primary-900" />
        
        <div className="absolute inset-0 -z-10">
          <Image src={heroBanner.image} alt="Hero background" fill className="object-cover opacity-20 mix-blend-overlay" priority />
        </div>
        
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-900/92 to-plum-900/50" />
        
        <div className="absolute -left-48 top-0 h-[700px] w-[700px] rounded-full bg-secondary/8 blur-[140px]" />
        <div className="absolute -right-40 top-10 h-[600px] w-[600px] rounded-full bg-plum-500/10 blur-[120px]" />
        <div className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-accent/8 blur-[100px]" />
        
        <div className="absolute inset-0 rich-grid opacity-15" />
        
        <div className="absolute left-0 top-[20%] h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute left-0 bottom-[30%] h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-b from-white/5 to-transparent" />

        <div className="container mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr,0.85fr] xl:gap-16">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-secondary/25 bg-secondary/8 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.35em] text-secondary backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
                </span>
                New Collection 2026
              </div>

              <h1
                className="font-display text-[clamp(2.5rem,6.5vw,5rem)] font-semibold tracking-tight text-white animate-fade-up"
                style={{ animationDelay: '50ms', lineHeight: '1.05' }}
              >
                Curated
                <span className="mt-1 block font-light italic text-white/75">{heroBanner.subtitle}</span>
                <span className="mt-1 block bg-gradient-to-r from-secondary via-amber-100 to-secondary bg-clip-text text-transparent">{heroBanner.title}</span>
              </h1>

              <div className="mt-5 flex items-center gap-3 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-secondary" />
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/45">Premium Essentials</span>
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
              </div>

              <p
                className="mt-5 max-w-lg text-[15px] leading-7 text-white/55 animate-fade-up"
                style={{ animationDelay: '150ms' }}
              >
                Discover meticulously crafted pieces that blend timeless sophistication with contemporary flair. Each item tells a story of exceptional quality and refined taste.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '200ms' }}>
                <Link href="/shop">
                  <Button size="lg" variant="secondary" className="min-w-[220px] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all duration-300 text-[13px]">
                    Shop The Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="ghost" className="border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/[0.12] hover:border-white/25 text-[13px]">
                    Our Story
                  </Button>
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: '260ms' }}>
                {[
                  { value: `${allProducts.length || 0}+`, label: 'Curated Picks' },
                  { value: 'Premium', label: 'Quality Assured' },
                  { value: 'Secure', label: 'UPI Payments' },
                ].map((stat) => (
                  <div key={stat.label} className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-500 hover:border-secondary/25 hover:bg-white/[0.06]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <p className="font-display text-2xl font-semibold tracking-tight text-white">{stat.value}</p>
                      <p className="mt-1.5 text-[9px] uppercase tracking-[0.22em] text-white/40">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
              <div className="relative mx-auto max-w-[28rem]">
                <div className="absolute -left-8 top-12 hidden w-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-xl lg:block animate-float">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-secondary/80">Premium Quality</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-white/50">Handcrafted with precision</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 right-4 z-20 hidden w-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-xl lg:block animate-float" style={{ animationDelay: '1.2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-accent/80">Fast Checkout</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-white/50">UPI, Cards & More</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 top-1/3 hidden h-40 w-40 rounded-full bg-secondary/6 blur-3xl lg:block" />
                <div className="absolute -left-6 bottom-1/3 hidden h-32 w-32 rounded-full bg-accent/6 blur-2xl lg:block" />
                
                <div className="relative overflow-hidden rounded-[3rem] border border-white/12 bg-white/[0.03] p-1.5 shadow-2xl backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-secondary/5" />
                  <div className="absolute inset-0 ring-1 ring-white/5 rounded-[3rem]" />
                  
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.6rem]">
                    <Image
                      src={heroBanner.image}
                      alt="Featured collection"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-xl px-5 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-secondary">Featured Collection</p>
                            <p className="mt-1.5 font-display text-xl font-semibold text-white">Timeless Essentials</p>
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -z-10 -top-10 -right-10 h-36 w-36 rounded-full border border-secondary/15" />
                <div className="absolute -z-10 -bottom-6 -left-6 h-24 w-24 rounded-full border border-white/8" />
                <div className="absolute -z-10 top-1/2 left-1/4 h-4 w-4 rounded-full bg-secondary/30" />
                <div className="absolute -z-10 bottom-1/3 right-1/4 h-3 w-3 rounded-full bg-accent/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary-900 py-3.5 overflow-hidden border-y border-white/5">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-14 px-8">
              {['Premium Quality Assured', 'Secure UPI Checkout', 'Fast Delivery', 'Easy Returns', 'Curated Collection'].map((text) => (
                <span key={text} className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/60" />
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
