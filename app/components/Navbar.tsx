"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Pokédex App
        </Link>
        <div className="flex space-x-6 items-center">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
          <Link href="/pokedex" className="text-white hover:underline">
            Pokédex
          </Link>
          <button
            onClick={() => setIsDark(!isDark)}
            className="bg-white/30 text-white px-3 py-1 rounded-md hover:bg-white/50 transition"
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
