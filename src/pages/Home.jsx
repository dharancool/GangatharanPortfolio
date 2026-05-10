import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import { personalInfo } from '../constants/data'

const Home = () => {
  const [commits, setCommits] = useState([])
  const [loadingCommits, setLoadingCommits] = useState(true)

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/dharancool/events/public?per_page=10`
        )
        const data = await res.json()

        const pushEvents = data
          .filter(event => event.type === 'PushEvent')
          .slice(0, 5)
          .map(event => ({
            repo: event.repo.name,
            message: event.payload.commits?.[0]?.message || 'No message',
            date: new Date(event.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
          }))

        setCommits(pushEvents)
      } catch (err) {
        console.error('GitHub fetch failed:', err)
      } finally {
        setLoadingCommits(false)
      }
    }

    fetchCommits()
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-lg mb-2 font-medium"
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
        >
          {personalInfo.displayName}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold text-gray-400 mb-8"
        >
          <Typewriter
            options={{
              strings: [
                'Software Developer',
                'ML Engineer',
                'Graduate Student @ Northeastern',
                'Open to Internships & Co-ops',
              ],
              autoStart: true,
              loop: true,
              delay: 60,
              deleteSpeed: 30,
            }}
          />
        </motion.div>

        {/* About */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mb-10 leading-relaxed"
        >
          {personalInfo.about}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <a
            href={personalInfo.resumeUrl}
            download="Gangatharan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold text-sm hover:scale-105 hover:brightness-110 transition-all duration-200"
          >
            <FiDownload size={16} />
            Download CV
          </a>

          <a
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full font-semibold text-sm hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-5 mb-20"
        >
          {[
            { icon: <FiGithub size={20} />, href: personalInfo.github },
            { icon: <FiLinkedin size={20} />, href: personalInfo.linkedin },
            { icon: <FiMail size={20} />, href: `mailto:${personalInfo.email}` },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:scale-110 hover:border-gray-400 transition-all duration-200"
            >
              {item.icon}
            </a>
          ))}
        </motion.div>

        {/* GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Recent GitHub Activity
          </h2>

          {loadingCommits ? (
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          ) : commits.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {commits.map((commit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 max-w-xs"
                >
                  <p className="text-xs text-gray-400 mb-1 font-mono">
                    {commit.repo.split('/')[1]} · {commit.date}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug line-clamp-2">
                    {commit.message}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No recent activity found.</p>
          )}
        </motion.div>

      </div>
    </main>
  )
}

export default Home