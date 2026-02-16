import React, { useState } from 'react';
import { motion } from 'framer-motion';

const items = [
  { id: 1, title: 'Neon Pulse Agency', year: '2024', img: 'https://images.unsplash.com/photo-1767749505538-23e71d1af2c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, title: 'Midnight Canvas', year: '2024', img: 'https://images.unsplash.com/photo-1767627651257-f7ed7a0d8146?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, title: 'Echo Digital Lab', year: '2023', img: 'https://images.unsplash.com/photo-1768834605062-4eef74ce4683?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, title: 'Skiper Creative ® Co', year: '2023', img: 'https://images.unsplash.com/photo-1769489086379-dcbbb66e43a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2OXx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1761850648640-2ee5870ee883?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4MHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1768813282031-2aec62eee8b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5Mnx8fGVufDB8fHx8fA%3D%3D' },
  { id: 7, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1690888650084-fca303db8518?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D' },
  { id: 8, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1768676972929-88f7b61b98e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU3fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D' },
  { id: 9, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1768409234914-96f61529b7e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D' },
  { id: 10, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1768663319852-d2a2648f3950?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D' },
  { id: 11, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1768471584773-2d532c5c87bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D' },
  { id: 12, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1769117438355-a418184cddcf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' },
  { id: 13, title: 'Cosmic Brew Studios', year: '2024', img: 'https://images.unsplash.com/photo-1545056453-f0359c3df6db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym93bGluZ3xlbnwwfHwwfHx8MA%3D%3D' },
];

const AccordionSlider = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="flex h-[600px] w-full gap-1 p-4 overflow-hidden">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="relative h-full cursor-pointer overflow-hidden rounded-lg border-l border-white"
          initial={false}
          animate={{
            // When expanded, give it much more width
            flex: expandedIndex === index ? 4 : 0.5,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          onMouseEnter={() => setExpandedIndex(index)}
        >
          {/* Background Image */}
          <motion.img
            src={item.img}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover brightness-75"
            animate={{
              scale: expandedIndex === index ? 1.05 : 1,
              filter: expandedIndex === index ? "blur(0px) brightness(1)" : "blur(2px) brightness(0.5)"
            }}
          />

          {/* Vertical Text Label */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p 
              style={{ writingMode: 'vertical-rl' }} 
              className="rotate-180 text-xl font-medium text-white tracking-tighter uppercase"
            >
              {item.title}
            </p>
          </div>

          {/* Year Badge (Visible when expanded) */}
          {expandedIndex === index && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-6 text-xs text-white bg-black/20 backdrop-blur-md px-2 py-1 rounded"
            >
              {item.year}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AccordionSlider;