
const Home = () => {
  return (
    <div className="mt-5 mx-auto">
      <p className="text-sm text-gray-400 truncate">Welcome Back,</p>
      <h3 className="pt-2 text-xl font-medium text-gray-100">Ajose Damilare</h3>
      <div className="mt-8 mx-auto">
        <div className="bg-blue-500 text-white w-80 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Bank Name</div>
            <div>
              <img src="/assets/images/payment-tag.png" alt="Payment Tag" className="h-10 w-12" />
            </div>
          </div>
          <div className="mb-6">
            <div className="text-lg font-mono tracking-widest">**** **** **** 2943</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs uppercase">Card Holder</div>
              <div className="text-sm font-medium">Ajose Damilare</div>
            </div>
            <div>
              <div className="text-xs uppercase">Expires</div>
              <div className="text-sm font-medium">12/24</div>
            </div>
          </div>
        </div>
      </div>
      <p className="underline pt-3 pl-2">
        Switch Account
      </p>

      <div className="flex flex-col items-center gap-2">
        <img src="/assets/images/faceid.png" alt="" className="h-16 w-16 mt-8 mx-auto" />
        <p>Tap and Pay</p>
      </div>
    </div>
  )
}

export default Home
