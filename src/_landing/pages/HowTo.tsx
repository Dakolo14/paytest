import { Cta } from "../components/Cta";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { HowitWorks } from "../components/HowitWorks";
import { ScrollToTop } from "../components/ScrollToTop";

const HowTo = () => {
  return (
    <div>
      <HowitWorks />
      <Cta />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default HowTo