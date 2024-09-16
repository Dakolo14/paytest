import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUser } from '@/context/UserContexts';
import axios from 'axios';
import { IoLogOutOutline } from "react-icons/io5";

const Leftbar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    if (!user) {
        return <p>Loading...</p>;
    }

    const { pathname } = useLocation();

    const handleLogout = async () => {
        try {
            const response = await axios.get('https://blockchainbinaryopt.shop/payfly/backend/api/logout.php');
            if (response.data.success) {
                setUser(null);
                navigate('/signin');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout', error);
        }
    };

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to='/home' className='flex gap-3 items-center'>
                    <img src="/assets/images/logo.png" alt="logo" width={150} height={30} />
                </Link>
                {/* Profile picture */}
                <Link to='/profile' className='flex items-center gap-3'>
                    {user.profile_picture ? (
                        <img 
                            src={`https://blockchainbinaryopt.shop/payfly/backend/api/uploads/${user.profile_picture}`} 
                            alt="" 
                            width={50} 
                            height={50} 
                            style={{ borderRadius: '50%' }}
                        />
                    ) : (
                        <img src="/assets/images/profile.png" alt="" width={50} height={50} />
                    )}
                    <div className="flex flex-col">
                        <p className='body-bold'>{user.first_name} {user.last_name}</p>
                        <p className='small-regular text-light-3'>@{user.username}</p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        const Icon = link.icon;
                        return (
                            <li key={link.label} className={`leftsidebar-link group`}>
                                <NavLink to={link.route} className={`flex gap-4 items-center p-4 leftsidebar-link group ${
                                        isActive ? 'text-primary-500' : 'text-light-2'
                                        }`}>
                                    <Icon
                                        size={24}
                                        className={`${
                                        isActive ? 'text-primary-500' : 'text-light-2'
                                        }`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Button className='flex items-center gap-3 py-4' style={{backgroundColor: "#C62828"}} onClick={handleLogout}>
                <IoLogOutOutline className='h-6 w-6' />
                <p className='text-base font-normal'>Logout</p>
            </Button>
        </nav>
    );
};

export default Leftbar;
