import { useTheme } from '../context/ThemeContext'

const Home = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Theme is: {isDark ? 'Dark' : 'Light'}
      </h1>
      <button
        onClick={toggleTheme}
        className="px-6 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold"
      >
        Toggle Theme
      </button>
    </div>
  )
}

export default Home