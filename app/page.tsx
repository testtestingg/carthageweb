"use client"

import { Search, ShoppingBag, ArrowRight, Menu, X, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-[#111] overflow-x-hidden">
      {/* Ambient Background Blobs */}
      <div className="blob blob-1 fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-60 blur-[80px] -z-10 bg-[radial-gradient(circle,rgb(224,231,255)_0%,rgba(255,255,255,0)_70%)]" />
      <div className="blob blob-2 fixed bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full opacity-60 blur-[80px] -z-10 bg-[radial-gradient(circle,rgb(255,228,230)_0%,rgba(255,255,255,0)_70%)]" />

      {/* Header */}
      <header className="fixed top-0 z-[1000] w-full h-20 flex justify-between items-center px-4 md:px-12 bg-[rgba(250,250,250,0.85)] backdrop-blur-xl border-b border-[rgba(0,0,0,0.03)]">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-lg transition-transform hover:scale-110"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 list-none">
            <li>
              <a href="#" className="text-sm font-medium text-[#444] hover:text-black transition-colors">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-[#444] hover:text-black transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-[#444] hover:text-black transition-colors">
                Journal
              </a>
            </li>
          </ul>
        </nav>

        {/* Logo - Centered on mobile, left on desktop */}
        <div className="font-['Space_Grotesk'] font-bold text-xl md:text-2xl tracking-[-0.03em] absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
          glow<span className="text-[#ff4d8c]">.</span>co
        </div>

        <div className="flex gap-3 md:gap-5 items-center">
          <button className="hidden md:block text-lg transition-transform hover:scale-110">
            <Search className="w-6 h-6" />
          </button>
          <button className="relative text-lg transition-transform hover:scale-110">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-2 bg-[#ff4d8c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-[rgba(250,250,250,0.98)] backdrop-blur-xl border-b border-[rgba(0,0,0,0.03)] md:hidden">
            <nav className="px-4 py-6">
              <ul className="flex flex-col gap-4 list-none">
                <li>
                  <a
                    href="#"
                    className="text-base font-medium text-[#444] hover:text-black transition-colors block py-2"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base font-medium text-[#444] hover:text-black transition-colors block py-2"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base font-medium text-[#444] hover:text-black transition-colors block py-2"
                  >
                    Journal
                  </a>
                </li>
                <li className="pt-2 border-t border-[rgba(0,0,0,0.05)]">
                  <a
                    href="#"
                    className="text-base font-medium text-[#444] hover:text-black transition-colors flex items-center gap-2 py-2"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Main Hero */}
      <main className="relative max-w-[1400px] w-full mx-auto min-h-screen pt-36 pb-16 px-4 md:px-12 grid md:grid-cols-2 items-center gap-16">
        <div className="z-[2]">
          <div className="inline-flex items-center px-3 py-1.5 bg-white border border-[#e5e5e5] rounded-full text-xs font-semibold uppercase tracking-wider mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <span className="w-2 h-2 bg-[#10b981] rounded-full mr-2" />
            New Drop V.2.0
          </div>

          <h1 className="font-['Space_Grotesk'] text-[76px] leading-[0.95] font-semibold tracking-[-0.03em] mb-6 text-black">
            Skincare for the <br />
            <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
              Main Character.
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-[#555] max-w-[460px] mb-10">
            High-performance botanical formulas designed for your skin barrier. 100% Vegan, Cruelty-free, and radically
            transparent. Get the glow without the filter.
          </p>

          <div className="flex gap-4 items-center">
            <a
              href="#"
              className="bg-[#111] text-white px-9 py-[18px] rounded-full font-semibold text-base transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center gap-2.5"
            >
              Shop The Edit
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="px-9 py-[18px] rounded-full font-semibold text-base bg-[rgba(255,255,255,0.5)] border border-[#e5e5e5] transition-all hover:bg-white hover:border-black"
            >
              View Lookbook
            </a>
          </div>
        </div>

        <div className="relative h-[700px] w-full">
          <div className="group w-full h-full rounded-[40px] overflow-hidden relative -rotate-2 transition-transform duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:rotate-0">
            <img
              src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
              alt="Model with glowing skin"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gen Z Sticker Element */}
            <div className="absolute top-5 left-5 z-[4] w-[100px] h-[100px] flex items-center justify-center bg-[#dbff00] rounded-full text-black font-extrabold font-['Space_Grotesk'] text-center rotate-[15deg] shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-sm leading-tight">
              BEST
              <br />
              SELLER
            </div>
          </div>

          {/* Floating Glassmorphism Product Card 1 */}
          <div className="floating-card absolute bottom-[60px] left-[-40px] bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl p-4 rounded-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center gap-3 z-[3] animate-[float_6s_ease-in-out_infinite]">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              alt="Serum"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold mb-0.5">Dewy Drops</h4>
              <p className="text-xs text-[#666]">Hydrating Serum</p>
              <div className="flex text-[#ffb800] text-xs mt-0.5">★★★★★</div>
            </div>
          </div>

          {/* Floating Glassmorphism Product Card 2 */}
          <div className="floating-card absolute top-20 right-[-20px] bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl p-4 rounded-[20px] border border-[rgba(255,255,255,0.6)] shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center gap-3 z-[3] animate-[float_6s_ease-in-out_1.5s_infinite]">
            <img
              src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              alt="Cream"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold mb-0.5">Cloud Cream</h4>
              <p className="text-xs text-[#666]">Night Recovery</p>
              <div className="flex text-[#ffb800] text-xs mt-0.5">★★★★☆</div>
            </div>
          </div>
        </div>
      </main>

      {/* Marquee Ticker */}
      <div className="w-full bg-[#111] text-white py-4 overflow-hidden whitespace-nowrap relative -rotate-1 scale-[1.02] -mt-10 z-[5] border-t border-b border-[#333]">
        <div className="inline-block animate-[marquee_20s_linear_infinite]">
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            ✨ FREE SHIPPING OVER $50
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            🌿 CARBON NEUTRAL
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            🐰 CRUELTY FREE
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            💧 HYDRATION HEROES
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            ✨ FREE SHIPPING OVER $50
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            🌿 CARBON NEUTRAL
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            🐰 CRUELTY FREE
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            💧 HYDRATION HEROES
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            ✨ FREE SHIPPING OVER $50
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            🌿 CARBON NEUTRAL
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            🐰 CRUELTY FREE
          </span>
          <span className="font-['Space_Grotesk'] text-lg font-medium uppercase px-10 tracking-wider">
            💧 HYDRATION HEROES
          </span>
        </div>
      </div>

      {/* Featured Products Strip */}
      <section className="py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h3 className="font-['Space_Grotesk'] text-[32px]">Trending Now</h3>
          <a href="#" className="underline font-medium">
            See All Products
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product 1 */}
          <div className="group bg-white rounded-[20px] p-6 transition-all duration-300 cursor-pointer border border-transparent hover:translate-y-[-10px] hover:border-[#eee] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            <div className="w-full h-60 rounded-xl overflow-hidden mb-5 bg-[#f5f5f5]">
              <img
                src="/minimalist-rose-pink-toner-bottle-on-white-backgro.jpg"
                alt="Toner"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-base block mb-1">Glow Tonic</span>
                <span className="text-xs text-[#888]">Exfoliator</span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold">$24</span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group bg-white rounded-[20px] p-6 transition-all duration-300 cursor-pointer border border-transparent hover:translate-y-[-10px] hover:border-[#eee] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            <div className="w-full h-60 rounded-xl overflow-hidden mb-5 bg-[#f5f5f5]">
              <img
                src="/vitamin-c-serum-collection-glossier-style-flatlay-.jpg"
                alt="Serum"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-base block mb-1">Vit-C Booster</span>
                <span className="text-xs text-[#888]">Brightening</span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold">$42</span>
            </div>
          </div>

          {/* Product 3 */}
          <div className="group bg-white rounded-[20px] p-6 transition-all duration-300 cursor-pointer border border-transparent hover:translate-y-[-10px] hover:border-[#eee] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            <div className="w-full h-60 rounded-xl overflow-hidden mb-5 bg-[#f5f5f5]">
              <img
                src="/luxurious-cream-moisturizer-jar-minimal-clean-beau.jpg"
                alt="Moisturizer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-base block mb-1">Barrier Repair</span>
                <span className="text-xs text-[#888]">Moisturizer</span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold">$38</span>
            </div>
          </div>

          {/* Product 4 */}
          <div className="group bg-white rounded-[20px] p-6 transition-all duration-300 cursor-pointer border border-transparent hover:translate-y-[-10px] hover:border-[#eee] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            <div className="w-full h-60 rounded-xl overflow-hidden mb-5 bg-[#f5f5f5]">
              <img
                src="/modern-sunscreen-tube-spf-50-clean-minimal-skincar.jpg"
                alt="Sunscreen"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-base block mb-1">Invisible Shield</span>
                <span className="text-xs text-[#888]">SPF 50</span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold">$30</span>
            </div>
          </div>
        </div>
      </section>

      {/* New Product Launch Signup Section */}
      <section className="relative py-32 px-4 md:px-12 max-w-[1400px] mx-auto">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-40 blur-[100px] bg-[radial-gradient(circle,rgb(255,200,220)_0%,rgba(255,255,255,0)_70%)]" />

        <div className="relative bg-gradient-to-br from-white to-[#fef9fb] rounded-[40px] p-16 border border-[rgba(255,77,140,0.1)] shadow-[0_40px_80px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[60px] bg-[radial-gradient(circle,rgb(255,143,112)_0%,rgba(255,255,255,0)_70%)]" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-20 blur-[60px] bg-[radial-gradient(circle,rgb(224,231,255)_0%,rgba(255,255,255,0)_70%)]" />

          <div className="relative max-w-[700px] mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white border border-[#ffe0eb] rounded-full text-xs font-semibold uppercase tracking-wider mb-8 shadow-[0_4px_12px_rgba(255,77,140,0.08)]">
              <span className="w-2 h-2 bg-[#ff4d8c] rounded-full mr-2 animate-pulse" />
              Coming Soon
            </div>

            <h2 className="font-['Space_Grotesk'] text-[56px] leading-[1.1] font-semibold tracking-[-0.03em] mb-6 text-black">
              Be First to Try Our
              <br />
              <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
                Next Big Thing
              </span>
            </h2>

            <p className="text-lg leading-relaxed text-[#555] mb-10 max-w-[540px] mx-auto">
              Get exclusive early access to our revolutionary new formula. Sign up now and be the first to experience
              next-level skincare innovation.
            </p>

            {/* Email Form */}
            <form className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-[#e5e5e5] bg-white text-base focus:outline-none focus:border-[#ff4d8c] focus:ring-2 focus:ring-[rgba(255,77,140,0.1)] transition-all"
                required
              />
              <button
                type="submit"
                className="bg-[#111] text-white px-9 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-[#222] inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-xs text-[#888]">Join 12,000+ skincare lovers on the waitlist. No spam, just glow.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-['Space_Grotesk'] text-[42px] font-semibold mb-4">
            Loved by{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#ff4d8c] to-[#ff8f70] bg-clip-text text-transparent">
              Thousands
            </span>
          </h3>
          <p className="text-lg text-[#666]">Real results from real people</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="group bg-white rounded-[24px] p-8 border border-[#eee] transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
            <div className="flex text-[#ffb800] text-lg mb-4">★★★★★</div>
            <p className="text-base leading-relaxed text-[#444] mb-6">
              "My skin has never looked better! The Vit-C Booster completely transformed my morning routine. Glowing
              skin without any filters."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4d8c] to-[#ff8f70]" />
              <div>
                <h4 className="font-semibold text-sm">Sarah Chen</h4>
                <p className="text-xs text-[#888]">Verified Buyer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="group bg-white rounded-[24px] p-8 border border-[#eee] transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
            <div className="flex text-[#ffb800] text-lg mb-4">★★★★★</div>
            <p className="text-base leading-relaxed text-[#444] mb-6">
              "Finally found skincare that actually works for sensitive skin. The Barrier Repair is a game changer.
              Worth every penny!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe]" />
              <div>
                <h4 className="font-semibold text-sm">Maya Rodriguez</h4>
                <p className="text-xs text-[#888]">Verified Buyer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="group bg-white rounded-[24px] p-8 border border-[#eee] transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
            <div className="flex text-[#ffb800] text-lg mb-4">★★★★★</div>
            <p className="text-base leading-relaxed text-[#444] mb-6">
              "Obsessed with the Glow Tonic! My pores are smaller and my skin texture is so smooth. This brand is the
              real deal."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffe4e6] to-[#fecdd3]" />
              <div>
                <h4 className="font-semibold text-sm">Zoe Williams</h4>
                <p className="text-xs text-[#888]">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 bg-gradient-to-br from-[#111] to-[#1a1a1a] text-white pt-20 pb-8 px-4 md:px-12 overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-0 right-[20%] w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] bg-[radial-gradient(circle,rgb(255,77,140)_0%,rgba(255,255,255,0)_70%)]" />

        <div className="relative max-w-[1400px] mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div>
              <div className="font-['Space_Grotesk'] font-bold text-3xl tracking-[-0.03em] mb-4">
                glow<span className="text-[#ff4d8c]">.</span>co
              </div>
              <p className="text-sm text-[#999] leading-relaxed mb-6">
                Radically transparent skincare for the main character. Made with botanical ingredients and lots of love.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:bg-[rgba(255,77,140,0.2)] hover:scale-110"
                >
                  <span className="text-sm">𝕏</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:bg-[rgba(255,77,140,0.2)] hover:scale-110"
                >
                  <span className="text-sm">IG</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all hover:bg-[rgba(255,77,140,0.2)] hover:scale-110"
                >
                  <span className="text-sm">TT</span>
                </a>
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="font-['Space_Grotesk'] font-semibold text-base mb-6">Shop</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Gift Sets
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Travel Size
                  </a>
                </li>
              </ul>
            </div>

            {/* Learn Column */}
            <div>
              <h4 className="font-['Space_Grotesk'] font-semibold text-base mb-6">Learn</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Ingredient Glossary
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Skin Quiz
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Journal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="font-['Space_Grotesk'] font-semibold text-base mb-6">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[rgba(255,255,255,0.1)] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-xs text-[#666] text-center md:text-left">
                © 2025 glow.co. All rights reserved. Made with 💖 for your skin.
              </p>
              <p className="text-xs text-[#555]">
                UI generated by{" "}
                <a
                  href="https://1ui.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff4d8c] hover:text-[#ff8f70] transition-colors"
                >
                  1ui.dev
                </a>{" "}
                and made into real life using{" "}
                <a
                  href="https://v0.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff4d8c] hover:text-[#ff8f70] transition-colors"
                >
                  v0.app
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-[#666] hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-[#666] hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-[#666] hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[999] w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] active:scale-95 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-[#ff4d8c]" />
      </button>
    </div>
  )
}
