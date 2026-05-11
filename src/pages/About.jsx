import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { personalInfo, education } from '../constants/data'
import { FiMapPin, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

const About = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

        {/* Page Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
            Get to know me
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            About Me
          </h1>
        </motion.div>

        {/* Top Section — Photo + Bio */}
        <div className="flex flex-col md:flex-row gap-12 mb-20 items-start">

          {/* Tilt Card Photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex-shrink-0 mx-auto md:mx-0"
          >
            <Tilt
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.03}
              transitionSpeed={400}
              className="w-64 h-64 md:w-72 md:h-72"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
                <img
                  src="/profile.jpg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Tilt>
          </motion.div>

          {/* Bio */}
          <div className="flex-1">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
            >
              {personalInfo.name}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-gray-500 dark:text-gray-400 font-medium mb-6"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-base"
            >
              {personalInfo.about}
            </motion.p>

            {/* Quick Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex flex-col gap-3"
            >
              {[
                { icon: <FiMapPin size={15} />, text: 'Boston, MA' },
                { icon: <FiMail size={15} />,    text: personalInfo.email,    href: `mailto:${personalInfo.email}` },
                { icon: <FiGithub size={15} />,  text: 'github.com/dharancool', href: personalInfo.github },
                { icon: <FiLinkedin size={15} />, text: 'linkedin.com/in/gangatharan08', href: personalInfo.linkedin },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-gray-400 dark:text-gray-500">{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="hover:text-gray-900 dark:hover:text-white transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Education
          </h2>

          <div className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-8 flex flex-col gap-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={7 + i}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[2.85rem] top-1 w-4 h-4 rounded-full bg-gray-900 dark:bg-white border-4 border-white dark:border-gray-900" />

                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full whitespace-nowrap">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {edu.location}
                  </p>
                  {edu.highlights?.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {edu.highlights.map((h, j) => (
                        <li key={j} className="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  )
}

export default About