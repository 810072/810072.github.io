import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiChevronDown } from 'react-icons/hi'
import '../styles/components/Hero.css'

const roles = {
  ko: ['소프트웨어 엔지니어', 'HW 기반 SW 개발자', '융합형 엔지니어'],
  en: ['Software Engineer', 'HW-Aware Developer', 'Convergence Engineer'],
  ja: ['ソフトウェアエンジニア', 'HW基盤SW開発者', '融合型エンジニア'],
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')

  const currentRoles = roles[i18n.language] || roles.ko

  useEffect(() => {
    const currentWord = currentRoles[roleIndex % currentRoles.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)

        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setDisplayText(currentWord.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)

        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setRoleIndex(prev => prev + 1)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex, currentRoles])

  // 언어 변경 시 타이핑 리셋
  useEffect(() => {
    setRoleIndex(0)
    setCharIndex(0)
    setIsDeleting(false)
    setDisplayText('')
  }, [i18n.language])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="hero-greeting">{t('hero.greeting')}</p>
        <h1 className="hero-name">
          <span className="hero-name-first">{t('hero.nameFirst', '최상진')}</span>
        </h1>
        <div className="hero-role-wrapper">
          <span className="hero-role-prefix">&gt; </span>
          <span className="hero-role">{displayText}</span>
          <span className="hero-cursor">|</span>
        </div>
        <p className="hero-description">{t('hero.description')}</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={scrollToAbout}>
            {t('hero.cta')}
          </button>
          <a
            className="btn-secondary"
            href="https://github.com/810072"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={scrollToAbout}>
        <span className="scroll-text">{t('hero.scroll', 'Scroll Down')}</span>
        <HiChevronDown className="scroll-arrow" />
      </div>
    </section>
  )
}
