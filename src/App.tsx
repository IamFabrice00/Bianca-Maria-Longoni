import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data ---
const PROJECTS = [
  {
    id: 1,
    title: "Animal Essence – A Visual Study",
    images: [
      { id: "1/16", url: "https://images.unsplash.com/photo-1534361960057-19889dbad6bc?q=80&w=1000&auto=format&fit=crop" }, 
      { id: "2/16", url: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1000&auto=format&fit=crop" }, 
      { id: "3/16", url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop" }, 
      ...Array.from({ length: 13 }, (_, i) => ({
        id: `${i + 4}/16`,
        url: `https://images.unsplash.com/photo-${1550000000000 + i * 100000}?q=80&w=600&auto=format&fit=crop` 
      }))
    ]
  }
];

// --- Components ---

const Header = ({ darkMode, setDarkMode }: any) => (
  <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 py-6 px-6 md:px-12 flex justify-between items-baseline border-b border-gray-50">
    <div className="text-[17px] font-serif tracking-tight text-black">
      Bianca Maria Longoni
    </div>
    
    <div className="flex items-baseline gap-12">
      <nav className="hidden md:flex gap-4 text-[15px] font-serif">
        <span className="cursor-pointer hover:opacity-40 transition-opacity">List,</span>
        <span className="cursor-pointer text-gray-300">Overview,</span>
        <span className="cursor-pointer hover:opacity-40 transition-opacity font-bold">About</span>
      </nav>
      
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="text-[15px] font-serif text-black hover:opacity-40 transition-opacity whitespace-nowrap"
      >
        Dark mode {darkMode ? 'ON' : 'OFF'}
      </button>
    </div>
  </header>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="pt-32 pb-32 px-6 md:px-12">
        {PROJECTS.map((project) => (
          <section key={project.id} className="mb-24">
            <h2 className="text-[17px] font-serif mb-10 text-black uppercase tracking-tight">{project.title}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-10">
              {project.images.map((img) => (
                <div key={img.id} className="space-y-2 group cursor-pointer">
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img 
                      src={img.url} 
                      alt="" 
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="text-[11px] font-serif text-gray-900 opacity-80">
                    {img.id}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white z-50 py-4 px-6 border-t border-gray-100 flex justify-center gap-8 font-serif text-sm">
        <span>List</span>
        <span>About</span>
      </footer>
    </div>
  );
};

export default App;
