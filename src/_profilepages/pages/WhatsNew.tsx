
const WhatsNew = () => {
  return (
    <div className='pb-8'>
      <p className='mb-4'>App Version 1.0.0.1</p>
      <img src="/assets/images/logo.png" alt="logo" />
      <div>
        <h3 className="mt-6 text-lg font-normal text-white text-left">
          Seamless UI
        </h3>
        <p className="mt-1 text-sm text-gray-300 text-left">
          We integrate an update to the App UI to enable faster transactions for users. 
        </p>
      </div>
      <div>
        <h3 className="mt-4 text-lg font-normal text-white text-left">
          Enabling Security Biometrics
        </h3>
        <p className="mt-1 text-sm text-gray-300 text-left">
          Payfly made use of biometrics security measures to improve transaction authentication time.
        </p>
      </div>
      <div>
        <h3 className="mt-4 text-lg font-normal text-white text-left">
          Faster Transaction Time
        </h3>
        <p className="mt-1 text-sm text-gray-300 text-left">
          We improved the transaction time by 20%.
        </p>
      </div>
    </div>
  )
}

export default WhatsNew
