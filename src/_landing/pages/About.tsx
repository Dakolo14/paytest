import { AboutContent } from "../components/AboutContent";
import { Cta } from "../components/Cta";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { Sponsors } from "../components/Sponsors";
import { Team } from "../components/Team";

const About = () => {
  return (
    <div>
        <AboutContent />
        <Sponsors />
        <Cta />
        <Team />
        <Footer />
        <ScrollToTop />
      </div>
  )
}

export default About