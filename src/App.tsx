import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Camera } from 'lucide-react';

// --- Data ---
const PROJECTS = [
  {
    id: 1,
    category: "Humans",
    title: "Human Essence – Life Archive",
    images: [
      { id: "1/12", url: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=1000&auto=format&fit=crop" }, // Portrait of Black Woman
      { id: "2/12", url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop" }, // Children playing
      { id: "3/12", url: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1000&auto=format&fit=crop" }, // Artistic portrait
      { id: "4/12", url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop" }, // Kids in motion
      { id: "5/12", url: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?q=80&w=1000&auto=format&fit=crop" }, // Portrait
      { id: "6/12", url: "https://images.unsplash.com/photo-1513360371669-4ada307f933b?q=80&w=1000&auto=format&fit=crop" }, // Child laughing
      { id: "7/12", url: "https://images.unsplash.com/photo-1503940112854-21c876ed3361?q=80&w=1000&auto=format&fit=crop" }, // Playing outdoors
      { id: "8/12", url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1000&auto=format&fit=crop" }  // Portrait
    ]
  },
  {
    id: 2,
    category: "Animals",
    title: "Animal Essence – A Visual Study",
    images: [
      { id: "1/16", url: "https://images.unsplash.com/photo-1534361960057-19889dbad6bc?q=80&w=1000&auto=format&fit=crop" }, 
      { id: "2/16", url: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1000&auto=format&fit=crop" }, 
      { id: "3/16", url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop" }, 
      { id: "4/16", url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop" }
    ]
  },
  {
    id: 3,
    category: "Industrial",
    title: "Atomic Ski – Process",
    images: [
      { id: "1/8", url: "https://images.unsplash.com/photo-1551698618-1fed5d978028?q=80&w=1000&auto=format&fit=crop" },
      { id: "2/8", url: "https://images.unsplash.com/photo-1520110120835-c96a9efaf59a?q=80&w=1000&auto=format&fit=crop" }
    ]
  }
];

const JOURNAL_POSTS = [
  {
    id: 1,
    date: "MAR 12, 2024",
    title: "Human Connections",
    preview: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=800&auto=format&fit=crop",
    excerpt: "Capturing the raw beauty of human expression in its most natural form."
  },
  {
    id: 2,
    date: "FEB 28, 2024",
    title: "The Joy of Play",
    preview: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
    excerpt: "Unfiltered moments of children discovering the world through movement."
  }
];

// --- Components ---

const CustomCursor = ({ cursorText, darkMode }: { cursorText: string, darkMode: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    const targets = document.querySelectorAll('.hover-target');
    targets.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      animate={{ x: position.x - 4, y: position.y - 4 }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      <motion.div 
        className={`${darkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full flex items-center justify-center overflow-hidden`}
        animate={{ 
          width: isHovering ? 80 : 8, 
          height: isHovering ? 80 : 8,
          opacity: 1
        }}
      >
        {isHovering && (
          <span className="text-[10px] font-serif uppercase tracking-widest font-bold">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

const Lightbox = ({ image, onClose, darkMode }: { image: any, onClose: () => void, darkMode: boolean }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`fixed inset-0 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} z-[1000] flex flex-col items-center justify-center p-8 md:p-20`}
  >
    <button onClick={onClose} className="absolute top-8 right-8 hover:opacity-40 transition-opacity">
      <X size={32} strokeWidth={1} />
    </button>
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
      <motion.img 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={image.url} 
        className="max-w-full max-h-[80vh] object-contain"
      />
      <div className={`text-[14px] font-serif tracking-widest ${darkMode ? 'opacity-40' : 'text-gray-400'} uppercase`}>
        {image.id} — Archive Selection
      </div>
    </div>
  </motion.div>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activePage, setActivePage] = useState('Archive');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-700`}>
      <CustomCursor cursorText={activePage === 'Journal' ? 'READ' : 'VIEW'} darkMode={darkMode} />
      
      <AnimatePresence>
        {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} darkMode={darkMode} />}
      </AnimatePresence>

      <header className={`fixed top-0 left-0 w-full ${darkMode ? 'bg-black/90 border-white/5' : 'bg-white/90 border-black/5'} backdrop-blur-md z-50 py-6 px-6 md:px-12 flex justify-between items-baseline border-b`}>
        <div className="text-[17px] font-serif tracking-tight cursor-pointer" onClick={() => setActivePage('Archive')}>
          Bianca Maria Longoni
        </div>
        
        <div className="flex items-baseline gap-12">
          <nav className="hidden md:flex gap-6 text-[15px] font-serif">
            {['Archive', 'Journal', 'About'].map(item => (
              <button 
                key={item}
                onClick={() => setActivePage(item)}
                className={`transition-all ${activePage === item ? 'font-bold underline underline-offset-8' : 'opacity-40 hover:opacity-100'}`}
              >
                {item}
              </button>
            ))}
          </nav>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="text-[15px] font-serif hover:opacity-40 transition-opacity border px-3 py-1 rounded-full border-current"
          >
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </header>

      <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1800px] mx-auto">
        
        <AnimatePresence mode="wait">
          {activePage === 'Archive' && (
            <motion.div 
              key="archive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-12 flex gap-8 font-serif text-[13px] uppercase tracking-widest opacity-60">
                {['All', 'Humans', 'Animals', 'Industrial'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`hover:opacity-100 transition-all ${filter === f ? (darkMode ? 'text-white border-white' : 'text-black border-black') + ' font-bold border-b' : ''}`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {filteredProjects.map((project) => (
                <section key={project.id} className="mb-24">
                  <h2 className="text-[17px] font-serif mb-10 opacity-90">{project.title}</h2>
                  <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-14 gap-x-3 gap-y-8">
                    {project.images.map((img) => (
                      <motion.div 
                        key={img.id}
                        layout
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-1 group"
                        onClick={() => setSelectedImage(img)}
                      >
                        <div className={`aspect-square ${darkMode ? 'bg-white/5' : 'bg-gray-50'} overflow-hidden hover-target cursor-none`}>
                          <img 
                            src={img.url} 
                            alt="" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="text-[9px] font-serif opacity-30">{img.id}</div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              ))}
            </motion.div>
          )}

          {activePage === 'Journal' && (
            <motion.div 
              key="journal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {JOURNAL_POSTS.map(post => (
                <div key={post.id} className="space-y-6 group hover-target cursor-none">
                  <div className={`aspect-[16/10] overflow-hidden ${darkMode ? 'grayscale opacity-70 hover:opacity-100' : 'grayscale'} hover:grayscale-0 transition-all duration-1000`}>
                    <img src={post.preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-serif opacity-40 uppercase tracking-widest">{post.date}</span>
                    <h3 className="text-2xl font-serif italic">{post.title}</h3>
                    <p className="text-xs font-serif opacity-60 leading-relaxed max-w-sm">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activePage === 'About' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto pt-20 text-center space-y-12"
            >
              <h2 className="text-5xl font-serif italic">The unseen through the lens.</h2>
              <p className="text-lg font-serif opacity-60 leading-relaxed">
                Bianca Maria Longoni is a visual artist capturing the intersection of organic life and industrial process. Her archive is a testament to the silent dialogue between subject and environment.
              </p>
              <div className={`pt-12 border-t ${darkMode ? 'border-white/10' : 'border-black/10'} flex justify-center gap-12 font-serif text-sm`}>
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Inquiry</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={`md:hidden fixed bottom-0 left-0 w-full ${darkMode ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/10'} backdrop-blur-md py-4 px-6 border-t flex justify-center gap-8 font-serif text-[12px] uppercase tracking-widest`}>
        <button onClick={() => setActivePage('Archive')}>Archive</button>
        <button onClick={() => setActivePage('Journal')}>Journal</button>
      </footer>
    </div>
  );
};

export default App;
