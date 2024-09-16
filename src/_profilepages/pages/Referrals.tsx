import Lottie from 'lottie-react'
import Gift from "@/gift.json";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContexts';


const Referrals = () => {
  // const { user, setUser } = useUser();
  const { user } = useUser();
  const [isLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='lg:flex lg:flex-col lg:items-center'>
      <Lottie animationData={Gift} loop={true} className="lg:w-[500px]" />
      <h3 className="mt-2 text-lg font-semibold text-white text-center">
        Refer & Earn Rewards!
      </h3>
      <p className="mt-2 text-md text-gray-300 text-center">
        Invite your friends to join, and you’ll earn &#8358;200 when they complete their first 5 transactions.
      </p>

      <div className="flex items-center space-x-2 mt-8">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            defaultValue={`https://yourapp.com/profile/${user?.username}`} // Adjust link as needed
            className="shad-input lg:w-[600px]"
            readOnly
          />
        </div>
      </div>  

      {/* Submit Button */}
          <Button type="submit" className="w-full p-6 bg-white text-black mt-4" disabled={isLoading}>
            {isLoading ? (
              "Copying Link..."
            ) : "Copy Link"}
          </Button>
    </div>
  )
}

export default Referrals
