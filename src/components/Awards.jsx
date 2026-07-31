import { useTranslation } from 'react-i18next'
import { HiStar, HiBadgeCheck } from 'react-icons/hi'
import useScrollAnimation from '../hooks/useScrollAnimation'
import awards from '../data/awards'
import '../styles/components/Awards.css'

export default function Awards() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="awards section" id="awards" ref={ref}>
      <div className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="section-title">
          <span className="section-number">05.</span>
          {t('awards.title')}
        </h2>

        <div className="awards-grid">
          {awards.map((award, idx) => (
            <div
              key={award.id}
              className="award-card glass-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="award-icon-wrapper">
                {award.type === 'award'
                  ? <HiStar className="award-icon" />
                  : <HiBadgeCheck className="award-icon cert" />
                }
              </div>
              <div className="award-content">
                <h3 className="award-title">{t(award.titleKey)}</h3>
                <p className="award-org">{t(award.organizationKey)}</p>
                <p className="award-date">{t(award.dateKey)}</p>
                {award.descriptionKey && (
                  <p className="award-desc">{t(award.descriptionKey)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
