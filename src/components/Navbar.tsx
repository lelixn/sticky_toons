
import React from "react";
import { Search, Palette } from "lucide-react";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";
import Pin from "./Pin";

type NavbarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-white dark:bg-background shadow-sm p-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center">
        <Pin className="text-toon-orange mr-2" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-toon-orange to-toon-purple bg-clip-text text-transparent">
          WRIT&#123;•&#34;•&#125;OS
        </h1>
      </div>
      
      <div className="relative max-w-sm mx-4 flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search notes..."
          className="pl-8 pr-4 py-2 w-full rounded-full"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Palette size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <img 
          src="/lovable-uploads/e95ae6f5-a026-4cf4-97c8-36583027145a.png" 
          alt="Theme Toggle" 
          onClick={toggleTheme}
          className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
};

export default Navbar;
