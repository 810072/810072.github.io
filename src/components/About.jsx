import { useTranslation } from 'react-i18next'
import useScrollAnimation from '../hooks/useScrollAnimation'
import '../styles/components/About.css'

export default function About() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="about section" id="about" ref={ref}>
      <div className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="section-title">
          <span className="section-number">01.</span>
          {t('about.title')}
        </h2>

        <div className="about-grid">
          <div className="about-card glass-card about-main-card">
            <div className="about-card-profile-header">
              <div className="about-mini-avatar">
                <span className="about-mini-icon">👤</span>
              </div>
              <div className="about-profile-info">
                <h3 className="about-profile-name">{t('hero.nameFirst', '최상진')}</h3>
                <span className="about-profile-role">&gt; Hardware-Aware Software Engineer</span>
              </div>
            </div>
            <div className="about-profile-divider"></div>
            <p className="about-text about-lead">{t('about.description')}</p>
            <p className="about-text">{t('about.description2')}</p>
            <p className="about-text">{t('about.description3')}</p>
          </div>

          <div className="about-card glass-card about-education-panel">
            <h3 className="about-education-title">{t('about.educationTitle', 'Education')}</h3>
            <div className="about-edu-item">
              <div className="about-edu-name">{t('about.school1', 'Seoul Robot Meister High School')}</div>
              <div className="about-edu-detail">{t('about.education1')}</div>
            </div>
            <div className="about-edu-item">
              <div className="about-edu-name">{t('about.school2', 'Hankyong National University')}</div>
              <div className="about-edu-detail">{t('about.education2')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
