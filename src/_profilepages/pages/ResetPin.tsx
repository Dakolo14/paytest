import { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { ResetPinValidation } from "@/lib/validation"; 

const ResetPin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmNewPin, setShowConfirmNewPin] = useState(false);

  const form = useForm<z.infer<typeof ResetPinValidation>>({
    resolver: zodResolver(ResetPinValidation),
    defaultValues: {
      currentPin: '',
      newPin: '',
      confirmNewPin: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPinValidation>) => {
    setIsLoading(true);
    try {
      // Simulate API call for resetting the pin
      console.log('Resetting Pin:', data);

      // After success:
      alert('Pin updated successfully!');
    } catch (error) {
      console.error('Error resetting pin:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col justify-start min-h-screen items-center min-w-[80%] px-4 sm:px-0 pt-12">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-md mt-8">
          {/* Current Pin */}
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
                      className="shad-input"
                      {...field}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowCurrentPin(!showCurrentPin)}>
                      {showCurrentPin ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            {isLoading ? (
              "Confirming Changes..."
            ) : "Confirm Changes"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default ResetPin;
