import Help from "@/help.json";
import Lottie from "lottie-react";


const HelpSupport = () => {
  return (
    <div className="flex items-center flex-col">
      <h3 className="mt-2 text-lg font-semibold text-white text-left">
        Contact Support
      </h3>
      <Lottie animationData={Help} loop={true} className="lg:w-[500px]" />
      <p className="mt-2 text-sm text-gray-300 text-left">
        We apologize for the inconveniences. Please send an email to payflyltd@gmaiil.com or call 09059428941 / 08144042706. Chat us on Whatsapp 09065988103.
      </p>

    </div>
  )
}

export default HelpSupport
