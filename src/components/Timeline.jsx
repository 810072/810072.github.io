import { useTranslation } from 'react-i18next'
import { HiAcademicCap, HiCode, HiStar, HiBriefcase, HiShieldCheck } from 'react-icons/hi'
import useScrollAnimation from '../hooks/useScrollAnimation'
import timeline from '../data/timeline'
import '../styles/components/Timeline.css'

const typeIcons = {
  education: HiAcademicCap,
  project: HiCode,
  award: HiStar,
  work: HiBriefcase,
  military: HiShieldCheck,
}

export default function Timeline() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="timeline-section section" id="timeline" ref={ref}>
      <div className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="section-title">
          <span className="section-number">04.</span>
          {t('timeline.title')}
        </h2>

        <div className="timeline">
          <div className="timeline-line"></div>
          {timeline.map((event, idx) => {
            const Icon = typeIcons[event.type] || HiCode
            return (
              <div
                key={event.id}
                className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="timeline-node">
                  <Icon className="timeline-node-icon" />
                </div>
                <div className="timeline-card glass-card">
                  <span className="timeline-date">{event.year}</span>
                  <h3 className="timeline-card-title">{t(event.titleKey)}</h3>
                  <p className="timeline-card-desc">{t(event.descriptionKey)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
