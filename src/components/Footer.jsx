import { useTranslation } from 'react-i18next'
import { SiGithub } from 'react-icons/si'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-copyright">
            © {year} {t('footer.name', '최상진')}. {t('footer.rights', 'All rights reserved.')}
          </p>
          <p className="footer-built">
            {t('footer.built', 'Built with React + Vite')}
          </p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/810072"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
            aria-label="GitHub"
          >
            <SiGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}
