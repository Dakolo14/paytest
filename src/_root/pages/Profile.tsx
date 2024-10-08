import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Link } from "react-router-dom";
import { useUser } from '@/lib/context/UserContexts';
import axios from 'axios';
import { GoChevronRight } from "react-icons/go";
import { Switch } from "@/components/ui/switch";
import { toast } from '@/components/ui/use-toast';



const avatars = [
  { id: 1, src: './assets/avatar/avatar-1.png', gender: 'female' },
  { id: 2, src: './assets/avatar/avatar-2.png', gender: 'female' },
  { id: 3, src: './assets/avatar/avatar-3.png', gender: 'male' },
  { id: 4, src: './assets/avatar/avatar-4.png', gender: 'male' },
  { id: 5, src: './assets/avatar/avatar-5.png', gender: 'male' },
  { id: 6, src: './assets/avatar/avatar-6.png', gender: 'female' },
  { id: 7, src: './assets/avatar/avatar-7.png', gender: 'male' },
  { id: 8, src: './assets/avatar/avatar-8.png', gender: 'male' },
  { id: 9, src: './assets/avatar/avatar-9.png', gender: 'female' },
];


const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const [_isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(user?.avatar || avatars[0].src);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleSaveChanges = async () => {
    if (!user.id) {
      // Handle missing user ID case
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://blockchainbinaryopt.shop/payfly/backend/api/update_profile.php', {
        user_id: user.id,
        avatar: selectedAvatar, // Save the selected avatar
      });

      if (response.data.success) {
        // Update the user context with the new data
        setUser({ ...user, avatar: selectedAvatar });
        setIsEditModalOpen(false); // Close the modal
        toast({
          variant: 'success',
          title: 'Your profile picture has been updated successfully!',
        })
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error("Error updating profile:", error); // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    // Clear user context or session
    setTimeout(() => {
      setUser(null); // Clear user context
      // Redirect to login if needed
      window.location.href = "/signin"; // Or use React Router's history.push('/login');
      setIsLoading(false);
    }, 1000); // Simulate async logout operation
  };

  return (
    <div className="w-full my-5 px-4" style={{ paddingBottom: "1320px"}}>
      <div className="flex flex-col items-start w-full gap-5">
        <h3 className="text-2xl font-semibold text-left w-full py-4">
          Your Profile
        </h3>
      </div>
      <div className='py-4'>
        <div className="w-full rounded-md my-0.2 py-8 px-4 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
          <div className='flex items-center gap-4'>
            <div>
              <Drawer>
                  <DrawerTrigger>
                    <img src={user?.avatar || 'Not Set'} alt={`${user.first_name}'s Profile Picture`} className='h-32 w-32 border none rounded-md' />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        <h2 className="text-lg font-medium text-gray-100">View Avatars</h2>
                        <p className="text-sm pt-2 text-gray-400">
                          Check out all possible avatars available for you.
                        </p>
                      </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto p-4">
                      {/* Scrollable content */}
                      <DrawerDescription>  
                        <div className="grid grid-cols-3 gap-4 justify-items-center">
                          {avatars.map((avatar) => (
                            <img
                              key={avatar.id}
                              src={avatar.src}
                              alt={`Avatar ${avatar.id}`}
                              className={`h-28 w-28 border rounded-md ${selectedAvatar === avatar.src ? 'border-primary-500 border-2' : ''}`}
                              onClick={() => setSelectedAvatar(avatar.src)}
                            />
                          ))}
                      </div>
                      </DrawerDescription>
                    </div>  
                    <DrawerFooter>
                      <Button className="text-white-2 font-medium bg-white text-black hover:bg-gray-200 focus:outline-none" disabled={isLoading} onClick={handleSaveChanges}>
                        {isLoading ? 'Saving Profile Image...' : 'Save Profile Image'}
                      </Button>
                      <DrawerClose>
                        <Button variant="outline" className="w-full">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
            </div>
            <div className='flex flex-col'>
              <h3 className="text-xl font-medium text-left w-full px-2">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-base font-normal text-left w-full px-2 text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto w-full">
            <div className='w-full'>
              <Link to='/user-details'>
                <div className="w-[100%] rounded-t-md my-0.2 py-4 border-b border-gray-400 mt-8 px-4 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          User Details
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
              <Link to='/reset-pin'>
                <div className="w-[100%] my-0.2 py-4 px-4 border-b border-gray-400 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          Reset Transaction Pin
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
                <div className="w-[100%] rounded-b-md my-0.2 py-4 px-4 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          Enable Biometrics
                        </h3>
                      </div>
                      <div>
                        <Switch />
                      </div>
                  </div>
                </div>
            </div>
            

            <div>
              <Link to='/referrals'>
                <div className="w-[100%] rounded-t-md py-4 border-b border-gray-400 mt-8 px-4 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          Referrals
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
              <Link to='/help'>
                <div className="w-[100%] py-4 px-4 border-b border-gray-400 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          Help & Support
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
                <div className="w-[100%] rounded-b-md my-0.2 py-4 px-4 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          Rate Our App
                        </h3>
                      </div>
                  </div>
                </div>
            </div>

            <div>
              <Link to='/whats-new'>
                <div className="w-[100%] rounded-t-md py-4 border-b border-gray-400 mt-8 px-4 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          What's New
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
              <Link to='/faq'>
                <div className="w-[100%] py-4 px-4 border-b border-gray-500 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          FAQs
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
              <Link to='/terms-of-use'>
                <div className="w-[100%] py-4 px-4 border-b border-gray-500 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          Terms of Use
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
              <Link to='/privacy-policy'>
                <div className="w-[100%] py-4 px-4 grid items-center" style={{ backgroundColor: "#1e1e1e" }}>
                  <div className='flex items-center justify-between'>
                      <div>
                        <h3 className="text-base py-2 font-light text-left">
                          Privacy Policy
                        </h3>
                      </div>
                      <div>
                        <GoChevronRight className='text-white h-6 w-6' />
                      </div>
                  </div>
                </div>
              </Link>
            </div>
        </div>

        <div className="py-8 w-full space-y-4 md:space-y-0 md:space-x-4 lg:hidden">
          <Link to='/' className='flex-center gap-3'>
            <Button className="w-full py-6 text-base" style={{backgroundColor: "#C62828"}} disabled={isLoading} onClick={handleLogout}>
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;



