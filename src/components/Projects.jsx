import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiX } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'
import useScrollAnimation from '../hooks/useScrollAnimation'
import projects from '../data/projects'
import '../styles/components/Projects.css'

export default function Projects() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter)

  // ESC 키로 모달 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      const handleEsc = (e) => {
        if (e.key === 'Escape') setSelectedProject(null)
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <section className="projects section" id="projects" ref={ref}>
      <div className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="section-title">
          <span className="section-number">03.</span>
          {t('projects.title')}
        </h2>

        <div className="project-filters">
          {['all', 'team', 'personal'].map(f => (
            <button
              key={f}
              className={`project-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {t(`projects.filter.${f}`)}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className="project-card glass-card"
              style={{ animationDelay: `${idx * 0.15}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image-area">
                {project.video ? (
                  <video
                    className="project-media"
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : project.image ? (
                  <img
                    className="project-media"
                    src={project.image}
                    alt={t(project.titleKey)}
                    loading="lazy"
                  />
                ) : (
                  <div className="project-image-placeholder" />
                )}
                <span className="project-type-badge">
                  {t(`projects.filter.${project.type}`)}
                </span>
              </div>
              <div className="project-info">
                <h3 className="project-title">{t(project.titleKey)}</h3>
                <p className="project-desc">{t(project.descriptionKey)}</p>
                <div className="project-tech-tags">
                  {project.techStack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={e => e.stopPropagation()}
                    >
                      <SiGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <HiX />
            </button>
            <div className="modal-content">
              {selectedProject.achievementKey && (
                <div className="modal-achievement">
                  {t(selectedProject.achievementKey)}
                </div>
              )}
              <h2 className="modal-title">{t(selectedProject.titleKey)}</h2>
              <p className="modal-role">
                <strong>{t('projects.role')}:</strong> {t(selectedProject.roleKey)}
              </p>

              {/* 배경 및 동기 */}
              {selectedProject.backgroundKey && (
                <div className="modal-case-section">
                  <h3 className="modal-case-heading">
                    <span className="case-icon">📋</span>
                    {t('projects.sectionBackground', '배경 및 동기')}
                  </h3>
                  <p className="modal-case-text">{t(selectedProject.backgroundKey)}</p>
                </div>
              )}

              {/* 역할 및 접근 방식 */}
              {selectedProject.approachKey && (
                <div className="modal-case-section">
                  <h3 className="modal-case-heading">
                    <span className="case-icon">🔧</span>
                    {t('projects.sectionApproach', '역할 및 접근 방식')}
                  </h3>
                  <p className="modal-case-text">{t(selectedProject.approachKey)}</p>
                </div>
              )}

              {/* 주요 구현 내용 */}
              {selectedProject.featuresKey && (() => {
                const features = t(selectedProject.featuresKey, { returnObjects: true })
                const featureList = Array.isArray(features) ? features : (typeof features === 'string' ? [features] : [])
                return featureList.length > 0 && (
                  <div className="modal-case-section modal-features-section">
                    <h3 className="modal-case-heading">
                      <span className="case-icon">⚡</span>
                      {t('projects.keyFeatures', '주요 구현 내용')}
                    </h3>
                    <ul className="modal-features-list">
                      {featureList.map((feat, i) => (
                        <li key={i} className="modal-feature-item">
                          <span className="feature-bullet">&gt;</span>
                          <span className="feature-text">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })()}

              {/* 결과 및 배운 점 */}
              {selectedProject.resultsKey && (
                <div className="modal-case-section modal-results-section">
                  <h3 className="modal-case-heading">
                    <span className="case-icon">📊</span>
                    {t('projects.sectionResults', '결과 및 배운 점')}
                  </h3>
                  <p className="modal-case-text">{t(selectedProject.resultsKey)}</p>
                </div>
              )}

              <div className="modal-tech">
                <strong>{t('projects.techStack')}:</strong>
                <div className="project-tech-tags">
                  {selectedProject.techStack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-github-btn"
                >
                  <SiGithub /> {t('projects.viewGithub')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
