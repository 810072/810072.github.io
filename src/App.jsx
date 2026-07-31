import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Awards from './components/Awards'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <div className="app">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Timeline />
        <Awards />
      </main>
      <Footer />
    </div>
  )
}

export default App
