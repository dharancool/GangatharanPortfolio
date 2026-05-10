import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { HiSun, HiMoon, HiSearch, HiX, HiMenu } from 'react-icons/hi'

const navLinks = [
  { label: 'Home',         path: '/' },
  { label: 'About',        path: '/about' },
  { label: 'Experience',   path: '/experience' },
  { label: 'Skills',       path: '/skills' },
  { label: 'Projects',     path: '/projects' },
  { label: 'Publications', path: '/publications' },
  { label: 'Contact',      path: '/contact' },
]

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = navLinks.filter(link =>
    link.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hover:opacity-70 transition-opacity">
          Dharan
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 list-none">
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-black dark:hover:text-white
                  ${location.pathname === link.path
                    ? 'text-black dark:text-white border-b-2 border-black dark:border-white pb-0.5'
                    : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side — Search + Theme + Hamburger */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="relative">
            <button
              onClick={() => { setSearchOpen(p => !p); setSearchQuery('') }}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              {searchOpen ? <HiX size={18} /> : <HiSearch size={18} />}
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-11 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search sections..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-transparent outline-none border-b border-gray-200 dark:border-gray-700"
                />
                <ul className="max-h-48 overflow-y-auto">
                  {filtered.length > 0 ? filtered.map(link => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )) : (
                    <li className="px-4 py-3 text-sm text-gray-400">No results</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="md:hidden p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <ul className="flex flex-col px-6 py-4 gap-4 list-none">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium transition-colors
                    ${location.pathname === link.path
                      ? 'text-black dark:text-white font-semibold'
                      : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar