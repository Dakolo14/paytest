import axios from 'axios'; 
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
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useUser } from "@/lib/context/UserContexts";
import { useState } from 'react';
import { SignupValidation } from "@/lib/validation"; // Import your validation schema
import { toast } from '@/components/ui/use-toast';



const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Form initialization with zod resolver
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      pin: '' // Default value for pin field
    },
  });

  const onSubmit = async (data: z.infer<typeof SignupValidation>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('first_name', data.firstName);
      formData.append('last_name', data.lastName);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('password2', data.password2);
      formData.append('pin', data.pin); // Append the PIN field

      const response = await axios.post('https://blockchainbinaryopt.shop/payfly/backend/api/signup.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setUser(response.data.user); // Assuming the API returns user data on success
        navigate('/home');
        toast({
          variant: 'success',
          title: 'Successfully Signed Up!',
        })
      } else {
        // alert(response.data.error || 'An error occurred');
        toast({
          variant: 'destructive',
          title: 'Try Again!',
          description: 'An error occurred. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col justify-start min-h-screen items-center min-w-[80%] px-4 sm:px-0 pt-12">
        <div className='flex gap-6 items-center'>
          <Link to="/">
            <Button
              className="fixed left-4 top-12 opacity-100 shadow-md bg-neutral-600"
              size="icon"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <img src="/assets/images/logo.png" alt="logo" />
        </div>

        <div className="items-center">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use PayFly, enter your details</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-md mt-4" encType="multipart/form-data">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter your password" type={showPassword ? "text" : "password"} className="shad-input" {...field} />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Confirm your password" type={showConfirmPassword ? "text" : "password"} className="shad-input" {...field} />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PIN Field */}
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction PIN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a 4-digit PIN" type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="shad-button_primary mt-4" disabled={isLoading}>
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : "Create Account"}
          </Button>

          {/* Login Link */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to='/signin' className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>

    </Form>
  );
};

export default SignupForm;
