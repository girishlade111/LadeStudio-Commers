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
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
        <div className="absolute inset-0 -z-20 jewel-dark" />
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image src={heroBanner.image} alt="Hero background" fill className="object-cover mix-blend-soft-light" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-900 via-primary-900/85 to-plum-900/70" />
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 rich-grid opacity-40" />

        <div className="container mx-auto">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary backdrop-blur-xl animate-fade-up">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                New Collection 2026
              </div>

              <h1
                className="font-display text-[clamp(3.2rem,7vw,6.8rem)] font-bold leading-[0.94] text-white animate-fade-up"
                style={{ animationDelay: '100ms' }}
              >
                Jewel-toned pieces
                <span className="mt-2 block text-gradient">{heroBanner.subtitle}</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg leading-8 text-white/68 animate-fade-up md:text-xl"
                style={{ animationDelay: '220ms' }}
              >
                Curated essentials with richer textures, statement silhouettes, and a premium finish built for everyday rituals.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: '320ms' }}>
                <Link href="/shop">
                  <Button size="xl" variant="secondary" className="min-w-[220px]">
                    Shop The Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="xl" variant="ghost" className="border border-white/15 bg-white/6 text-white hover:bg-white/12">
                    Our Story
                  </Button>
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: '420ms' }}>
                {[
                  { value: `${allProducts.length || 0}+`, label: 'Studio Picks' },
                  { value: '24/7', label: 'Store Access' },
                  { value: 'INR', label: 'UPI Ready' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-[1.6rem] border border-white/10 bg-white/8 px-5 py-5 backdrop-blur-xl">
                    <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
              <div className="relative mx-auto max-w-[34rem]">
                <div className="absolute -left-6 top-10 hidden w-36 rounded-[1.8rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl lg:block">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Curated</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Elevated product storytelling with crafted visuals and rich material cues.
                  </p>
                </div>
                <div className="absolute -bottom-6 right-0 z-20 hidden w-44 rounded-[1.8rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl lg:block">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Fast Checkout</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Browse, pay with UPI, and upload proof without changing the flow.
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/8 p-4 shadow-elevated backdrop-blur-sm">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                    <Image
                      src={heroBanner.image}
                      alt="Featured collection"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/55 via-transparent to-transparent" />
                  </div>
                </div>
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

      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="container mx-auto">
          <div className="grid overflow-hidden rounded-[2.6rem] border border-white/10 jewel-dark md:grid-cols-2">
            <div className="relative min-h-[380px]">
              <Image src={ctaBanner.image} alt="Newsletter banner" fill className="object-cover mix-blend-luminosity opacity-75" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 to-transparent" />
            </div>
            <div className="relative flex items-center px-8 py-12 md:px-14 lg:px-16">
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
                    className="flex-1 rounded-full border border-white/10 bg-white/10 px-5 py-4 text-sm text-white placeholder:text-white/38 focus:border-secondary/40"
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
