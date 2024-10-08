import Bottombar from '@/components/shared/Bottombar'
import Leftbar from '@/components/shared/Leftbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full mt-5 mx-2 md:flex'>
      {/*  <Topbar /  */}
      <Leftbar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout
