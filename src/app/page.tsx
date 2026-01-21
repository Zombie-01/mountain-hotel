"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

const menuCategories = [
  { id: "tea", name: "Цай", nameEn: "Tea" },
  { id: "beer", name: "Пиво", nameEn: "Beer & Soft Drinks" },
  { id: "whiskey", name: "Виски", nameEn: "Whiskey" },
  { id: "vodka", name: "Водка", nameEn: "Vodka" },
  { id: "tequila", name: "Текила", nameEn: "Tequila & Liquor" },
  { id: "softdrinks", name: "Зөөлөн ундаа", nameEn: "Soft Drinks" },
];

const menuData = {
  tea: [
    { name: "Турк цай", description: "Гүц", price: "13,000₮" },
    { name: "Жүржтэй цай", description: "Гүц", price: "13,000₮" },
    { name: "Жасмин цэцэгтэй цай", description: "Гүц", price: "13,000₮" },
    { name: "Зөгийн балтай сүү", description: "Гүц", price: "13,000₮" },
    { name: "Мачатай цай", description: "Гүц", price: "13,000₮" },
  ],
  beer: [
    { name: "Corona Extra", description: "330мл", price: "13,000₮" },
    { name: "Heineken", description: "500мл", price: "13,000₮" },
    { name: "Asahi", description: "500мл", price: "12,000₮" },
    { name: "Kaltenberg", description: "500мл", price: "12,000₮" },
    { name: "Snow", description: "500мл", price: "12,000₮" },
    { name: "Tsingtao", description: "500мл", price: "12,000₮" },
    { name: "Krush", description: "500мл", price: "12,000₮" },
    { name: "Terra", description: "500мл", price: "12,000₮" },
    { name: "Tiger", description: "500мл", price: "10,000₮" },
    { name: "Алтан говь", description: "500мл", price: "10,000₮" },
  ],
  whiskey: [
    { name: "Hennessy", description: "Shot / 700мл", price: "57,500₮ / 400,000₮" },
    { name: "Glenmorengie", description: "Shot / 700мл", price: "57,500₮ / 400,000₮" },
    { name: "Camus", description: "Shot / 700мл", price: "57,500₮ / 400,000₮" },
    { name: "Matsui", description: "Shot / 700мл", price: "43,000₮ / 300,000₮" },
    { name: "St Remy", description: "Shot / 700мл", price: "43,000₮ / 300,000₮" },
    { name: "Teeling", description: "Shot / 700мл", price: "40,000₮ / 280,000₮" },
    { name: "Jack Daniels", description: "Shot / 1л", price: "28,000₮ / 280,000₮" },
    { name: "Ballentines", description: "Shot / 1л", price: "25,000₮ / 250,000₮" },
    { name: "John Barr", description: "Shot / 1л", price: "25,000₮ / 250,000₮" },
  ],
  vodka: [
    { name: "Beluga", description: "100мл / 1л", price: "40,000₮ / 400,000₮" },
    { name: "Grey Goose", description: "100мл / 1л", price: "38,000₮ / 380,000₮" },
    { name: "Соёмбо", description: "100мл / 700мл", price: "43,000₮ / 300,000₮" },
    { name: "Росы", description: "100мл / 1л", price: "30,000₮ / 300,000₮" },
    { name: "Absolut", description: "100мл / 1л", price: "21,000₮ / 210,000₮" },
    { name: "Finladia", description: "100мл / 1л", price: "20,000₮ / 200,000₮" },
    { name: "Zubrowka", description: "100мл / 700мл", price: "21,500₮ / 150,000₮" },
    { name: "Velvet", description: "100мл / 1л", price: "13,000₮ / 130,000₮" },
    { name: "Evok", description: "100мл / 700мл", price: "17,000₮ / 120,000₮" },
    { name: "Gold Chinggis", description: "100мл / 700мл", price: "14,000₮ / 100,000₮" },
    { name: "Eden", description: "100мл / 1л", price: "14,000₮ / 100,000₮" },
    { name: "Green Mark", description: "100мл / 700мл", price: "13,000₮ / 90,000₮" },
  ],
  tequila: [
    { name: "Sierra", description: "Shot / 700мл", price: "23,000₮ / 160,000₮" },
    { name: "Olmeca", description: "Shot / 700мл", price: "23,000₮ / 160,000₮" },
    { name: "Jägermeister", description: "Shot / 700мл", price: "24,000₮ / 180,000₮" },
    { name: "Sheridan's", description: "Shot / 700мл", price: "23,000₮ / 160,000₮" },
    { name: "Baileys", description: "Shot / 700мл", price: "22,000₮ / 150,000₮" },
  ],
  softdrinks: [
    { name: "Coca-Cola", description: "500мл", price: "6,000₮" },
    { name: "Sprite", description: "500мл", price: "6,000₮" },
    { name: "Fanta", description: "500мл", price: "6,000₮" },
    { name: "Juice", description: "500мл", price: "6,000₮" },
    { name: "Origluun", description: "500мл", price: "6,000₮" },
    { name: "Ara", description: "500мл", price: "3,000₮" },
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 }
};

function MountainLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="currentColor">
      <path d="M40 60 L60 25 L70 40 L80 20 L90 40 L100 25 L120 60 Z" />
      <circle cx="60" cy="65" r="2" />
      <circle cx="80" cy="65" r="2" />
      <circle cx="100" cy="65" r="2" />
      <text x="130" y="35" fontSize="12" fontWeight="600" letterSpacing="2">MOUNTAIN</text>
      <text x="130" y="50" fontSize="8" letterSpacing="3">—HOTEL—</text>
    </svg>
  );
}

function LuxuryDivider() {
  return (
    <motion.div 
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex items-center justify-center gap-4 my-8"
    >
      <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent via-[#d4a855] to-[#d4a855]" />
      <motion.div 
        initial={{ rotate: 0, scale: 0 }}
        whileInView={{ rotate: 45, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-2 h-2 bg-[#d4a855]"
      />
      <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent via-[#d4a855] to-[#d4a855]" />
    </motion.div>
  );
}

function AnimatedWavePattern() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
      <motion.svg 
        viewBox="0 0 1200 80" 
        className="w-full h-full" 
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <motion.path
            key={i}
            d={`M${i * 120} 70 Q${i * 120 + 30} 40 ${i * 120 + 60} 70 Q${i * 120 + 90} 100 ${i * 120 + 120} 70`}
            fill="none"
            stroke="#d4a855"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#d4a855] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WelcomeModal({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-8 py-16 max-w-lg mx-4"
      >
        <div className="absolute inset-0 border border-[#d4a855]/20 bg-gradient-to-b from-[#1a1510]/50 to-[#0a0805]/80 backdrop-blur-sm" />
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#d4a855]/60" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#d4a855]/60" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#d4a855]/60" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#d4a855]/60" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <MountainLogo className="h-24 mx-auto mb-8 text-[#d4a855] drop-shadow-[0_0_30px_rgba(212,168,85,0.4)]" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-3xl md:text-4xl font-light text-white mb-4 tracking-[0.2em]"
          >
            Тавтай морил
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[#d4a855]/70 tracking-[0.3em] uppercase text-xs mb-12"
          >
            Welcome to Mountain Hotel
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onClick={onEnter}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(212,168,85,0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 bg-gradient-to-r from-[#d4a855] via-[#e6c580] to-[#d4a855] 
                       text-[#0a0a0a] font-medium tracking-[0.3em] uppercase text-sm
                       shadow-[0_0_30px_rgba(212,168,85,0.3)] transition-all duration-500
                       hover:shadow-[0_0_50px_rgba(212,168,85,0.5)]"
          >
            Меню харах
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-white/30 text-xs mt-8 tracking-wider"
          >
            Press Enter or click to continue
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("tea");
  const [showWelcome, setShowWelcome] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const handleEnter = useCallback(() => {
    setShowWelcome(false);
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showWelcome) {
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showWelcome, handleEnter]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] overflow-x-hidden">
      <AnimatePresence>
        {showWelcome && <WelcomeModal onEnter={handleEnter} />}
      </AnimatePresence>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: showWelcome ? -100 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#d4a855]/10"
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <MountainLogo className="h-12 text-[#d4a855]" />
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-[0.3em] uppercase">
            {[
              { href: "#menu", label: "Меню" },
              { href: "#about", label: "Бидний тухай" },
              { href: "#contact", label: "Холбоо барих" },
            ].map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-white/60 hover:text-[#d4a855] transition-all duration-500 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4a855] group-hover:w-full transition-all duration-500" />
              </motion.a>
            ))}
          </div>
        </nav>
      </motion.header>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#0f0f0f] to-[#0a0805]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,85,0.15)_0%,_transparent_70%)]" />
          <GoldParticles />
        </motion.div>
        
        <motion.div
          style={{ y: heroY }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: showWelcome ? 0 : 1, scale: showWelcome ? 0.5 : 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <MountainLogo className="h-28 md:h-36 mx-auto mb-8 text-[#d4a855] drop-shadow-[0_0_30px_rgba(212,168,85,0.3)]" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: showWelcome ? 0 : 1, y: showWelcome ? 40 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 tracking-[0.2em]">
              <span className="bg-gradient-to-r from-[#e6c580] via-[#d4a855] to-[#b8924a] bg-clip-text text-transparent">
                Mountain
              </span>
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-[0.2em]">
              Hotel
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showWelcome ? 0 : 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-base md:text-lg text-[#d4a855]/80 mb-16 tracking-[0.5em] uppercase font-light"
          >
            Khovd, Mongolia
          </motion.p>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={showWelcome ? "hidden" : "visible"}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
          >
            {["Ресторан", "Зочид Буудал", "Лоунж"].map((item) => (
              <motion.span
                key={item}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(212,168,85,0.3)",
                  borderColor: "rgba(212,168,85,0.8)"
                }}
                className="px-8 py-3 text-[#d4a855]/90 text-sm tracking-[0.3em] uppercase border border-[#d4a855]/30 
                         bg-gradient-to-r from-[#d4a855]/5 to-transparent backdrop-blur-sm cursor-pointer
                         transition-all duration-500 hover:bg-[#d4a855]/10"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showWelcome ? 0 : 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.a 
            href="#menu" 
            className="block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-[#d4a855]/50 rounded-full flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-1.5 bg-[#d4a855] rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.a>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
      </section>

      <section id="menu" className="relative py-32 px-6 bg-gradient-to-b from-[#0f0f0f] via-[#151210] to-[#0f0f0f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,85,0.08)_0%,_transparent_50%)]" />
        
        <AnimatedSection className="max-w-5xl mx-auto relative z-10">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <motion.div
              variants={scaleIn}
              className="inline-block mb-8"
            >
              <MountainLogo className="h-20 mx-auto text-[#d4a855] drop-shadow-[0_0_20px_rgba(212,168,85,0.2)]" />
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-light tracking-[0.15em] mb-4"
            >
              <span className="bg-gradient-to-r from-white via-[#e6c580] to-white bg-clip-text text-transparent">
                Ундааны Цэс
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-[#d4a855]/60 tracking-[0.5em] uppercase text-xs">
              Beverage Menu
            </motion.p>
            
            <LuxuryDivider />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {menuCategories.map((cat) => (
              <motion.button
                key={cat.id}
                variants={fadeInUp}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 text-xs tracking-[0.3em] uppercase transition-all duration-500 relative overflow-hidden ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#d4a855] via-[#e6c580] to-[#d4a855] text-[#0a0a0a] shadow-[0_0_30px_rgba(212,168,85,0.4)]"
                    : "bg-transparent text-[#d4a855]/70 border border-[#d4a855]/20 hover:border-[#d4a855]/50 hover:text-[#d4a855]"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#d4a855] via-[#e6c580] to-[#d4a855]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-gradient-to-br from-[#1a1510]/80 via-[#0f0f0f]/90 to-[#1a1510]/80 
                         backdrop-blur-xl p-10 md:p-16 border border-[#d4a855]/10
                         shadow-[0_0_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(212,168,85,0.1)]"
            >
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#d4a855]/30" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#d4a855]/30" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-[#d4a855]/30" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#d4a855]/30" />

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-6 right-6 text-[#d4a855]/30 text-xs tracking-[0.5em] uppercase writing-vertical"
              >
                {menuCategories.find((c) => c.id === activeCategory)?.nameEn}
              </motion.div>

              <div className="space-y-8">
                {menuData[activeCategory as keyof typeof menuData]?.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                    className="flex items-baseline gap-4 group cursor-pointer"
                  >
                    <div className="flex-1">
                      <motion.h3 
                        className="text-xl md:text-2xl text-white/90 font-light tracking-wide 
                                   group-hover:text-[#d4a855] transition-colors duration-500"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.name}
                      </motion.h3>
                      <p className="text-white/30 text-sm mt-1 tracking-wider">{item.description}</p>
                    </div>
                    <div className="flex-shrink-0 flex-1 max-w-[100px] md:max-w-[250px] relative h-px">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#d4a855]/0 via-[#d4a855]/30 to-[#d4a855]/0" />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#d4a855]/0 via-[#d4a855] to-[#d4a855]/0"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <motion.span 
                      className="text-[#d4a855] font-light tracking-wider text-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.price}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              <AnimatedWavePattern />
            </motion.div>
          </AnimatePresence>
        </AnimatedSection>
      </section>

      <section id="about" className="relative py-32 px-6 bg-[#0a0805] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,168,85,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(212,168,85,0.05)_0%,_transparent_40%)]" />
        </div>

        <AnimatedSection className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft}>
              <motion.span 
                variants={fadeInUp}
                className="text-[#d4a855]/60 tracking-[0.5em] uppercase text-xs mb-6 block"
              >
                About Us
              </motion.span>
              
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-light text-white tracking-wide mb-8"
              >
                Буудлын{" "}
                <span className="bg-gradient-to-r from-[#d4a855] to-[#e6c580] bg-clip-text text-transparent">
                  Мэдээлэл
                </span>
              </motion.h2>

              <LuxuryDivider />
              
              <motion.p 
                variants={fadeInUp}
                className="text-white/50 leading-[2] mb-6 text-lg font-light"
              >
                Ховд хотын төв хэсэгт, нутгийн удирдлагын ордны яг хойно, ёртөнцийн зүйн хувьд таатай 
                байршилд байрлах энэхүү зочид буудал нь хотын чухал байгууллага, үйлчилгээний төвүүдтэй 
                ойрхон тул зочдын цаг, аа тухыг хэмнэх давуу талтай.
              </motion.p>
              
              <motion.p 
                variants={fadeInUp}
                className="text-white/50 leading-[2] mb-10 text-lg font-light"
              >
                Олон улсын 3 одны стандартын шаардлагыг бүрэн хангасан энэхүү зочид буудал нь тав тух, 
                тансаг байдлыг орчин үеийн шийдэлтэй хослуулсан бөгөөд бизнес болон амралтын зорилготой 
                зочдод аль алинд нь тохиромжтой.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex items-center gap-6">
                <div className="flex gap-2">
                  {[1, 2, 3].map((star) => (
                    <motion.svg 
                      key={star} 
                      className="w-6 h-6 text-[#d4a855]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8 + star * 0.15, duration: 0.5 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <span className="text-white/30 text-sm tracking-[0.3em] uppercase">3 Star Hotel</span>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a855] via-[#e6c580] to-[#b8924a] p-[2px]">
                  <div className="w-full h-full bg-[#0a0805] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,168,85,0.1)_0%,_transparent_70%)]" />
                    <MountainLogo className="h-40 text-[#d4a855] relative z-10 drop-shadow-[0_0_40px_rgba(212,168,85,0.3)]" />
                  </div>
                </div>
                <motion.div 
                  className="absolute -inset-4 border border-[#d4a855]/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div 
                  className="absolute -inset-8 border border-[#d4a855]/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      <section id="contact" className="relative py-32 px-6 bg-gradient-to-b from-[#0a0805] to-[#0f0f0f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,168,85,0.08)_0%,_transparent_60%)]" />
        
        <AnimatedSection className="max-w-5xl mx-auto relative z-10">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <motion.span 
              variants={fadeInUp}
              className="text-[#d4a855]/60 tracking-[0.5em] uppercase text-xs mb-6 block"
            >
              Contact
            </motion.span>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-light tracking-[0.1em] mb-4"
            >
              <span className="bg-gradient-to-r from-white via-[#e6c580] to-white bg-clip-text text-transparent">
                Холбоо Барих
              </span>
            </motion.h2>
            
            <LuxuryDivider />
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                ),
                title: "Хаяг",
                text: "Ховд хот, Монгол улс"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                ),
                title: "Утас",
                text: "+976 xxxx xxxx"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Цагийн хуваарь",
                text: "24/7 Нээлттэй"
              }
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(212,168,85,0.1)" }}
                className="relative bg-gradient-to-b from-[#1a1510]/50 to-transparent backdrop-blur-sm p-10 
                           border border-[#d4a855]/10 text-center group transition-all duration-500"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#d4a855]/30 flex items-center justify-center
                             bg-gradient-to-b from-[#d4a855]/10 to-transparent group-hover:border-[#d4a855]/60 transition-all duration-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg className="w-7 h-7 text-[#d4a855]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </motion.div>
                <h3 className="text-white font-light text-lg mb-3 tracking-wider">{item.title}</h3>
                <p className="text-white/40 text-sm tracking-wide">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedWavePattern />
      </section>

      <footer className="relative bg-[#050505] py-16 px-6 border-t border-[#d4a855]/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <MountainLogo className="h-14 mx-auto mb-8 text-[#d4a855] opacity-60" />
          <p className="text-white/20 text-xs tracking-[0.4em] uppercase">
            © 2026 Mountain Hotel Mongolia. All rights reserved.
          </p>
        </motion.div>
      </footer>

      <style jsx global>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d4a855, #b8924a);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #e6c580, #d4a855);
        }
      `}</style>
    </div>
  );
}
