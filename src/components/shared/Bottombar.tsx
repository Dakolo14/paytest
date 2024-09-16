import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom';

const Bottombar = () => {

  const {pathname} = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {

      const isActive = pathname === link.route;
      const Icon = link.icon; // Use the icon component

      return (
          <Link to={link.route} key={link.label} className={`${
              isActive ? 'rounded-[10px]' : ''
            } flex-center flex-col gap-1 px-5 py-3 transition`}>
             <Icon
                size={20}
                className={`${
                  isActive ? 'text-primary-500' : 'text-light-2'
                }`}
              />
            <p className={`${
                isActive ? 'text-primary-500 tiny-medium text-light-2' : 'tiny-medium text-light-2'
              }`}>
              {link.label}
            </p>
          </Link>
      )
      })}
    </section>
  )
}

export default Bottombar
