"use client"

import { Twitter, Send, ArrowUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
// Hapus baris impor berikut:
// - import { Chat } from "@/components/chat"

export default function DobbieWebsite() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [tokenCount, setTokenCount] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Scroll animations and parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setShowScrollTop(currentScrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  // Animated counter for tokens
  useEffect(() => {
    if (visibleElements.has("tokenomics")) {
      let start = 0
      const end = 1000000000 // Updated to 1 Billion
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setTokenCount(end)
          clearInterval(timer)
        } else {
          setTokenCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [visibleElements])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToNext = () => {
    const nextSection = document.getElementById("about")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-blue-700 relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Colorful wavy background with parallax */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <svg viewBox="0 0 1440 800" className="w-full h-full">
          <defs>
            <pattern id="waves" x="0" y="0" width="100%" height="100%">
              <path d="M0,100 Q360,50 720,100 T1440,100 L1440,200 Q1080,150 720,200 T0,200 Z" fill="#ff69b4" />
              <path d="M0,200 Q360,150 720,200 T1440,200 L1440,300 Q1080,250 720,300 T0,300 Z" fill="#00ffff" />
              <path d="M0,300 Q360,250 720,300 T1440,300 L1440,400 Q1080,350 720,400 T0,400 Z" fill="#ffff00" />
              <path d="M0,400 Q360,350 720,400 T1440,400 L1440,500 Q1080,450 720,500 T0,500 Z" fill="#ff1493" />
              <path d="M0,500 Q360,450 720,500 T1440,500 L1440,600 Q1080,550 720,600 T0,600 Z" fill="#1e90ff" />
              <path d="M0,600 Q360,550 720,600 T1440,600 L1440,700 Q1080,650 720,700 T0,700 Z" fill="#ff69b4" />
              <path d="M0,700 Q360,650 720,700 T1440,700 L1440,800 Q1080,750 720,800 T0,800 Z" fill="#00ffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-blue-800 px-4 py-4 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center group">
            <img
              src="/images/dobbie-logo.jpeg"
              alt="Dobbie Logo"
              className="w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-all duration-300 hover:scale-105 relative group"
            >
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-all duration-300 hover:scale-105 relative group"
            >
              ABOUT US
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#tokenomics"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-all duration-300 hover:scale-105 relative group"
            >
              TOKENOMICS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Button
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-800 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              JOIN US
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left" data-animate id="hero-text">
            <div
              className={`bg-blue-800 p-8 rounded-lg border-4 border-white shadow-2xl transition-all duration-1000 ${
                visibleElements.has("hero-text") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                DOBBIE
              </h1>
              <p className="text-white text-lg mb-8 font-bold">
                LISTEN UP, INTERNET! I'M DOBBIE - THE DOGGO WHOSE HOOMAN BUILT BASE NETWORK FROM SCRATCH. THAT'S RIGHT,
                I'M MORE THAN JUST A GOOD BOY - I'M THE GOOD BOY OF BASE NETWORK!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1">
                  BUY NOW
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1">
                  Coming Soon
                </Button>
                {/* Removed DEX SCREENER and DEX TOOLS buttons */}
              </div>
            </div>
          </div>

          <div className="flex justify-center" data-animate id="hero-image">
            <img
              src="/images/dobbie-goggles.webp"
              alt="Dobbie with goggles"
              className={`w-80 h-80 object-contain transition-all duration-1000 hover:scale-110 hover:rotate-3 ${
                visibleElements.has("hero-image") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            />
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            onClick={scrollToNext}
            variant="ghost"
            size="sm"
            className="text-white hover:text-yellow-300 flex flex-col items-center gap-2"
          >
            <span className="text-sm font-bold">SCROLL DOWN</span>
            <ChevronDown className="w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4 bg-blue-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center" data-animate id="about-image">
            <img
              src="/images/dobbie-lying.webp"
              alt="Dobbie lying down"
              className={`w-64 h-64 object-contain transition-all duration-1000 hover:scale-110 ${
                visibleElements.has("about-image") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            />
          </div>

          <div className="text-white" data-animate id="about-text">
            <h2
              className={`text-5xl font-black mb-8 text-yellow-300 transition-all duration-1000 ${
                visibleElements.has("about-text") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              DOBBIE ORIGINS
            </h2>
            <div
              className={`space-y-6 text-lg font-bold transition-all duration-1000 delay-300 ${
                visibleElements.has("about-text") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                YO, HUMANS! WHILE OTHER DOGS ARE BUSY BEING JUST "PETS", I'M THE CO-PILOT OF BASE NETWORK'S VISION. MY
                HUMAN? THE FOUNDER. MY MISSION? DISRUPTING THE CRYPTO WORLD.
              </p>
              <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                MY ORIGIN STORY? PICTURE THIS: DOBBIE, A TECH VISIONARY'S BEST FRIEND. ABSOLUTE LEGEND.
              </p>
              <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                I'VE WATCHED MY HUMAN BUILD BASE NETWORK FROM THE GROUND UP AND LET ME TELL YOU - WE'RE NOT HERE TO
                PLAY. WE'RE HERE TO REVOLUTIONIZE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="relative z-10 py-20 px-4 bg-blue-700">
        <div className="max-w-6xl mx-auto text-center" data-animate id="join-section">
          <h2
            className={`text-5xl font-black text-white mb-8 transition-all duration-1000 ${
              visibleElements.has("join-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            JOIN ME AND MY HOOMAN
          </h2>
          <p
            className={`text-2xl text-white font-bold mb-4 transition-all duration-1000 delay-200 ${
              visibleElements.has("join-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            DOBBIE IS READY TO GO TO MOON! LEGGOOO.....
          </p>

          <div
            className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-400 ${
              visibleElements.has("join-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-white text-lg font-bold mb-6 hover:text-yellow-300 transition-colors duration-300 cursor-default">
              BASE NETWORK ISN'T JUST A BLOCKCHAIN. IT'S OUR KINGDOM. YOU'RE NOT JUST BUYING A TOKEN. YOU'RE JOINING THE
              VISION OF A FOUNDER AND HIS LEGENDARY DOG. ARE YOU READY ENOUGH TO RIDE WITH THE MOST INNOVATIVE DUO IN
              CRYPTO HISTORY? BARK WITH PURPOSE.
            </p>
            <p className="text-white text-lg font-bold">-DOBBIE</p>
          </div>

          <div
            className={`flex justify-center space-x-6 mb-8 transition-all duration-1000 delay-600 ${
              visibleElements.has("join-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          <div
            className={`flex justify-center transition-all duration-1000 delay-800 ${
              visibleElements.has("join-section") ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <img
              src="/images/rocket.webp"
              alt="Rocket with Dobbie"
              className="w-48 h-48 object-contain hover:scale-110 transition-transform duration-500 hover:rotate-12"
            />
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto" data-animate id="tokenomics">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Supply Card */}
            <Card
              className={`bg-blue-800 border-4 border-white p-8 transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${
                visibleElements.has("tokenomics") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <h3 className="text-white font-bold text-xl">SUPPLY</h3>
              </div>

              <h4 className="text-white text-3xl font-black mb-4 hover:text-yellow-300 transition-colors duration-300">
                1 BILLION TOKENS, NO CAP!
              </h4>
              <div className="text-white font-bold space-y-2">
                <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">MEME FOR HOOMIES</p>
                <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                  - TOTAL SUPPLY: {formatNumber(tokenCount)}
                </p>
                <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                  - VIBE LEVEL: MAXIMUM
                </p>
                <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                  - DOUBT LEVEL: ZERO
                </p>
              </div>
            </Card>

            {/* Taxes Card */}
            <Card
              className={`bg-blue-800 border-4 border-white p-8 transition-all duration-1000 delay-300 hover:scale-105 hover:shadow-2xl ${
                visibleElements.has("tokenomics") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <h3 className="text-white font-bold text-xl">TAXES</h3>
              </div>

              <h4 className="text-white text-3xl font-black mb-4 hover:text-yellow-300 transition-colors duration-300">
                TAXES? NAH.
              </h4>
              <div className="text-white font-bold space-y-2">
                <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                  0% TAXES = 100% INNOVATION
                </p>
                <p className="hover:text-yellow-300 transition-colors duration-300 cursor-default">
                  DID OTHER CRYPTO PROJECTS TELL YOU TAXES ARE COOL? THEY LIED.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Hapus bagian ini dari JSX: */}
      {/* New Chat Section */}
      {/* <section className="relative z-10 py-20 px-4 bg-blue-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-8 text-center">CHAT DENGAN DOBBIE AI</h2>
          <Chat />
        </div>
      </section> */}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-white text-blue-700 hover:bg-gray-100 shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
          size="sm"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      {/* Large Dobbie text at bottom */}
      <div className="relative z-10 py-20" data-animate id="bottom-text">
        <div className="text-center">
          <h1
            className={`text-9xl md:text-[12rem] font-black text-yellow-400 opacity-80 transform -rotate-2 hover:rotate-0 transition-all duration-1000 cursor-default ${
              visibleElements.has("bottom-text") ? "opacity-80 scale-100" : "opacity-0 scale-75"
            }`}
          >
            Dobbie
          </h1>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="relative z-10 bg-blue-900 py-8 px-4 border-t-4 border-yellow-400" data-animate id="footer">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            visibleElements.has("footer") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logo and Copyright */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4 group">
                <img
                  src="/images/dobbie-logo.jpeg"
                  alt="Dobbie Logo"
                  className="w-10 h-10 rounded-full mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                />
                <span className="text-white font-black text-xl">DOBBIE</span>
              </div>
              <p className="text-white text-sm font-bold">© 2025 DOBBIE TOKEN. ALL RIGHTS RESERVED.</p>
              <p className="text-gray-300 text-xs mt-2">THE GOOD BOY OF BASE NETWORK</p>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h4 className="text-white font-bold text-lg mb-4">FOLLOW THE GOOD BOY</h4>
              <div className="flex justify-center space-x-4">
                <Button
                  size="sm"
                  className="bg-white text-blue-700 hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-blue-700 hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center md:text-right">{/* Removed disclaimer text */}</div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-blue-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-xs hover:text-white transition-colors duration-300 cursor-default">
              Made with ❤️ by Dobbie and his hooman | Not affiliated with any other projects |
              <span className="text-yellow-400 font-bold"> BARK RESPONSIBLY</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
