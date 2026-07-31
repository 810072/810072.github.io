import { useTranslation } from 'react-i18next'
import {
  SiPython, SiTensorflow, SiOpencv, SiScikitlearn,
  SiFlask, SiFlutter, SiGit, SiPandas
} from 'react-icons/si'
import { TbBrain, TbRobot, TbLink } from 'react-icons/tb'
import useScrollAnimation from '../hooks/useScrollAnimation'
import '../styles/components/TechStack.css'

const skillItems = [
  { name: 'Python', icon: SiPython },
  { name: 'Deep Learning', icon: TbBrain },
  { name: 'Generative AI', icon: TbBrain },
  { name: 'Computer Vision', icon: SiOpencv },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'Scikit-Learn', icon: SiScikitlearn },
  { name: 'LangChain', icon: TbLink },
  { name: 'Flask', icon: SiFlask },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'YOLOv8', icon: TbRobot },
  { name: 'Pandas', icon: SiPandas },
  { name: 'RAG', icon: TbLink },
  { name: 'Git', icon: SiGit },
]

export default function TechStack() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="techstack section" id="skills" ref={ref}>
      <div className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="section-title">
          <span className="section-number">02.</span>
          {t('skills.title')}
        </h2>
        <div className="tech-pills">
          {skillItems.map((skill, idx) => {
            const Icon = skill.icon
            return (
              <div
                className="tech-pill glass-card"
                key={skill.name}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <Icon className="tech-pill-icon" />
                <span className="tech-pill-name">{skill.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
