import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Outlet } from 'react-router-dom'


const ProfileLayout: React.FC = () => {

  const location = useLocation();
  let title = '';

  switch (location.pathname) {
    case '/user-details':
      title = 'User Details';
      break;
    case '/reset-pin':
      title = 'Reset Transaction PIN';
      break;
    case '/referrals':
      title = 'Referrals';
      break;
    case '/help':
      title = 'Help & Support';
      break;
    case '/whats-new':
      title = "What's New";
      break;
    case '/faq':
      title = 'FAQs';
      break;
    case '/terms-of-use':
      title = 'Terms of Use';
      break;
    case '/privacy-policy':
      title = 'Privacy Policy';
      break;
    case '/notification':
      title = 'Notifications';
      break;  
    default:
      title = 'Profile';
  }

  return (
    <div className="w-full my-8 px-4">
      <div className="flex gap-6 items-center">
        {/* Back Button */}
        <Link to="/profile">
          <Button
            className="py-4 opacity-100 shadow-md bg-neutral-600"
            size="icon"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        {/* Title Section */}
        <h2 className="py-4 text-xl font-semibold">
          {title}
        </h2>
      </div>

      {/* Main Content Section */}
      <section className="h-full py-8 px-4 w-full">
        <Outlet />
      </section>
    </div>
  )
}

export default ProfileLayout
