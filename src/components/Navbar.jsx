import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import '../styles/components/Navbar.css'

const navItems = ['about', 'skills', 'projects', 'timeline', 'awards']
const languages = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const langRef = useRef(null)

  // 언어 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // 현재 섹션 감지
      const sections = navItems.map(id => document.getElementById(id))
      const scrollPos = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const changeLang = (code) => {
    i18n.changeLanguage(code)
    setLangMenuOpen(false)
  }

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a className="navbar-logo" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">CSJ</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <li key={item}>
              <button
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollTo(item)}
              >
                {t(`nav.${item}`)}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="lang-switcher" ref={langRef}>
            <button
              className="lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Switch language"
            >
              <span className="lang-flag">{currentLang.flag}</span>
              <span className="lang-code">{currentLang.code.toUpperCase()}</span>
            </button>
            {langMenuOpen && (
              <div className="lang-dropdown">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                    onClick={() => changeLang(lang.code)}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>
    </nav>
  )
}
