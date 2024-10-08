import { Button } from "@/components/ui/button"
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
import { LuSmartphoneNfc } from "react-icons/lu";
import PinInput from "./PinInput";
import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useUser } from '@/lib/context/UserContexts'; // Import the useUser hook
import { toast } from "@/components/ui/use-toast";

const pinSchema = z
  .string()
  .length(4, { message: 'PIN must be exactly 4 digits' })
  .regex(/^\d+$/, { message: 'PIN must only contain numbers' });

const TapToPayButton = () => {
    const [pin, setPin] = useState('');
    const { user } = useUser(); // Get user from context
    const [isLoading, setIsLoading] = useState(false);

  
    const handleBackspace = () => {
      setPin((prevPin) => prevPin.slice(0, -1));
    };
  
    const handleAuthorize = async () => {
      setIsLoading(true);

      try {
        pinSchema.parse(pin); // Validate the pin
  
        // Ensure user is logged in and has an ID
        if (!user || !user.id) {
          toast({
            variant: 'destructive',
            title: 'User is not logged in. Please log in and try again.',
          })
          return;
        }
  
        // Send the PIN for verification against the backend using user ID
        const response = await axios.get(
          `https://blockchainbinaryopt.shop/payfly/backend/api/check_pin.php?user_id=${user.id}&pin=${pin}`
        );
  
        // Log the entire response for debugging
        console.log(response.data);
  
        if (response.data.valid) {
          toast({
            variant: 'success',
            title: 'PIN verified successfully!',
          })
          // Proceed with the next steps after successful verification
        } else {
          toast({
            variant: 'destructive',
            title: 'Incorrect PIN. Please try again.',
          })
        }
      } catch (error) {
        // Improved error handling
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error);
          // alert('An error occurred while communicating with the server. Please try again.');
          toast({
            variant: 'destructive',
            title: 'An error occurred while communicating with the server. Please try again.',
          })
        } else if (error instanceof z.ZodError) {
          alert(error.errors[0].message); // Display validation error message
        } else {
          console.error('Unexpected error:', error);
          // alert('An unexpected error occurred. Please try again.');
          toast({
            variant: 'destructive',
            title: 'An unexpected error occurred. Please try again.',
          })
        }
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="mx-auto bg-white text-dark-3 font-bold p-3 rounded-md">
        <Drawer>
            <DrawerTrigger>
                <div className="flex items-center justify-center gap-4">
                    <LuSmartphoneNfc className="h-8 w-8" />
                    <p className="text-base">Tap to Pay</p>
                </div>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col h-full">
                <DrawerHeader>
                    <DrawerTitle>
                      <h2 className="text-l font-medium text-gray-100">Input Pin</h2>
                      <p className="text-sm pt-2 text-gray-400">
                          Please input your transaction pin to authorize this transaction
                      </p>
                    </DrawerTitle>
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Scrollable content */}
                    <DrawerDescription>
                        <div className="flex justify-center mt-3">
                            <PinInput  pin={pin} setPin={setPin} handleBackspace={handleBackspace} />
                        </div>
                    </DrawerDescription>
                </div>
                </DrawerHeader>
                <DrawerFooter className="sticky bottom-0 bg-dark p-4">
                    <Button className="bg-white text-dark-2 font-semibold" onClick={handleAuthorize} disabled={isLoading}>
                      {isLoading ? 'Authorizing Payment...' : 'Authorize Payment'}</Button>
                    <DrawerClose>
                      <Button variant="outline" className="w-full">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
  )
}

export default TapToPayButton