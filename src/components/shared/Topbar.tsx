
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Topbar = () => {
  return (
    <section className='topbar'>
        <div className="flex-between py-4 px-5">
            <Link to='/' className='flex gap-3 items-center'>
                <img src='/assets/images/logo.png' alt='logo' width={130} height={325} />
            </Link>

            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button_ghost'>
                    <img src="/assets/icons/logout.svg" alt="logout icon" />
                </Button>
                {/* {This image should be connected to user profile image} */}
                <Link to='/profile' className='flex-center gap-3'>
                    <img src={'/assets/images/profile.png'} alt="profile image" className='h-8 w-8 rounded-full' />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Topbar
