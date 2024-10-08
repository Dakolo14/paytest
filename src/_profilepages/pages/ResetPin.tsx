import { useEffect, useState } from 'react'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { useUser } from '@/lib/context/UserContexts'; // Import the useUser hook
import { toast } from '@/components/ui/use-toast';


// Zod schema for validation
const resetPinSchema = z.object({
  currentPin: z
    .string()
    .min(4, { message: 'Current PIN must be at least 4 digits' })
    .max(6, { message: 'Current PIN must be no more than 6 digits' })
    .regex(/^\d+$/, { message: 'Current PIN must contain only numbers' })
    .optional(),
  newPin: z
    .string()
    .min(4, { message: 'New PIN must be at least 4 digits' })
    .max(6, { message: 'New PIN must be no more than 6 digits' })
    .regex(/^\d+$/, { message: 'New PIN must contain only numbers' }),
  confirmNewPin: z
    .string()
    .min(4, { message: 'Confirm PIN must be at least 4 digits' })
    .max(6, { message: 'Confirm PIN must be no more than 6 digits' })
    .regex(/^\d+$/, { message: 'Confirm PIN must contain only numbers' }),
}).refine((data) => data.newPin === data.confirmNewPin, {
  message: 'New PIN and Confirm PIN must match',
  path: ['confirmNewPin'],
});

const ResetPin: React.FC = () => {
  const { user } = useUser(); // Get the user from the context
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmNewPin, setShowConfirmNewPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPin, setHasPin] = useState<boolean | null>(null); // Track whether the user has a PIN
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for displaying error messages

  const form = useForm({
    resolver: zodResolver(resetPinSchema),
    defaultValues: {
      currentPin: '',
      newPin: '',
      confirmNewPin: '',
    },
  });

  // Function to check if the user has a PIN
  const checkIfUserHasPin = async () => {
    if (!user?.id) return; // Wait until the user ID is available

    try {
      const response = await fetch(`https://blockchainbinaryopt.shop/payfly/backend/api/validate_pin.php`, {
        method: 'POST',
        body: JSON.stringify({ user_id: user.id }), // Pass the user ID from the context
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (response.ok) {
        setHasPin(result.has_pin);
      } else {
        setErrorMessage(result.error || 'Failed to check PIN. Try again.');
      }
    } catch (error) {
      console.error('Error checking PIN:', error);
      setErrorMessage('An error occurred while checking PIN status.');
    }
  };

  // Run the check on component mount
  useEffect(() => {
    if (user) {
      checkIfUserHasPin();
    }
  }, [user]);

  const onSubmit = async (data: any) => {
    if (!user?.id) return; // Ensure the user ID is available
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('user_id', user.id.toString()); // Include the user ID in the request
      formData.append('new_pin', data.newPin);
      formData.append('confirm_pin', data.confirmNewPin); // Include confirm_pin
  
      // If the user has a PIN, include the current PIN for update
      if (hasPin) {
        formData.append('current_pin', data.currentPin); // Include current_pin if user has a PIN
      }
  
      const url = hasPin
        ? 'https://blockchainbinaryopt.shop/payfly/backend/api/update_pin.php'
        : 'https://blockchainbinaryopt.shop/payfly/backend/api/create_pin.php';
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      // Handle the response based on the status code returned by the PHP backend
      if (response.ok && result.status === 200) {
        // alert(result.message); // Display success message
        toast({
          variant: 'success',
          title: 'Successfully changed PIN!',
        })
      } else {
        // setErrorMessage(result.message || 'Failed to process PIN. Try again.'); // Display error message from backend
        toast({
          variant: 'destructive',
          title: 'Try Again!',
          description: 'Failed to process PIN. Try again.',
        })
      }
    } catch (error) {
      console.error('Error processing PIN:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col justify-start min-h-screen items-center min-w-[80%] px-4 sm:px-0 pt-12">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-md mt-8">
          {/* Current Pin */}
           {/* Display error message if any */}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

          {/* Only show current PIN field if the user already has a PIN */}
          {hasPin && (
                    <FormField
                      control={form.control}
                      name="currentPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Pin</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter your current pin"
                                type={showCurrentPin ? "text" : "password"}
                                autoComplete="off"
                                className="shad-input"
                                {...field}
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                              onClick={() => setShowCurrentPin(!showCurrentPin)}>
                                {showNewPin ? <EyeOff /> : <Eye />}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                )}
          {/* New Pin */}
          <FormField
            control={form.control}
            name="newPin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Pin</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your new pin"
                      type={showNewPin ? "text" : "password"}
                      autoComplete="off"
                      className="shad-input"
                      {...field}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowNewPin(!showNewPin)}>
                    {showNewPin ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm New Pin */}
          <FormField
            control={form.control}
            name="confirmNewPin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Pin</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Confirm your new pin"
                      type={showConfirmNewPin ? "text" : "password"}
                      autoComplete = "off"
                      className="shad-input"
                      {...field}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowConfirmNewPin(!showConfirmNewPin)}>
                    {showConfirmNewPin ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full p-6 bg-white text-black mt-4" disabled={isLoading}>
          {isLoading ? (hasPin ? 'Updating...' : 'Creating...') : (hasPin ? 'Update PIN' : 'Create PIN')}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default ResetPin;
