import { Navbar } from '@/components/shared/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Navbar />

      <section className="flex flex-1 md:container h-full mt-16">
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
