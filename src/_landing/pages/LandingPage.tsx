import { AboutContent } from "../components/AboutContent"
import { Cta } from "../components/Cta"
import { FAQ } from "../components/FAQ"
import { Footer } from "../components/Footer"
import Hero from "../components/Hero"
import { HowitWorks } from "../components/HowitWorks"
import { ScrollToTop } from "../components/ScrollToTop"
import { Sponsors } from "../components/Sponsors"
import { Team } from "../components/Team"



const LandingPage = () => {
  return (
      <div>
        <Hero />
        <Sponsors />
        <AboutContent />
        <HowitWorks />
        <Cta />
        <Team />
        <FAQ /> 
        <Footer />
        <ScrollToTop />
      </div>
  )
}

export default LandingPage