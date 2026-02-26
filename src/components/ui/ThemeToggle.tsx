"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // This makes the menu close if the user clicks anywhere else on the screen!
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md bg-[#0a0a0a]/80 backdrop-blur-md border border-gray-800 text-gray-400 hover:text-white transition-colors focus:outline-none"
        aria-label="Toggle theme"
      >
        <Moon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-32 bg-[#0a0a0a] border border-gray-800 rounded-lg shadow-2xl overflow-hidden py-1">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            Light
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            Dark
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            System
          </button>
        </div>
      )}
    </div>
  );
};