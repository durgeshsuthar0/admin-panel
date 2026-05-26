import { Sun, Moon, Bell, Search, Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Header({ collapsed, onToggleCollapse, onMenuOpen }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 fixed top-0 right-0 z-10 flex items-center gap-4 px-5
      bg-white/80 dark:bg-gray-950/80 backdrop-blur-md
      border-b border-gray-100 dark:border-gray-800
      transition-all duration-300"
      style={{ left: `var(--sidebar-left, 0)` }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400">
        <Search size={15} />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-sm outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 w-full"
        />
        <kbd className="text-[10px] font-mono bg-gray-200 dark:bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-md shrink-0">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <Sun size={15} className={`transition-all ${theme === 'dark' ? 'opacity-40' : 'text-amber-500'}`} />
          <span className="hidden sm:inline text-xs">{theme === 'light' ? 'Light' : 'Dark'}</span>
          <Moon size={15} className={`transition-all ${theme === 'light' ? 'opacity-40' : 'text-brand-400'}`} />
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white dark:ring-gray-950" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 cursor-pointer shadow-md shadow-brand-500/20 shrink-0" />
      </div>
    </header>
  )
}
